Ext.define('Ext.ux.extend.MenuSearchField', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.menusearchfield',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    paramName : 'query',
    callback : Ext.emptyFn, 

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });

        me.store.remoteFilter = true;
        if (!me.store.proxy.hasOwnProperty('filterParam')) {
            me.store.proxy.filterParam = me.paramName;
        }
        me.store.proxy.encodeFilters = function(filters) {
            return filters[0].value;
        }
    },

    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click : function(){
        var me = this;

        if (me.hasSearch) {
            me.setValue('');
            me.store.clearFilter();
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.updateLayout();
        }
    },

    onTrigger2Click : function(){
        var me = this,
            value = me.getValue();

        if (value.length > 0) {
        	var menu = Ext.getCmp('menubar');
        	var expendId = 0;
        	for(var i = 0; i< menu.items.length; i++){
        		if(menu.items.items[i].header.title.indexOf(value)>=0)
        		{ 
        			expendId = i; 
        			break;
        		}
        		var treepanel = menu.items.items[i];
        		var root  = treepanel.getRootNode();
        		root.findChildBy(function(node){
					if(node.data.text.indexOf(value)>=0){
        				expendId = i;
        				return true;
        			}
        		})
        	}
        	
        	menu.items.items[expendId].expand()
            me.hasSearch = true;
            me.triggerCell.item(0).setDisplayed(true);
            me.updateLayout();
        }
        me.callback();
    }
});