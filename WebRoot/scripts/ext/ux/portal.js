/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */

Ext.define('Ext.ux.police.Portal', {
    extend: 'Ext.Component',
	alias: 'widget.portalview',
    requires: ['Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'],
	//height:500,
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, header, tool){
                var portlet = header.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function(){
        Ext.apply(this, {
            id: 'app-portal-panel',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [
				{
                    id: 'app-portal',
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        items: [{
                            id: 'portlet-1',
                            title: '下载中心',
                            tools: this.getTools(),
                            //items: Ext.create('Ext.app.GridPortlet'),
							html: '软件及文档下载',
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        },{
                            id: 'portlet-2',
                            title: '工作提醒',
                            tools: this.getTools(),
                            html: '显示民警待办事务提醒',//content,
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    },{
                        id: 'col-2',
                        items: [{
                            id: 'portlet-3',
                            title: '新闻中心',
                            tools: this.getTools(),
                            html: '相关新闻链接',//'<div class="portlet-content">'+Ext.example.bogusMarkup+'</div>',
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    },{
                        id: 'col-3',
                        items: [{
                            id: 'portlet-4',
                            title: '电子公告',
                            tools: this.getTools(),
                            //items: Ext.create('Ext.app.ChartPortlet'),
							html: '当前无公告',
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    }]
                }]
        });
        this.callParent(arguments);
    },
	
    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '"被您移除了.');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});
