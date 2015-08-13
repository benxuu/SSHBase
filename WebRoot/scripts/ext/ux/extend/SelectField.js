Ext.define('Ext.ux.extend.SelectField', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.selectfield',
    codeValue:'',
    params:'',
    callback : Ext.emptyFn, 
    editable:false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    
    onTriggerClick: function() {
    	var me = this;
    	if(me.store.length == 0 ) return false;
		var selTree = Ext.create('Ext.tree.Panel', {
			store: me.store,
			method:'POST',
			title: '',
			rootVisible: false,
			autoWidth:true,
			autoHeight:true,
			useArrows : true,
			split:true,
			collapsible : false,
			autoScroll : true,
			animate : true,
			listeners: {
            	'itemclick': function (view, record, item, index, e) {
            		if (record.raw.leaf){
	            		me.setValue(record.data.text);
	            		me.codeValue = record.data.id;
	            		me.params = record.raw.params;
	            		selWin.close();
	            		me.callback();
            		}
            	}
			}
		});
		
		var selWin = new Ext.Window({ 
			layout:'fit',
			width:280,
			iconCls:'icon-accept',
			closeAction:'destroy',
			height:360,
			resizable:true,
			shadow:true,
			title:'请选择',
			modal:true,
			closable:true,
			bodyStyle:'padding:5 5 5 5',
			animCollapse:true,
			items:[selTree],
			listeners:{
				'beforeclose':function(selWin){;}
			}
		}).show(); 
    }
});