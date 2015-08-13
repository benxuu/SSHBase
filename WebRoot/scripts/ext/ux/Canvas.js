/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.Canvas
 * @extends Ext.panel.Panel
 * <p>This class manages the wallpaper, shortcuts.</p>
 */
Ext.define('Ext.ux.Canvas', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.canvas',

    uses: [
        'Ext.util.MixedCollection',
        'Ext.menu.Menu',
        'Ext.view.View', // dataview
        'Ext.window.Window',
        'Ext.ux.Wallpaper'
    ],
	layout:{
		type:'fit',
		padding: '0 0 0 0'
	},
	margin: '0 0 0 0',
    //activeWindowCls: 'ux-desktop-active-win',
    //inactiveWindowCls: 'ux-desktop-inactive-win',
    //lastActiveWindow: null,	
    border: false,
    html: '&#160;',
    //layout: 'fit',

    xTickSize: 1,
    yTickSize: 1,

    app: null,

    /**
     * @cfg {Array|Store} shortcuts
     * The items to add to the DataView. This can be a {@link Ext.data.Store Store} or a
     * simple array. Items should minimally provide the fields in the
     * {@link Ext.ux.desktop.ShorcutModel ShortcutModel}.
     */
    shortcuts: null,

    /**
     * @cfg {String} shortcutItemSelector
     * This property is passed to the DataView for the desktop to select shortcut items.
     * If the {@link #shortcutTpl} is modified, this will probably need to be modified as
     * well.
     */
    shortcutItemSelector: 'div.ux-shortcut',

    /**
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link shortcutItemSelect} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',
            '<div class="ux-shortcut" id="{name}-shortcut">',
                '<div class="ux-shortcut-icon {iconCls}">',
                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
                '</div>',
                '<span class="ux-shortcut-text">{name}</span>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],

    
    initComponent: function () {
        var me = this;
        me.items = [
            { xtype: 'wallpaper', id: me.id+'_wallpaper' },
            me.createDataView()
        ];

        me.callParent();

        me.shortcutsView = me.items.getAt(1);
        me.shortcutsView.on('itemclick', me.onShortcutItemClick, me);

        var wallpaper = me.wallpaper;
        me.wallpaper = me.items.getAt(0);
        if (wallpaper) {
			//alert(wallpaper);
			//alert(me.shortcuts);
            me.setWallpaper(wallpaper, me.wallpaperStretch);
        }
    },
	initShortcut : function() {
        var btnHeight = 50;
		var btnWidth = 80;
		var btnPadding = 5;
		var col = {
			index : 1,
			x : btnPadding
		};
		var row = {
			index : 1,
			y : btnPadding
		};
		var upright;
		var numberOfItems = 0;		
		var bodyWidth = Ext.getBody().getWidth() ;
		var items = Ext.query(".ux-shortcut");//������������ʱ�����д

		for (var i = 0, len = items.length; i < len; i++) {
			numberOfItems += 1;
			upright = row.x + btnWidth;
			if (((bodyWidth < upright) ? true : false)
					&& upright > (btnWidth + btnPadding)) {
				numberOfItems = 0;
				col = {
					index : 1,
					x : btnPadding
				};
				row = {
					index : row.index++,
					y : row.y + btnHeight + btnPadding
				};
			}
			Ext.fly(items[i]).setXY([col.x, row.y]);
			col.index++;
			col.x = col.x + btnWidth + btnPadding;
		}
    },

    afterRender: function () {
        var me = this;
        me.callParent();
		//alert("afterReder");
		Ext.Function.defer(me.initShortcut,1);
    },

    //------------------------------------------------------
    // Overrideable configuration creation methods

    createDataView: function () {
        var me = this;
        return {
            xtype: 'dataview',
            overItemCls: 'x-view-over',
            trackOver: true,
            itemSelector: me.shortcutItemSelector,
            store: me.shortcuts,
            style: {
                position: 'absolute'
            },
            x: 0, y: 0,
            tpl: new Ext.XTemplate(me.shortcutTpl),
			listeners:{//for multiline shortcut Control.
                resize:me.initShortcut
            }			
        };
    },

    onShortcutItemClick: function (dataView, record) {
        //var me = this, module = me.app.getModule(record.data.module),
        //    win = module && module.createWindow();

        //if (win) {
        //    me.restoreWindow(win);
        //}
		alert('itemclicked.');
    },

    //------------------------------------------------------
    // Dynamic (re)configuration methods

    getWallpaper: function () {
        return this.wallpaper.wallpaper;
    },


    setWallpaper: function (wallpaper, stretch) {
        this.wallpaper.setWallpaper(wallpaper, stretch);
        return this;
    }
});
