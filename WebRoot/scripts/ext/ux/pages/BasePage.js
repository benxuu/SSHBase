/**
* 用户操作界面基础组件
*/
Ext.define('Epx.page.BasePage',{
	extend:'Ext.container.Container',
	requires:[
		'Epx.meta.MetaManager',
		'Epx.page.PageUtil'
	],
configs:{
},
/**
* 页面配置
* @type
*/
pageConfigs:{
},
/**
* 默认配置
* @type
*/
defaultConfigs:{
},
/**
* 组件初始化
*/
initComponent:function(){
var me=this;
me.initPage();
this.callParent();
},
initPage:function(){
var me=this;
//加载页面配置
me.loadConfigs();
//加载页面内容
me.items=me.createContent();
},
backPage:function(){
EPX.back();
},
toPage:function(config){
this.up().newPage(config);
},
backAndRefresh:function(){
this.up().backAndRefresh();
},
getUp:function(){
return this.up();
},
/**
* 创建页面内容
* @return {}
*/
createContent:function(){
return null;
},
/**
* 加载页面配置
*/
loadConfigs:function(){
}
});
