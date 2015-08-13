Ext.define('Ext.ux.extend.FileDownload',{
	extend:'Ext.Component',
	alias:'widget.FileDownloader',
	autoEl:{
		tag:'iframe',
		cls:'x-hidden',
		src:Ext.SSL_SECURE_URL
	},
	load:function(config){
		var e = this.getEl();
		e.dom.src = config.url +
			(config.params ? '?' + Ext.urlEncode(config.params) :'');
		e.dom.onload = function(){
			if(e.dom.contentDocument.body.childNodes[0].wholeText = '404'){
				Ext.Msg.show({
					title:'错误',
					msg:'未找到该文件!',
					buttons:Ext.Msg.OK,
					icon:Ext.MessageBox.ERROR
				})
			}
		}
	}
});