Ext.define('Ext.ux.extend.MultiSelect', {
    extend: 'Ext.button.Button',

    alias: 'widget.multiselect',

	scope: this,
    text: 'Excel',
    tooltip: 'Excel',
	iconCls: 'icon-excel',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
//        me.on('specialkey', function(f, e){
//            if (e.getKey() == e.ENTER) {
//                me.onTrigger2Click();
//            }
//        });

//        me.store.remoteFilter = true;
//        if (!me.store.proxy.hasOwnProperty('filterParam')) {
//            me.store.proxy.filterParam = me.paramName;
//        }
//        me.store.proxy.encodeFilters = function(filters) {
//            return filters[0].value;
//        }
    },

    afterRender: function(){
        this.callParent();
//        this.triggerCell.item(0).setDisplayed(false);
    },

    onClick : function(){
    	
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';

    /*
     * Ext.ux.form.MultiSelect Example Code
     */
    var msForm = new Ext.form.FormPanel({
        title: 'MultiSelect Test',
        width: 700,
        bodyStyle: 'padding:10px;',
        items:[{
            xtype: 'multiselect',
            fieldLabel: 'Multiselect<br />(Required)',
            name: 'multiselect',
            width: 250,
            height: 200,
            allowBlank:false,
            store: [[123,'One Hundred Twenty Three'],
                    ['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five'],
                    ['6', 'Six'], ['7', 'Seven'], ['8', 'Eight'], ['9', 'Nine']],
            tbar:[{
                text: 'clear',
                handler: function(){
                  msForm.getForm().findField('multiselect').reset();
              }
            }],
            ddReorder: true
        }],
        tbar:[{
            text: 'Options',
            menu: [{
              text: 'Set Value (2,3)',
              handler: function(){
                  msForm.getForm().findField('multiselect').setValue('2,3');
              }
          },{
              text: 'Toggle Enabled',
              handler: function(){
                  var m = msForm.getForm().findField('multiselect');
                  if (!m.disabled) {
                      m.disable();
                  } else {
                      m.enable();
                  }
              }
            }]
        }],

        buttons: [{
            text: 'Save',
            handler: function(){
                if(msForm.getForm().isValid()){
                  Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                      msForm.getForm().getValues(true));
                }
            }
        }]
    });


    var ds = new Ext.data.ArrayStore({
        data: [[123,'One Hundred Twenty Three'],
            ['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five'],
            ['6', 'Six'], ['7', 'Seven'], ['8', 'Eight'], ['9', 'Nine']],
        fields: ['value','text'],
        sortInfo: {
            field: 'value',
            direction: 'ASC'
        }
    });

    /*
     * Ext.ux.form.ItemSelector Example Code
     */
    var isForm = new Ext.form.FormPanel({
        title: 'ItemSelector Test',
        width:700,
        bodyStyle: 'padding:10px;',
        items:[{
            xtype: 'itemselector',
            name: 'itemselector',
            fieldLabel: 'ItemSelector',
            imagePath: 'ext-3.0.0/examples/ux/images/',
            store:[['10','Ten']],
            multiselects: [{
                width: 250,
                height: 200,
                store: ds,
                displayField: 'text',
                valueField: 'value'
            }
//            ,{
//                width: 250,
//                height: 200,
//                store: [['10','Ten']],
//                tbar:[{
//                    text: 'clear',
//                    handler:function(){
//                      isForm.getForm().findField('itemselector').reset();
//                  }
//                }]
//            }
            ]
        }],

        buttons: [{
            text: 'Save',
            handler: function(){
                if(isForm.getForm().isValid()){
                    Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                        isForm.getForm().getValues(true));
                }
            }
        }]
    });
//		var selTree = new Ext.ux.Multiselect({  
//  			id: "theme", name: 'theme',  		  
//			dataFields: ["tValue", "tText"],  		  
//			store: Ext.create('Ext.data.Store', {
//				fields: ['tValue', 'tText'],
//             	data: [["1", "根"], ["2", "Image"], ["3", "CSS"], ["4", "JavaScript"], ["5", "resources"]]
//            }),			  
//			valueField: "tValue",  			  
//			displayField: "tText",  			  
//			width: 200,  			  
//			height: 100,  			  
//			legend: "主题列表"  			  
//		});
//		
//    	var selForm = Ext.create('Ext.form.Panel', {
//		    frame:true,
//    		autoScroll: true,
//		    bodyStyle:'padding:5px 5px 0',
//		    autoWidth: true,
//		    fieldDefaults: {
//		        msgTarget: 'side',
//		        labelWidth: 75
//		    },
//		    defaults: {
//		        anchor: '100%'
//		    },
//		    items: [selTree]
//		    
//		    
//		    
//		    
////		    ,
////		    buttons: [{
////			    text: '确定',
////			    handler: function(){
////			    	var batchCmb = navform.form.findField('batch');
////					var prdCatCmb = navform.form.findField('prdCat');
////					if(batchCmb.value==null || prdCatCmb.value == null){
////						 Ext.Msg.show({title:"提示",msg: "请选择批次和产品分类！",buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING});
////						 return;
////					}else{
////						navwin.hide();
////			    		showEPApply();
////					}
////			    }
////			}, {
////			    text: '取消',
////			    handler: function() {
////			      navwin.close();
////			    }
////			}]
//		});
		
		var selWin = new Ext.Window({ 
			layout:'fit',
			width:380,
			iconCls:'dataInput',
			closeAction:'destroy',
			height:560,
			resizable:false,
			shadow:true,
			title:'请选择',
			modal:true,
			closable:true,
			bodyStyle:'padding:5 5 5 5',
			animCollapse:true,
			items:[msForm,isForm],
			listeners:{
				'beforeclose':function(selWin){;}
			}
		}).show(); 
    }
});