/**
* 页面工具
*/
Ext.define('Epx.page.PageUtil',{
requires:[
'Epx.meta.MetaManager',
'Epx.code.CodeManager',
'Epx.data.Entity',
'Epx.page.PageConfig'
],
singleton: true,
/**
* 加载页面配置对象
*/
loadConfigEntity:function(pageId,metaId){
var entity;
$.ajax({
url:EPX.url('getConfig','FM_PAGE_CONFIG'),
data:{page:pageId,metaId:metaId},
dataType:'json',
success:function(response){
entity=new Epx.data.Entity(response.data.bean);
},
async:false
});
return entity;
},
/**
* 加载页面配置
*/
loadConfig:function(pageId,metaId){
var entity=this.loadConfigEntity(pageId,metaId);
if(entity){
return Ext.decode(entity.getValue("CONTENT"));
}
return {};
},
/**
* 根据标识符和对象元数据来加载页面
*/
getPageConfig:function(flag,metaId){
var msg=EPX.get(EPX.url('getPageConfig','FM_PAGE_CONFIG'),{flag:flag,metaId:metaId});
if(msg.isSuccess()){
return new Epx.page.PageConfig(msg.getValue('bean'));
}else{
return null;
}
},
getPageConfigById:function(pageId){
var msg=EPX.get(EPX.url('getPageConfigById','FM_PAGE_CONFIG'),{id:pageId});
if(msg.isSuccess()){
return new Epx.page.PageConfig(msg.getValue('bean'));
}else{
return null;
}
},
/**
* 根据配置信息创建页面
* @author wanghong
* @flag 页面标识符
* @metaId 关联对象
* @config 传入的配置信息
* @defaultPage 默认页面
*/
createPage:function(flag,metaId,config,defaultPage,componentConfigs){
var pageConfig=Epx.page.PageUtil.getPageConfig(flag,metaId);
return this.createPageByConfig(pageConfig,config,defaultPage,componentConfigs);
},
createPageById:function(pageId,config,defaultPage){
var pageConfig=Epx.page.PageUtil.getPageConfigById(pageId);
return this.createPageByConfig(pageConfig,config,defaultPage);
},
/**
* 通过数据库页面配置创建页面
* @param {} pageConfig
* @param {} config
* @param {} defaultPage
* @param {} componentConfigs
* @return {}
*/
createPageByConfig:function(pageConfig,config,defaultPage,componentConfigs){
var path=defaultPage?defaultPage:'';
if(path&&path.indexOf(".")<0){
path='widget.'+path;
}
config=config?config:{};
if(pageConfig){
path=pageConfig.getPath();
config=Ext.apply(config,pageConfig.getConfig());
//为页面组件补充配置
//补充配置的格式[{configName:{key:value}}]
if(componentConfigs){
var name;
for(name in componentConfigs){
config[name]=Ext.applyIf(config[name]?config[name]:{},componentConfigs[name])
}
}
}
return Ext.create(path,config);
}
});