Ext.define('Ext.ux.extend.ExcelExport', {
    extend: 'Ext.button.Button',
    alias: 'widget.excelexport',
    
	scope: this,
    text: 'Excel',
    tooltip: 'Excel',
	iconCls: 'icon-excel',
	pageName:'',
	actionUrl:'',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    afterRender: function(){
        this.callParent();
    },

    onClick : function(){
		var me = this;
		if(me.disabled) return;
	    var exportForm = Ext.create('Ext.form.Panel', {
	    	itemId:'exportForm',
	        title:'请选择需要导出的字段',
			height:370,
			width:570,
			bodyStyle:'padding:5 5 5 5',
	        items: [{
        	    xtype: 'container',
                height: 300,
		        autoWidth:true,
		        frame:true,
		        layout:{type: 'column'},
		        items:[{
		        	itemId:'aFieldsGrid',
	                xtype: 'gridpanel',
	                header: false,
	                selModel: Ext.create('Ext.selection.RowModel',{mode:"SIMPLE"}),
	                viewConfig: {stripeRows: true,enableTextSelection: true},
	                autoScroll:true,
	                store:Ext.create('Ext.data.Store', {
				        fields:['fieldName', 'fieldCName'],
				        data:[]
				    }),
	                height: 280,
	                columnWidth:0.37,
	                columns: [{
                    	text: '可选导出字段',
						dataIndex: 'fieldCName',
						flex:1
                    }]
                },{
		            xtype: 'container',
		            height: 280,
					columnWidth:0.15,
					layout:{type:'vbox',align:'center',pack:'center'},
		            items: [{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'addAllBtn',
		                text: '添加所有',
		                iconCls: 'icon-rightArrow',
		                handler:function(btn,e){
		                	var sStore = btn.up('form').down('#aFieldsGrid').getStore();
		                	var rStore =  btn.up('form').down('#eFieldsGrid').getStore();
		                	var records = sStore.getRange(0,sStore.getCount());
							sStore.remove(records);
							rStore.add(records);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'addSelsBtn',
		                text: '添加字段',
		                iconCls: 'icon-rightArrow2',
		                handler:function(btn,e){
		                	var sGrid = btn.up('form').down('#aFieldsGrid');
		                	var sStore = sGrid.getStore();
		                	var rStore =  btn.up('form').down('#eFieldsGrid').getStore();
		                	var records = sGrid.getSelectionModel().getSelection();
							sStore.remove(records);
							rStore.add(records);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'removSelsBtn',
		                text: '撤销字段',
		                iconCls: 'icon-leftArrow2',
		                handler:function(btn,e){
		                	var rGrid = btn.up('form').down('#eFieldsGrid');
		                	var sStore = btn.up('form').down('#aFieldsGrid').getStore();
		                	var rStore =  rGrid.getStore();
		                	var records = rGrid.getSelectionModel().getSelection();
							rStore.remove(records);
							sStore.add(records);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'removeAllBtn',
		                text: '撤销所有',
		                iconCls: 'icon-leftArrow',
		                handler:function(btn,e){
		                	var sStore = btn.up('form').down('#aFieldsGrid').getStore();
		                	var rStore =  btn.up('form').down('#eFieldsGrid').getStore();
		                	var records = rStore.getRange(0,rStore.getCount());
							rStore.remove(records);
							sStore.add(records);
		                }
		              }]
		          },{
		        	itemId:'eFieldsGrid',
	                xtype: 'gridpanel',
	                header: false,
	                selModel: Ext.create('Ext.selection.RowModel',{mode:"SIMPLE"}),
	                viewConfig: {stripeRows: true,enableTextSelection: true},
	                autoScroll:true,
	                store:Ext.create('Ext.data.Store', {
				        fields:['fieldName', 'fieldCName'],
				        data:[]
				    }),
	                height: 280,
	                columnWidth:0.37,
	                columns: [{
		            	text: '可被导出字段',
						dataIndex: 'fieldCName',
						flex:1
		            }]
	            },{
		            xtype: 'container',
		            height: 280,
					columnWidth:0.11,
					layout:{type:'vbox',align:'center',pack:'center'},
		            items: [{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'topBtn',
		                text: '置顶',
		                iconCls: 'icon-topArrow',
		                handler:function(btn,e){
		                	var rGrid = btn.up('form').down('#eFieldsGrid');
		                	var rStore =  rGrid.getStore();
		                	var record = rGrid.getSelectionModel().getSelection()[0];
							rStore.remove(record);
							rStore.insert(0,record);
							rGrid.getSelectionModel().select(0,true,false);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'upBtn',
		                text: '上移',
		                iconCls: 'icon-topArrow2',
		                handler:function(btn,e){
		                	var rGrid = btn.up('form').down('#eFieldsGrid');
		                	var rStore =  rGrid.getStore();
		                	var record = rGrid.getSelectionModel().getSelection()[0];
		                	var index = rStore.indexOf(record);
		                	if(index >0 ){
								rStore.removeAt(index);
								rStore.insert(--index,record);
		                	}
							rGrid.getSelectionModel().select(index,true,false);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'downBtn',
		                text: '下移',
		                iconCls: 'icon-downArrow2',
		                handler:function(btn,e){
		                	var rGrid = btn.up('form').down('#eFieldsGrid');
		                	var rStore =  rGrid.getStore();
		                	var record = rGrid.getSelectionModel().getSelection()[0];
		                	var index = rStore.indexOf(record);
		                	if(index < rStore.getCount() -1 ){
								rStore.removeAt(index);
								rStore.insert(++ index,record);
		                	}
							rGrid.getSelectionModel().select(index,true,false);
		                }
		              },{
		                xtype: 'button',
		                margins: '5 5 5 5',
		                itemId: 'bottomBtn',
		                text: '置底',
		                iconCls: 'icon-downArrow',
		                handler:function(btn,e){
		                	var rGrid = btn.up('form').down('#eFieldsGrid');
		                	var rStore=  rGrid.getStore();
		                	var record = rGrid.getSelectionModel().getSelection()[0];
		                	var index = rStore.indexOf(record);
		                	if(index < rStore.getCount() -1 ){
								rStore.remove(record);
								rStore.insert(rStore.getCount(),record);
		                	}
							rGrid.getSelectionModel().select(rStore.getCount()-1,true,false);
		                }
		              }]
		          }]
	        }],
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'bottom',
				style:'background:transparent;',
			    layout:{type:'hbox',align:'center',pack:'center'},		    
			    items: [{
	                xtype: 'FileDownloader',
	                itemId: 'downExcel',
	                width: 0,
	                height: 0
	            },{
	                itemId: 'expBtn',
	                text: '数据导出',
	                tooltip: 'Excel数据导出',
	                iconCls: 'icon-export',
	                preBtn:me,
	                handler:function(btn,e){
	                	var exportGrid =btn.preBtn.up('panel');

	                	var filter = new Array();
					    if (exportGrid.filters != undefined) {
					        for (var i = 0; i < exportGrid.filters.filters.keys.length; i++) {
					            var cf = exportGrid.filters.getFilter(exportGrid.filters.filters.keys[i]);
					            if (cf.active) {
					            	if(cf.type == 'boolean'){
					            		var ncf = {
						                    type: cf.type,
						                    field: cf.dataIndex,
						                    value: cf.getValue()	
					            		};
					            		filter.push(ncf);
					            	}else if(cf.type == 'date' ){
					            		var dateValue = cf.getValue();
					            		for(var j in dateValue){
						            		var ncf = {
							                    type: cf.type,
							                    field: cf.dataIndex,
							                    comparison:j=="before"?"lt":"gt",
							                    value: Ext.Date.format(dateValue[j],'Y-m-d')	
						            		};
						            		filter.push(ncf);
					            		}
					            	}else{
						                var ncf = {
						                    type: cf.inputItem.type,
						                    field: cf.inputItem.dataIndex,
						                    value: cf.inputItem.value
						                };
						                filter.push(ncf);
					            	}
					            }
					        }
					    }
	                	var sort = exportGrid.getStore().getSorters()[0];
	                	
	                	var rStore = btn.up('form').down('#eFieldsGrid').getStore();
	                	var headers= [] ,cheaders = [];
	                	
	                	rStore.each(function(rec){
	                		headers.push(rec.data.fieldName);
	                		cheaders.push(rec.data.fieldCName);
	                	});
      	
	                	var excelParam = {
	                		title:exportGrid.title,
	                		pageName:btn.preBtn.pageName, 
	                		objName:exportGrid.itemId,
	                		filter:filter.length ==0?null:filter,
	                		sort:sort==null?null:sort.property + ' ' + sort.direction,
	                		headers:headers,
	                		cheaders:cheaders
	                	}

	                    var downloader = btn.up('form').down('#downExcel');
	                    downloader.load({
	                        params: {excelParam:Ext.JSON.encode(excelParam)},
	                        url: btn.preBtn.actionUrl
	                    });
	                }
	            },{
	                itemId: 'retBtn',
	                text: '返回',
	                tooltip: '撤销返回',
	                iconCls: 'icon-return',
	                handler:function(btn,e){
						btn.up('window').close();
	                }
	            }
			]}]
	    });
	    
	    var sGrid = exportForm.down('#aFieldsGrid');
	    var exportGrid =me.up('panel');

	    if(exportGrid != undefined && exportGrid.xtype == 'gridpanel'){
		    for (var i = 0; i < exportGrid.initialConfig.columns.length; i++)
		        if (exportGrid.initialConfig.columns[i].hidden==undefined ||!exportGrid.initialConfig.columns[i].hidden) {
		            if (exportGrid.initialConfig.columns[i].columns == undefined)
		            	sGrid.getStore().add({fieldName:exportGrid.initialConfig.columns[i].dataIndex,fieldCName:exportGrid.initialConfig.columns[i].text});
		            else 
		                for (var j = 0; j < exportGrid.initialConfig.columns[i].columns.length; j++)
		                	sGrid.getStore().add({fieldName:exportGrid.initialConfig.columns[i].columns[j].dataIndex,fieldCName:exportGrid.initialConfig.columns[i].columns[j].text});
	        	}
	    }
		
		var epWin = new Ext.Window({ 
			layout:'fit',
			width:580,
			closeAction:'destroy',
			height:380,
			resizable:false,
			shadow:true,
			title:'数据导出',
			modal:true,
			closable:true,
			animCollapse:true,
			items:[exportForm]
		}).show(); 
    }
});