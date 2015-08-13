<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- <link rel="stylesheet" type="text/css" href="scripts/ext/ux/grid/css/GridFilters.css"/>
<link rel="stylesheet" type="text/css" href="scripts/ext/ux/grid/css/RangeMenu.css"/> -->
<script type="text/javascript" src="<%=basePath%>/scripts/ext/include-ext.js"></script>
<script type="text/javascript" src="<%=basePath%>/scripts/ext/options-toolbar.js"></script>
<script type="text/javascript" src="<%=basePath%>/scripts/ext/ux/extend/Util.js"></script>