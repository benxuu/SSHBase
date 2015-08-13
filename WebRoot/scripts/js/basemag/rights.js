Ext.onReady(function () {
	if (username == null) return;
    Ext.QuickTips.init();
    getRight("rightObject",pageLoad);
    function pageLoad(objRights){
    Ext.define('RightsModel', {
        extend: 'Ext.data.Model',
        fields: [{ name: 'rightcode'}, { name: 'rightname' }, { name: "memo" }]
    });

    var RightsCmbStore = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'value'],
        data: [
            { abbr: '权限编码', value: 'rightcode' },
            { abbr: '权限名称', value: 'rightname' },
            { abbr: '备注', value: 'memo' }
        ]
    });

//    var right = Ext.JSON.decode(icsfmr);
    var RightsStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: pSize,
        model: 'RightsModel',
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: 'rightsall.action',
            method: 'POST',
            reader: {
            	idProperty: 'rightcode',
                root: 'list',
                totalProperty: 'total'
            },
//            extraParams: {
//                preFilter: right.inquiry_cond == null ? null : Ext.encode(right.inquiry_cond)
//            },
            simpleSortMode: true
        }
//       ,
//       sorters: [{ property: 'funccode', direction: 'ASC'}]
   });

    var RightsGrid = Ext.create('Ext.grid.Panel', {
        itemId: 'RightsGrid',
        store: RightsStore,
        selModel:Ext.create('Ext.selection.CheckboxModel'),
        columnLines: true,
        autoHeight: true,
        autoWidth: true,
        title: '权限管理',
        frame: true,
        loadMask: true,
        renderTo: 'RightsDiv',
        viewConfig: { stripeRows: true },
        columns: [
            { text: "权限编码", width: 100, dataIndex: 'rightcode', sortable: true},
            { text: "权限名称", width: 150, dataIndex: 'rightname', sortable: true },
            { text: "备注", width: 100, dataIndex: 'memo', sortable: false, hidden: true , flex: 1}
	    ],
        features: [{
            ftype: 'filters',
            encode: true,
            local: false,
            filters: [
            	{type: 'string',dataIndex: 'rightcode',disabled: false}, 
        		{type: 'string',dataIndex: 'rightname',disabled: false}
        	]
        }],
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                itemId: 'addButton',
                text:'增加权限',
                tooltip:'增加权限',
                iconCls:'icon-add',
                scope:this,
                handler:addRight
            },'-',{
                itemId: 'updateButton',
                text:'修改权限',
                tooltip:'修改权限',
                iconCls:'icon-edit',
                scope:this,
                handler:modifyRight
            },'-',{
                itemId: 'delButton',
                text:'删除权限',
                tooltip:'删除权限',
                scope:this,
                iconCls:'icon-delete',
            	listeners:{
					'click':function(o, e) {
						var action = "delRightCRUD.action";
						var idList = getSelIds(o.ownerCt.ownerCt);
						if(idList.length ==0) return;
						var mixIds = [];
						for (var i in idList) {
					        mixIds.push(idList[i].funccode + ',' + idList[i].objcode);
					    }
						var params = {Ids : mixIds.join('-')};
						var store = o.ownerCt.ownerCt.store;
						DoDelete(action, params, store);
//	           			delSysModel(o.ownerCt.ownerCt); 
	        		}
				}
            },'-',{
                xtype: 'FileDownloader',
                id: 'RightsDownloader',
                width: 0,
                height: 0
            }, '->',{
                text: '查询',
                tooltip: '查询',
                iconCls: 'icon-search',
                handler: function () { SearchWinShow(FuncGrid); }
            }, '-', {
                text: '显示全部',
                tooltip: '显示全部',
                iconCls: 'icon-showall',
                handler: function () {
                    RightsGrid.filters.clearFilters();
                }
            }, '-', {
                text: 'Excel',
                tooltip: 'Excel',
                scope: this,
                iconCls: 'icon-excel',
                handler: function () {
                    var list = getExcelParams(Ext.getCmp('RightsGrid'));
                    var downloader = Ext.getCmp('RightsDownloader');
                    downloader.load({
                        params: { preFilter: list[0], filter: list[1], sort: list[2], dir: list[3], headers: list[4], cheaders: list[5], title: list[6] },
                        url: 'rightstoExcel.action'
                    });
                }
            }, '-', '显示记录数',{
			    id: 'RightsCmbNum',
			    name: 'RightsCmbNum',
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
			            RightsStore.pageSize = pSize;
			            RightsStore.load();
			        }
			    }
			}]
        },
	    Ext.create('Ext.PagingToolbar', {
	        pageSize: pSize,
	        dock: 'bottom',
	        store: RightsStore,
	        displayInfo: true,
	        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	        emptyMsg: '没有数据',
	        plugins: Ext.create('Ext.ux.ProgressBarPager', {})
	    })]
    });
    var searchForm = Ext.create('Ext.form.Panel', {
    	itemId:'searchForm',
        title: '查询条件',
    	height:100,
        autoWidth: true,
        bodyPadding: 10,
        layout: {type: 'column'},
        defaults:{padding: '2 10 2 10'},
        items: [{
        	itemId:'objcode',
            xtype: 'textfield',
            columnWidth: 0.2,
            fieldLabel: '对象编码',
            labelWidth: 60
        },{
        	itemId:'objname',
            xtype: 'textfield',
            columnWidth: 0.2,
            fieldLabel: '对象名称',
            labelWidth: 60
        },{
        	itemId:'objtype',
            xtype: 'textfield',
            columnWidth: 0.2,
            fieldLabel: '对象类型',
            labelWidth: 60
        }],
    	dockedItems: [{
    	    xtype: 'toolbar',
    	    dock: 'bottom',
    	    style:'background:transparent;',
    	    layout:{type:'hbox',align:'center',pack:'center'},
    	    items: [{
                itemId: 'searchBtn',
                text: '查询',
                tooltip: '数据查询',
                iconCls: 'icon-find',
                handler:function(btn,e){
                	var filterArr = [];
                	var value;
                	if((value = btn.up('form').down('#objcode').value) != undefined)
                		filterArr.push({type:'string',field:'objcode',value:value});
                	if((value = btn.up('form').down('#objname').value) != undefined)
                		filterArr.push({type:'string',field:'objname',value:value});
                	if((value = btn.up('form').down('#objtype').value) != undefined)
                		filterArr.push({type:'string',field:'objtype',value:value});
                    
    		        var grid = FuncGrid;
//    		        var dateValue = Ext.Date.parse(aFilter.value, 'Y-m-d H:i:s');
//    		        var value = aFilter.comparison == 'gt' ? {after: dateValue} : {before: dateValue};
    		
    		        for(var i in filterArr){
    			        var gridFilter = grid.filters.getFilter(filterArr[i].field);
    			        if (!gridFilter) {
    			            gridFilter = grid.filters.addFilter({
    			                active: true,
    			                type: filterArr[i].type,
    			                dataIndex: filterArr[i].field
    			            });
    			
    			            gridFilter.menu.show();
    			            gridFilter.setValue(filterArr[i].value);
    			            gridFilter.menu.hide();
    			        } else {
    			            gridFilter.setActive(true);
    			        }
    		        }

    		        Ext.Function.defer(function(){
    		            gridFilter = grid.filters.getFilter(filterArr[i].field);
    		            gridFilter.setValue(filterArr[i].value);
    		        }, 10);
                }
            },{
                itemId: 'searchAllBtn',
                text: '全部',
                tooltip: '显示全部',
                iconCls: 'icon-showall',
                handler: function () {
                    FuncGrid.filters.clearFilters();
                }
            },{
            	itemId:'schBtn',
                xtype: 'gridsearch',
                grid:'FuncGrid',
                pageName:'SysObject',
    			actionUrl:'funcModelstoExcel.action'
            }]
    	}]
    });

    var tab = Ext.getCmp('mainContent').getActiveTab();
    tab.items.add(searchForm);
    tab.items.add(RightsGrid);
    xx =00;    
    //新增
  function addRight(){
		userform.form.reset();
		userform.isAdd = true;
		Ext.getCmp("username").setReadOnly(false);
		win.setTitle('新增用户信息');
		win.show();
	}
  
  //修改
  function modifyRight(){
    	var usrIdList = getSelIds();
    	var num = usrIdList.length;
		if(num > 1){
			Ext.MessageBox.alert('提示', '每次只能修改一条用户信息!');
		}else if(num == 1){
			userform.form.reset();
			userform.isAdd = false;
			Ext.getCmp("username").setReadOnly(true);
			win.setTitle('修改用户信息');
			win.show();
			var usrId = usrIdList[0];
			loadForm(usrId);
		}
	}
	
	//删除
	var delRight = function(grid){
    	var ids = getSelIds(grid);
    	var idsLen = ids.length;
    	if(idsLen ==0) return;
    	
    	Ext.MessageBox.confirm('提示', '您确定要删除所选吗?',function(btnId){
			if(btnId == 'yes'){
				delUser(ids);
			}
		});
    }
    }
    //    function SearchWinShow(Obj) {
    //        var searchForm = Ext.create('Ext.form.Panel', {
    //            frame: true,
    //            bodyStyle: 'padding:5px 5px 0',
    //            autoWidth: true,
    //            fieldDefaults: {
    //                msgTarget: 'side',
    //                labelWidth: 75
    //            },
    //            defaultType: 'textfield',
    //            defaults: {
    //                anchor: '100%'
    //            },
    //            items: [],
    //            buttons: [{
    //                text: '确定'//,
    //                //handler: submitForm
    //            }, {
    //                text: '取消',
    //                handler: function () {
    //                    win.hide();
    //                }
    //            }]

    //        });


    //        var searchWin = new Ext.Window({     //创建弹出窗口
    //            layout: 'fit',
    //            width: 380,
    //            closeAction: 'hide',
    //            height: 280,
    //            resizable: false,
    //            shadow: true,
    //            modal: true,
    //            closable: true,
    //            bodyStyle: 'padding:5 5 5 5',
    //            animCollapse: true,
    //            items: [searchForm]
    //        });
    //    }
});