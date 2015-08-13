Ext.Loader.setConfig({enabled: true	});
Ext.Loader.setPath('Ext.app', 'scripts/ext/portal');
Ext.Loader.setPath('Ext.ux', 'scripts/ext/ux/');
Ext.Loader.setPath('Ext.App.police', 'scripts/js');
Ext.require([
	'Ext.ux.Canvas',
	'Ext.ux.Wallpaper',
	'Ext.ux.ShortcutModel',
	'Ext.panel.Panel',
	'Ext.tab.*',
	'Ext.ux.TabReorderer',
	'Ext.ux.statusbar.StatusBar',
    'Ext.layout.container.*',
    'Ext.resizer.Splitter',
    'Ext.fx.target.Element',
    'Ext.fx.target.Component',
    'Ext.window.Window',
    'Ext.app.Portlet',
    'Ext.app.PortalColumn',
    'Ext.app.PortalPanel',
    'Ext.app.PortalDropZone',
    'Ext.app.GridPortlet',
    'Ext.app.ChartPortlet'
]);

var getTools= function(){
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
};
var onPortletClose = function(portlet) {
    showMsg('"' + portlet.title + '" was removed');
};
var  showMsg = function (msg) {
    var el = Ext.get('app-msg'),
        msgId = Ext.id();

    this.msgId = msgId;
    el.update(msg).show();

    Ext.defer(this.clearMsg, 3000, this, [msgId]);
};

var clearMsg = function (msgId) {
    if (msgId === this.msgId) {
        Ext.get('app-msg').hide();
    }
};
var tabCount = 2;
Ext.define('Ext.police.App', {
    extend: 'Ext.container.Viewport', 
    initComponent: function(){        
        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [
			   Ext.create('Ext.ux.Canvas', {
					region: 'north',
					height: 80,                 
					margins: '0 0 0 0',
					shortcuts: Ext.create('Ext.data.Store', {
						model: 'Ext.ux.ShortcutModel',
						data: [
						   { name: '公共信息', iconCls: 'clock-shortcut', module: 'public-portal'},
						   { name: '资源库管理', iconCls: 'grid-shortcut', module: 'resource-manager'},
						   { name: '个人信息', iconCls: 'person-shortcut', module: 'person-portal' }]
					})
            }),{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                items: [{
                    id: 'app-options',
                    title: '导航',
                    region: 'west',
                    animCollapse: true,
                    width: 200,
                    minWidth: 150,
                    maxWidth: 400,
                    split: true,
                    collapsible: true,
                    layout:{
                        type: 'accordion',
                        animate: true
                    },
                    items: [{
                        html: '收藏个人常用的系统',
                        title:'我的收藏',
                        autoScroll: true,
                        border: false,
                        iconCls: 'nav'
                    },{
                        title:'系统设置',
                        html: '个人相关参数设置',
                        border: false,
                        autoScroll: true,
                        iconCls: 'settings'
                    },{
						title: '个人中心',
						html: '<p>个人中心</p>',
						border: false,
                        autoScroll: true,
						iconCls: 'info'
					}]
                },{
                    id: 'app-portal',
                    region: 'center',
					items:[
						 Ext.create('Ext.tab.Panel', {
							bodyStyle: 'padding:5px',
							plugins: Ext.create('Ext.ux.TabReorderer'),
							items: [
								{
									xtype: 'portalpanel',
									title: '个人门户',
									closable: false,
									items:[{
										id: 'col-1',
										items: [{
											id: 'portlet-1',
											title: '下载中心',
											tools: getTools(),													
											html: '软件及文档下载',
											listeners: {
												'close': Ext.bind(this.onPortletClose, this)
											}
										},{
											id: 'portlet-2',
											title: '工作提醒',
											tools: getTools(),
											html: '显示待办事务提醒',//content,
											listeners: {
												'close': Ext.bind(this.onPortletClose, this)
											}
									   }]
									},{
										id: 'col-2',
										items: [{
											id: 'portlet-3',
											title: '新闻中心',
											tools: getTools(),
											html: '相关新闻链接',
											listeners: {
												'close': Ext.bind(this.onPortletClose, this)
											}
										}]
									},{
										id: 'col-3',
										items: [{
											id: 'portlet-4',
											title: '电子公告',
											tools: getTools(),
											html: '当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>当前无公告<br/>',
											//items: Ext.create('Ext.app.ChartPortlet'),
											listeners: {
												'close': Ext.bind(this.onPortletClose, this)
											}
										}]
									}]
								},{
									xtype: 'panel',
									title: 'Tab 2',
									html : 'Test 2',
									closable: true
								}
							]
						})
					]
                }]
            	},{
					id: 'app-footer',
					xtype: 'panel',
					region: 'south',
					manageHeight: false,
        			bodyPadding: 1,
					//height: 20,
					width:300,
					margins: '0 0 0 0',
					items:Ext.create('Ext.ux.StatusBar', {
						defaultText: '欢迎使用民警工作平台',
						text: '系统就绪',
						iconCls: 'x-status-valid',
						id: 'basic-statusbar',
						
						items: ['当前用户：admin', '-', Ext.Date.format(new Date(), 'Y年/n月/d日'),'-',{
							xtype: 'button',
							iconCls:'close',
							text: '退出',
							handler: function (){
								var scriptEls = document.getElementsByTagName('script'),
							    path = scriptEls[scriptEls.length - 1].src,
							    theme = getQueryParam('theme',path) || 'neptune',
							    neptune = (theme === 'neptune');
								
							 	Ext.MessageBox.confirm('提示','确认退出？',function(btn){
						           if(btn=="yes")
						               Ext.Ajax.request({
						                    url: 'afLoginOutdo.action',
						                    method: 'post',
						                    autosync: true,
						                    scope: this,
						                    success: function (response) {
						                    	Ext.Msg.show({title:'提示', msg:'您已经退出！',buttons: Ext.Msg.OK,icon: Ext.Msg.INFO,fn:function(){
						                    		window.location.href = "logindo.action" + (neptune?'':'?theme='+ theme);
						                    	}});
						                    },
						                    failure: function (response) {
						                    }
						                });
								           
								});
							}
						}]
					})
            	}]
        });
        this.callParent(arguments);
    },
	onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '"被您移除了!');
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
Ext.onReady(function() {
	if (username != null) 
		Ext.create('Ext.police.App');
});
