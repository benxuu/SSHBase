Ext.define('Ext.ux.extend.GridSearch', {
    extend: 'Ext.button.Button',
    alias: 'widget.gridsearch',
    
	scope: this,
    text: '高级查询',
    tooltip: '高级查询',
	iconCls: 'icon-advancesearch',
	grid:'',
	pageName:'',
	actionUrl:'',
	callback : Ext.emptyFn, 

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    afterRender: function(){
        this.callParent();
    },

    onClick : function(){
		var me = this;
		
	    var fieldStore = Ext.create('Ext.data.Store', {
	        fields: ['abbr', 'value'],
	        data: [
	            { abbr: '对象编码', value: 'objcode' },
	            { abbr: '对象名称', value: 'objname' },
	            { abbr: '对象类型', value: 'objtype' }
	        ]
	    });
	    
        var optStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'value'],
            data: [
            	{abbr:'等于',value:'='},
				{abbr:'不等于',value:'!='},
				{abbr:'包含',value:'Contain'},
				{abbr:'不包含',value:'!Contain'},
				{abbr:'大于',value:'>'},
				{abbr:'大于等于',value:'>='},
				{abbr:'小于',value:'<'},
				{abbr:'小于等于',value:'<='},
				{abbr:'为空',value:'isnull'},
				{abbr:'不为空',value:'not isnull'}
			]
        });
        
	    var searchForm = Ext.create('Ext.form.Panel', {
	    	itemId:'searchForm',
	    	frame:true,
			height:250,
			width:470,
			preBtn:me,
			bodyStyle:'padding:5 5 5 5',
			layout:{type:'column'},
	        defaults: {padding:'2 0 2 0'},
	        items:[{
			    itemId: 'schField1',
			    xtype: 'combo',
			    columnWidth:.45,
			    store: fieldStore,
			    editable: false,
			    loadingText: '正在加载...',
				fieldLabel: '条件1',
				labelWidth:80,
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {
						setValueField(combo,this.up('form').preBtn.grid);
			        }
			    }
			},{
			    itemId: 'optCmb1',
			    xtype: 'combo',
			    columnWidth:.2,
			    store: optStore,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
	        	itemId:'value1',
	            xtype: 'textfield',
	            columnWidth: 0.35
        	},{
			    itemId: 'schField2',
			    xtype: 'combo',
			    columnWidth:.45,
			    store: fieldStore,
			    editable: false,
			    loadingText: '正在加载...',
				fieldLabel: '条件2',
				labelWidth:80,
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
			    itemId: 'optCmb2',
			    xtype: 'combo',
			    columnWidth:.2,
			    store: optStore,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
	        	itemId:'value2',
	            xtype: 'textfield',
	            columnWidth: 0.35
        	},{
			    itemId: 'schField3',
			    xtype: 'combo',
			    columnWidth:.45,
			    store: fieldStore,
			    editable: false,
			    loadingText: '正在加载...',
				fieldLabel: '条件3',
				labelWidth:80,
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
			    itemId: 'optCmb3',
			    xtype: 'combo',
			    columnWidth:.2,
			    store: optStore,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
	        	itemId:'value3',
	            xtype: 'textfield',
	            columnWidth: 0.35
        	},{
			    itemId: 'schField4',
			    xtype: 'combo',
			    columnWidth:.45,
			    store: fieldStore,
			    editable: false,
			    loadingText: '正在加载...',
				fieldLabel: '条件4',
				labelWidth:80,
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
			    itemId: 'optCmb4',
			    xtype: 'combo',
			    columnWidth:.2,
			    store: optStore,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
	        	itemId:'value4',
	            xtype: 'textfield',
	            columnWidth: 0.35
        	},{
			    itemId: 'schField5',
			    xtype: 'combo',
			    columnWidth:.45,
			    store: fieldStore,
			    editable: false,
			    loadingText: '正在加载...',
				fieldLabel: '条件5',
				labelWidth:80,
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
			    itemId: 'optCmb5',
			    xtype: 'combo',
			    columnWidth:.2,
			    store: optStore,
			    editable: false,
			    loadingText: '正在加载...',
			    displayField: 'abbr',
			    valueField: 'value',
			    queryMode: 'local',
			    listeners: {
			        select: function (combo, record, index) {

			        }
			    }
			},{
	        	itemId:'value5',
	            xtype: 'textfield',
	            columnWidth: 0.35
        	},{
	        	itemId:'condComb',
	            xtype: 'textfield',
	            columnWidth: 1,
				fieldLabel: '条件组合',
				labelWidth:80
        	},{
                xtype: 'label',
                columnWidth: 1,
                padding: '0 0 0 80',
                text: '举例：(1 AND 2) or 3'
            }],
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'bottom',
			    layout:{type:'hbox',align:'center',pack:'center'},		    
			    items: [{
	                itemId: 'schBtn',
	                text: '查询',
	                tooltip: '查询数据',
					iconCls: 'icon-find',
	                preBtn:me,
	                handler:function(btn,e){

	                }
	            },{
	                itemId: 'clrbtn',
	                text: '清空',
	                tooltip: '清空数据',
					iconCls: 'icon-reload',
	                preBtn:me,
	                handler:function(btn,e){
	                	btn.up('form').getForm().reset();
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
		
		var schWin = new Ext.Window({ 
			layout:'fit',
			width:480,
			closeAction:'destroy',
			height:260,
			resizable:false,
			shadow:true,
			title:'高级查询',
			modal:true,
			closable:true,
			animCollapse:true,
			items:[searchForm]
		}).show(); 
    
		me.callback();
		
    	function setValueField(combo,grid){
			var grid =Ext.ComponentQuery.query('#' + grid)[0];
			var store = grid.getStore()
			var dType = 'string';
			for(var i =0; i< store.getCount(); i++){
				var item = store.getAt(i);
				if(this.value == item.name){
					dType = item.type;
					break;
				}
			}
//			
//            for (var j = 0; j < grid.filters.filterConfigs.length; j++) {
//                if (this.value == grid.filters.filterConfigs[j].dataIndex) {
//                    dType = grid.filters.filterConfigs[j].type;
//                    break;
//                }
//            }
            
          switch (dType) {
                case 'string':
                    break;
                case 'numeric':
                	var id = combo.itemId.substr(combo.itemId.length-1);
                	var form = combo.up('form');
                	var oCtl = form.down('#value' + id);
                	var nCtl = {
                		xtype: 'numberfield',
                        allowBlank: false
                	};
                	
                	var index = (parseInt(id)-1)*3 + 2;
                	form.remove(index);
                	form.insert(index,nCtl);

                    break;
                    
                case 'date':
                    optCmbStore.add({ abbr: '小于', value: 'lt' });
                    optCmbStore.add({ abbr: '等于', value: 'eq' });
                    optCmbStore.add({ abbr: '大于', value: 'gt' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'datefield',
                        fieldLabel: '',
                        allowBlank: true,
                        format: 'Y-m-d',
                        value: '',
                        columnWidth: 0.4
                    };
                    break;
                case 'boolean':
                    optCmbStore.add({ abbr: '等于', value: 'eq' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'combobox',
                        fieldLabel: '',
                        columnWidth: 0.4,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'value'],
                            data: [
                                { "abbr": '是', "value": true },
					            { "abbr": '否', "value": false}]
                        }),
                        allowBlank: true,
                        editable: false,
                        loadingText: '正在加载...',
                        displayField: 'abbr',
                        valueField: 'value',
                        emptyText: '请选择！',
                        queryMode: 'local'
                    };
                    break;
                default:
                    optCmbStore.add({ abbr: '包含', value: '' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'textfield',
                        fieldLabel: '',
                        columnWidth: 0.4
                    };
                    break;
            }
            
    	}
    }
});