<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>  
<script type="text/javascript">	
	var pSize = 15;
	var userCname = null,username = null;
</script>
<%
	//Object user = request.getSession().getAttribute("webUser");
	Object userName = request.getSession().getAttribute("userName");
	Object userCname = request.getSession().getAttribute("userCname");
	if(userName == null){
	%>
	<script type="text/javascript">
 		Ext.onReady(function() {
		    var scriptEls = document.getElementsByTagName('script'),
	        path = scriptEls[scriptEls.length - 1].src,
	        theme = getQueryParam('theme',path) || 'neptune',
	        neptune = (theme === 'neptune');
		    
		    Ext.Msg.show({title:'提示', msg:'当前页面已过期，请重新登陆！',buttons: Ext.Msg.OK, 
		    	fn:function(){window.location.href='logindo.action' + (neptune?'':'?theme='+ theme);},icon: Ext.Msg.WARNING});
			return false;
		}); 
	</script>
	<%
	}
	else{%>
	<script type="text/javascript">	
		username = "<%= userName %>";
		userCname = "<%= userCname %>";
	</script>
	<%
	}
%>
 