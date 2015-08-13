

Ext.onReady(function () {
	if (username == null) return;

    Ext.QuickTips.init();
    function pageLoad() {
        Ext.define('RoleModel', {
            extend: 'Ext.data.Model',
            fields: [{ name: 'id' }, { name: 'rolecode' }, { name: "rolename" }, { name: "memo"}]
        });

        Ext.define('RightTreeModel', {
            extend: 'Ext.data.Model',
            fields: [{ name: "id"},{ name: "orderid"},{ name: "parentid"},{ name: "text"},{ name: "qtip"},
                    { name: "url"},{ name: "iconCls"},{ name: "leaf"},{ name: "showflag"},{name:"params"}]
        });
        //创建角色列表数据源
        var roleStore = Ext.create('Ext.data.Store', {
            //分页大小
            pageSize: pSize,
            model: 'RoleModel',
            //是否在服务端排序
            remoteSort: true,
            autoLoad: true,
          
            proxy: {
                //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
                type: 'ajax',
                url: 'role_RoleList.action',
                actionMethods: 'POST',
                reader: {
                	idProperty: 'id',
                    root: 'result.list',
                    totalProperty: 'total'
                },
                simpleSortMode: true
            }
        });



        var roleGrid = Ext.create('Ext.grid.Panel', {
            store: roleStore,
            columnLines: true,
            autoHeight: true,
            loadMask: true,
            layout: 'auto',
            columns: [{
                text: "ID", width: 100, dataIndex: 'id', sortable: false, hidden: true
            }, {
                text: "角色编号", width: 100, dataIndex: 'rolecode', sortable: true
            }, {
                text: "角色名称", width: 100, dataIndex: 'rolename', sortable: true
            }, {
                text: "备注", width: 300, dataIndex: 'memo', sortable: true
            }, {
                text: '操作',
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                align: 'center',
                items: [{
                	 iconCls:'icon-delete',
                    tooltip: '删除角色',
                    text: '删除',
                    itemId: 'del',
                    handler: function (grid, rowIndex, colIndex) {
                    	
                    	Ext.MessageBox.confirm('提示', '您确定要删除所选吗?',function(btnId){
                			if(btnId == 'yes'){
                              var rec = grid.store.getAt(rowIndex);
                              var msgTip = Ext.MessageBox.show({
                                 title: '提示',
                                 width: 250,
                                 msg: '正在删除角色信息请稍候...'
                               });
                              Ext.Ajax.request({
                                url: 'role_DelRole.action',
                                params: { rolecode: rec.get('rolecode') },
                                method: 'POST',
                                success: function (response) {
                                       msgTip.hide();
                                       var result = Ext.JSON.decode(response.responseText);
                                       if (result.success) {
                                          roleGrid.store.remove(rec);
                                          Ext.Msg.alert('提示', '删除角色信息成功！');
                                       } else {
                                          Ext.Msg.alert('提示', '删除角色信息失败！');
                                       }
                                     },
                                failure: function (response) {
                                     Ext.Msg.alert('提示', '删除角色信息失败！');
                                }
                            });
                		  }
                    	});
                    }
                }, {
                	iconCls:'icon-edit',   // Use a URL in the icon config
                    tooltip: '修改角色',
                    itemId: 'edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.store.getAt(rowIndex);
                        roleWinShow(rec);
                    }
                }]
            }, {
                text: '权限分配',
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: '权限分配',
                align: 'center',
                iconCls:'icon-right ',
                handler: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
                    var rec = grid.store.getAt(rowIndex);
                    roleRightWinShow(rec);

                }
            }],

            features: [{
                ftype: 'filters',
                encode: true,
                local: false,
                filters: [{
                    type: 'string',
                    dataIndex: 'rolecode',
                    disabled: false
                }, {
                    type: 'string',
                    dataIndex: 'rolename',
                    disabled: false
                }
                ]
            }],
            autoHeight: true,
            autoWidth: true,
            title: '角色信息',
            frame: true,
            loadMask: true,

            viewConfig: { stripeRows: true },

            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    itemId: 'AddButton',
                    text: '增加',
                    tooltip: '增加角色信息 ',
                    iconCls: 'icon-add',
                    scope: this,
                    handler: function () {
                        var rec = null;
                        roleWinShow(rec);
                    }
                }, '->', {
                    text: '显示全部',
                    tooltip: '显示全部',
                    iconCls: 'icon-showall',
                    handler: function () {
                        roleGrid.filters.clearFilters();
                    }
                }, '-', '显示记录数',
				{
				    itemId: 'roleNum',
				    xtype: 'combo',
				    width: 50,
				    allowBlank: false,
				    blankText: '必须选择页面大小!',
				    hiddenName: 'RoleNum',
				    name: 'RoleNum',
				    store: Ext.create('Ext.data.Store', {
				        fields: ['abbr', 'name'],
				        data: [
                            { "abbr": 15, "name": 15 },
					        { "abbr": 20, "name": 20 },
					        { "abbr": 30, "name": 30 },
							{ "abbr": 50, "name": 50 },
							{ "abbr": 100, "name": 100 },
							{ "abbr": 200, "name": 200 }
					        ]
				    }),
				    value: 15,
				    editable: false,
				    loadingText: '正在加载...',
				    displayField: 'name',
				    valueField: 'abbr',
				    emptyText: '请选择页面大小',
				    queryMode: 'local',
				    listeners: {
				        select: function (combo, record, index) {
				            pSize = this.getValue();
				            roleStore.pageSize = pSize;
				            roleStore.load();
				        }
				    }
				}]
            }, {
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                store: roleStore,
                pageSize: pSize,
                displayInfo: true,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: '没有数据'
            }]
        });

        //角色权限分配

        //创建带CheckBox的系统菜单数据源
        var treeStore = Ext.create('Ext.data.TreeStore', {
        	model:'RightTreeModel',
            proxy: {
                type: 'ajax',
                url: 'right_getWebMenus.action',
                reader: {
                    type: 'json',
                    root: 'src'
                }
            },
            root: {
                text: '管理功能',
                id: '0',
                qtip: '管理功能',
                expanded:true
            }
        });
       
       
        //重置权限树
        function resetTree(node) {
            if (node != null) {
               node.eachChild(function (child) {
               child.set('checked', false);
                    resetTree(child);
               });
            }
        }
        //加载角色权限
        function setTreeCheck(node, checkNodes) {
            if (node != null) {
                node.eachChild(function (child) {

                    for (var i = 0; i < checkNodes.length; i++) {
                        if (child.internalId == checkNodes[i].id) {
                            child.set('checked', true);
                            setTreeCheck(child, checkNodes);

                        }
                    }

                });
            }
        }
        
        //系统菜单
        var checkTree=Ext.create('Ext.tree.Panel', {
            store: treeStore,
            rootVisible: false,
            useArrows: true,
            frame: true,
            title: '权限分配菜单',
            autoWidth: true,
            height: 260,
           
            autoScroll: true,
            viewConfig: {
                onCheckboxChange: function (e, t) {
                    var item = e.getTarget(this.getItemSelector(), this
                        .getTargetEl()), record;
                    if (item) {
                        record = this.getRecord(item);
                        var check = !record.get('checked');
                        record.set('checked', check);

                        if (check) {
                            record.bubble(function (parentNode) {
                                parentNode.set('checked', true);
                            });
                            record.cascadeBy(function (node) {
                                node.set('checked', true);
                            });
                        } else {
                            record.cascadeBy(function (node) {
                                node.set('checked', false);
                            });
                        }
                    }
                }
            }
        });
        //约束form
        var  roleRightForm = new Ext.FormPanel({
            labelSeparator: ":",
            
            frame: true,
            border: false,
          heigh:360,
            items: [{
                xtype: 'textfield', //文本区
                width: 320,
                readOnly: true,
                name: 'rolecode',
                fieldLabel: '角色编号',
                value: ""
            }, {
                xtype: 'textfield', //文本区
                width: 320,
                allowBlank: false,
                readOnly: true,
                name: 'rolename',
                fieldLabel: '角色名称',
                value: ""
            },
                    checkTree
                    ],
            buttons: [{
                text: '确定',
                handler: rightSubmitForm
            }, {
                text: '取消',
                handler: function () {
                	roleRightWin.hide();
                }
            }]
        });
        //弹出窗体
      var   roleRightWin = new Ext.Window({     //创建弹出窗口
            layout: 'fit',
            width: 380,
            closeAction: 'hide',
            height: 400,
            resizable: false,
            shadow: true,
            modal: true,
            closable: true,
            bodyStyle: 'padding:5 5 5 5',
            animCollapse: true,
            title: '角色权限分配',
            items: [roleRightForm]
        });

      //提交权限菜单
      function rightSubmitForm() {
          var records = checkTree.getView().getChecked();
          selTreeNodeIds = [];
          Ext.Array.each(records, function (rec) {
              if (rec.get('id') != "0")
                  selTreeNodeIds.push(rec.get('id'));
          });
          values = roleRightForm.form.getValues();
          if (values.id == "") {
              values.id = 0;
          }
          var JSONobj = [];
          JSONobj.push(JSON.stringify(values));

          roleRightForm.form.submit({
              clientValidation: true,
              waitMsg: '正在提交数据请稍候...',
              waitTitle: '提示',
              url: 'role_RoleRightAdd.action',
              method: 'post',
              params: {
                  datas: JSONobj,
                  roleMenu: [selTreeNodeIds]
              },
              success: function (form, action) {
                  
                      Ext.Msg.alert('提示', "角色权限分配成功！");
                   
                     roleStore.load();
                     roleRightWin.hide();
                     
                  
              },
              failure: function (form, action) {
                 
                  Ext.MessageBox.show({
                      title: '错误',
                      msg: '角色权限分配失败!请检查数据是否完整！',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR
                  });

              }
          });


      }
        function roleRightWinShow(role) {
        	
        	
            Ext.QuickTips.init();
            Ext.form.Field.prototype.msgTarget = 'side';
          
          
            roleRightForm.loadRecord(role);
            roleRightWin.doLayout();
            roleRightWin.show();
          // 展开异步树所有节点
          
            checkTree.expandAll(treeExpandAllCallback,this);
            function treeExpandedAll(){
               Ext.defer(function (){treeExpandAllCallback();},1000);
            }
              function treeExpandAllCallback()
              {
           	   var checkNodes = role.raw.webMenus;
                  var node = checkTree.getRootNode();
                    resetTree(node);
                    setTreeCheck(node, checkNodes); 
              }

        }
        /**
        角色权限分配结束
        **/

        //角色增加、修改
        function roleWinShow(rec) {
            var roleForm = Ext.create('Ext.form.Panel', {
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                autoWidth: true,
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 75
                },
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [
                      {
                          xtype: 'textfield',
                          itemId: 'id',
                          name: 'id',
                          columnWidth: 0.5,

                          hidden: true
                      },
                      {
                          xtype: 'textfield',
                          itemId: 'rolecode',
                          name: 'rolecode',
                          columnWidth: 0.5,
                          fieldLabel: '角色编号<span style="color:red;">*</span>',
                          allowBlank: false
                      },
                {
                    xtype: 'textfield',
                    itemId: 'rolename',
                    name: 'rolename',
                    columnWidth: 0.5,
                    fieldLabel: '角色名称<span style="color:red;">*</span>',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    itemId: 'memo',
                    name: 'memo',
                    columnWidth: 1,
                    fieldLabel: '备注'

                }
                ],
                buttons: [{
                    text: '确定',
                    handler: submitForm
                }, {
                    text: '取消',
                    handler: function () {
                        roleForm.destroy();
                        roleWin.destroy();
                    }
                }]

            });

            //提交角色
            function submitForm() {
                values = roleForm.form.getValues();
                               if (values.id == "") {
                                   values.id = 0;
                              }
                var JSONobj = [];
                JSONobj.push(JSON.stringify(values));

                roleForm.form.submit({
                    clientValidation: true,
                    waitMsg: '正在提交数据请稍候...',
                    waitTitle: '提示',
                    url: 'role_AddRole.action',
                    method: 'post',
                    params: {
                        datas: JSONobj
                    },
                    success: function (form, action) {
                       
                            Ext.Msg.alert('提示',"角色信息保存成功！");
                            roleStore.load();
                           // roleForm.destroy();
                            roleWin.destroy();
                        
                    },
                    failure: function (form, action) {
                       
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: '角色信息保存失败!请检查数据是否完整！',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });

                    }
                });
            }

            var roleWin = new Ext.Window({     //创建弹出窗口
                layout: 'fit',
                width: 380,
                closeAction: 'hide',
                height: 280,
                resizable: false,
                shadow: true,
                modal: true,
                closable: true,
                bodyStyle: 'padding:5 5 5 5',
                animCollapse: true,
                items: [roleForm]
            });
            if (rec != null) {
                roleForm.loadRecord(rec);
                roleForm.down('#rolecode').readonly = true;
            }
            roleWin.doLayout();
            roleWin.show();
        }
        var tab = Ext.getCmp('mainContent').getActiveTab();

        tab.add(roleGrid);

        tab.doLayout();
    }
    pageLoad();



});