
/**
* 元数据管理
*/
Ext.define('Epx.meta.MetaManager',{
extend: 'Ext.util.MixedCollection',
requires: ['Epx.meta.Meta'],
singleton: true,
/**
* 获取元数据
* @param {} metaId
* @return {}
*/
getMeta:function(metaId){
var me=this;
var meta=me.get(metaId);
if(meta){
return meta;
} else{
$.ajax({
url:EPX.url('getMeta',metaId),
dataType:'json',
success:function(response){
var metaConfig=response;
meta=new Epx.meta.Meta(metaConfig);
//注册元数据
me.add(metaId,meta);
},
async:false
});
return meta;
}
},
/**
* 获取对象模型
* @param {} metaId 元数据编号
* @param {} name 模型标识符
* @return {} appendFields 附加的字段
*/
getModel:function(metaId,flag,appendFields){
var me=this;
var moduleFlag=flag||metaId;
//注册对象模型
if(!Ext.ModelManager.isRegistered(moduleFlag)){
var meta=me.getMeta(metaId);
var attriNames=meta.getAttriNames();
var key=meta.getKeyNames()[0];
Ext.define(moduleFlag,{
extend:'Ext.data.Model',
fields:me.createModelFields(metaId,appendFields),
idProperty:key
});
}
return Ext.ModelManager.getModel(moduleFlag);
},
/**
* 创建对象模型的字段
* @param {} metaId
* @return {}
*/
createModelFields:function(metaId,appendFields){
var me=this;
var fields=[];
//注册对象模型
var meta=me.getMeta(metaId);
var attriNames=meta.getAttriNames();
Ext.each(attriNames,function(attriName){
fields.push(attriName);
var attri=meta.getAttribute(attriName);
if(attri&&attri.relatedEntity){
fields.push(attriName+"#"); //对象字段
}
});
//关联表的字段
if(meta.relatedEntitys){
Ext.each(meta.relatedEntitys,function(relEntity){
var flag=relEntity.flag.toUpperCase();
var relMeta=me.getMeta(relEntity.entityA);
Ext.each(relMeta.getAttriNames(),function(field){
fields.push(flag+"|"+field);
var attri=relMeta.getAttribute(field);
if(attri&&attri.relatedEntity){
fields.push(flag+"|"+field+"#");
}
});
});
}
//附加字段
if(appendFields){
Ext.each(appendFields,function(f){
fields.push(f);
});
}
return fields;
}
});
