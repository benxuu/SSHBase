Ext.onReady(function() {
	var scriptEls = document.getElementsByTagName('script'),
    path = scriptEls[scriptEls.length - 1].src,
    theme = getQueryParam('theme',path) || 'neptune',
    neptune = (theme === 'neptune');
	
	closeTab();
 	Ext.MessageBox.confirm('提示','确认退出?',function(btn){
           if(btn=="yes")
	           window.location.href = "afLoginOutDo.action" + (neptune?'':'?theme='+ theme);
	});
	
	
});
