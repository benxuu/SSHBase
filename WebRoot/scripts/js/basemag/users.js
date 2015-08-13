Ext.onReady(function () {
	if (username == null) return;
    Ext.QuickTips.init();
    
    function pageLoad(){
    Ext.define('UsersModel', {
        extend: 'Ext.data.Model',
        fields: [{ name: 'id' },{ name: 'userName'}, { name: 'userCname' }, { name: "password" }, { name: "webRole"}
        ,{ name: "mobile"},{ name: "email"}]
    });

    //创建用户组数据源
    var UserRoleStore = Ext.create('Ext.data.Store', {
        //分页大小
        pageSize: pSize,

        //是否在服务端排序
        remoteSort: true,
        autoLoad: true,
        proxy: {
            //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
            type: 'ajax',
            url: 'role_GetAll.action',

            reader: {
              
                root: 'result.list',
                totalProperty: 'totalProperty'
            },
            simpleSortMode: true
        },
        sorters: [{
            //排序字段。
            property: 'rolecode',
            //排序类型，默认为 ASC
            direction: 'ASC'
        }],
        fields: [{ name: 'rolecode', type: 'string' }, { name: 'rolename', type: 'string'}]
    });


//    var right = Ext.JSON.decode(icsfmr);
    var UsersStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: pSize,
        model: 'UsersModel',
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: 'user_UserList.action',
            method: 'POST',
            reader: {
            	idProperty: 'id',
                root: 'result.list',
                totalProperty: 'total'
            },

            simpleSortMode: true
        }

   });
//用户列表
    var UsersGrid = Ext.create('Ext.grid.Panel', {
        itemId: 'UsersGrid',
        store: UsersStore,
      
        columnLines: true,
        autoHeight: true,
        autoWidth: true,
        title: '用户信息',
        frame: true,
        loadMask: true,
       
        viewConfig: { stripeRows: true },
        columns: [
            { text: "用户名", width: 100, dataIndex: 'userName', sortable: true},
            { text: "姓名", width: 150, dataIndex: 'userCname', sortable: true },
            { text: "密码", width: 100, dataIndex: 'password', sortable: false, hidden: true },
          
            { text: "用户角色", width: 100, dataIndex: 'webRole.rolename', sortable: false, renderer: function (value, meta, record) {
                return record.raw.webRole.rolename;
            }},
         
            { text: "手机", width: 200, dataIndex: 'mobile', sortable: false },
            { text: "邮箱", width: 200, dataIndex: 'email', sortable: false },
            { menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',

                items: [{
                	 iconCls:'icon-delete',  // Use a URL in the icon config
                    tooltip: '删除用户',
                    text: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                    	
                    	Ext.MessageBox.confirm('提示', '您确定要删除所选吗?',function(btnId){
                			if(btnId == 'yes'){
                    	
                        var rec = grid.store.getAt(rowIndex);
                        var msgTip = Ext.MessageBox.show({
                            title: '提示',
                            width: 250,
                            msg: '正在删除用户信息请稍候...'
                        });
                        Ext.Ajax.request({
                            url: 'user_DelUser.action',
                            params: { userName: rec.get('userName') },
                            method: 'POST',
                            success: function (response) {
                                msgTip.hide();
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.success) {
                                    grid.store.remove(rec);
                                    Ext.Msg.alert('提示', '删除用户信息成功!');
                                } else {
                                    Ext.Msg.alert('提示', '删除用户信息失败!');
                                }
                            },
                            failure: function (response) {

                                Ext.Msg.alert('提示', '删除用户信息失败!');

                            }
                        });
                			}
                    	});
                    }
                }, {
                	 iconCls:'icon-edit',  // Use a URL in the icon config
                    tooltip: '修改用户',
                    attr: 'style="margin-left:100"',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.store.getAt(rowIndex);
                        userWinShow(rec);
                    }
                }]
            }
	    ],
        features: [{
            ftype: 'filters',
            encode: true,
            local: false,
            filters: [
            	{type: 'string',dataIndex: 'userName',disabled: false}, 
        		{type: 'string',dataIndex: 'userCname',disabled: false},
        		
        		{type: 'string',dataIndex: 'webRole',disabled: false},
        		
        	]
        }],
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                itemId: 'addButton',
                text:'增加用户',
                tooltip:'增加用户',
                iconCls:'icon-add',
                scope:this,
                handler: function () {
                    var rec = null;
                    userWinShow(rec);

                }
            },'-',{
                xtype: 'FileDownloader',
                itemId: 'UsersDownloader',
                width: 0,
                height: 0
            }, '-', {
                text: 'Excel',
                tooltip: 'Excel',
                scope: this,
                iconCls: 'icon-excel',
                handler: function () {
                    var list = getExcelParams(Ext.getCmp('UsersGrid'));
                    var downloader = Ext.getCmp('UsersDownloader');
                    downloader.load({
                        params: { preFilter: list[0], filter: list[1], sort: list[2], dir: list[3], headers: list[4], cheaders: list[5], title: list[6] },
                        url: 'userstoExcel.action'
                    });
                }
            }, '-', '显示记录数',{
			    itemId: 'UserCmbNum',
			    name: 'UsersCmbNum',
			    xtype: 'combo',
			    width: 50,
			    allowBlank: false,
			    blankText: '必须选择页面大小!',
			    store: pageStore,
			    value: pSize,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'name',
			    valueField: 'abbr',
			    emptyText: '请选择页面大小',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {
			            pSize = this.getValue();
			            UsersStore.pageSize = pSize;
			            UsersStore.load();
			        }
			    }
			}]
        },
	    Ext.create('Ext.PagingToolbar', {
	        pageSize: pSize,
	        dock: 'bottom',
	        store: UsersStore,
	        displayInfo: true,
	        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	        emptyMsg: '没有数据',
	        plugins: Ext.create('Ext.ux.ProgressBarPager', {})
	    })]
    });
   
    //增加、修改用户窗口
    function userWinShow(rec) {
        var userForm = Ext.create('Ext.form.Panel', {
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
                itemId: 'username',
                name: 'userName',
                columnWidth: 0.5,
                fieldLabel: '用户名<span style="color:red;">*</span>',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'userCname',
                columnWidth: 0.5,
                fieldLabel: '用户中文名<span style="color:red;">*</span>',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'password',
                columnWidth: 0.5,
                fieldLabel: '密码',
                allowBlank: false
            }, {
                xtype: "combo",
                fieldLabel: "所属角色",
                columnWidth: 0.5,
                name: 'rolecode',
                itemId:'rolecode',
                editable: false,
                queryMode: 'local',
                displayField: 'rolename',
                valueField: 'rolecode',
                store: UserRoleStore
            }, {
                xtype: 'textfield',
                name: 'mobile',
                columnWidth: 0.5,
                fieldLabel: '手机',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'email',
                columnWidth: 0.5,
                fieldLabel: 'EMAIL',
                vtype: 'email' ,
                allowBlank: false
            }
            ],
            buttons: [{
                text: '确定',
                handler: submitForm
            }, {
                text: '取消',
                handler: function () {
                    userForm.destroy();
                    userWin.destroy();
                }
            }]

        });
        function submitForm() {


            values = userForm.form.getValues();
            if (values.id == "") {
                values.id = 0;
            }
            var JSONobj = [];
            //JSONobj.push(values);
            JSONobj.push(JSON.stringify(values));
           
            userForm.form.submit({
                clientValidation: true,
                waitMsg: '正在提交数据请稍候...',
                waitTitle: '提示',
                url: 'user_AddUser.action',
                method: 'post',
                params: {
                    datas: JSONobj
                },
                success: function (form, action) {
                 
                        Ext.Msg.alert('提示', "用户信息保存成功！");
                        UsersStore.load();
                        userForm.destroy();
                        userWin.destroy();
                   
                },
                failure: function (form, action) {
                  
                    Ext.MessageBox.show({
                        title: '错误',
                        msg: '用户信息保存失败!请检查数据是否完整！',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });

                }
            });
        }

        var userWin = new Ext.Window({     //创建弹出窗口
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
            items: [userForm]
        });
        if (rec != null) {
            userForm.loadRecord(rec);
            userForm.down('#username').readonly = true;
            userForm.down('#rolecode').setValue(rec.data.webRole.rolecode);
        }
        userWin.doLayout();
        userWin.show();
    }
    var tab = Ext.getCmp('mainContent').getActiveTab();
  
    tab.items.add(UsersGrid);
    tab.doLayout();
    xx =00;    
    
    }
  pageLoad();

});