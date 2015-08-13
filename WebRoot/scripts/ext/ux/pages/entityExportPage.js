//数据导出
Ext.define('Ext.ux.extend.EntityExportPage',{
	extend:'Epx.ux.pages.BasePage',
	
	/**
	 * 元数据
	 * @type 
	 */
	metaId:null,
	/**
	 * 查询参数
	 * @type 
	 */
	param : null,
	
	/**
	 * Query字符串
	 * @type 
	 */
	queryString : null,
	
	/**
	 * 导出操作动作
	 */
	exportAction : 'entityExport',

   /**
    * 创建页面内容
    * @return {}
    */
	createContent:function(){
		var me=this,items=[];
		items = [me.createMatePanel(),me.createOperate()];
		return items;
	},
    
    /**
     * 字段选取区域
     * @return {}
     */
    createMatePanel:function(){
    	var me=this;
    	//定义Model
    	Ext.define('Epx.ux.pages.ExportField',{
    		extend:'Ext.data.Model',
    		fields:['ID','NAME'],
    		idProperty:'ID'   
    	});
    	
    	var entityFieldsStore=Ext.create('Ext.data.Store',{
    		model:'Epx.ux.pages.ExportField',
    		proxy: {
		         type: 'ajax',
		         url:EPX.url('initExportField',me.metaId),
		         extraParams : me.param,
		         reader: {
		                root: 'data.fields',
		                type:'json'
		         },
		         actionMethods:'POST',
		         simpleSortMode: true
		    },
			autoLoad:true
    	});
    	
    	var excelFieldsStore=Ext.create('Ext.data.Store',{
    		model:'Epx.ux.pages.ExportField',
    		data:[]
    	});
    	
    	 	
    	me.matePanel=Ext.create('Ext.panel.Panel',{
    		title:'选择需要导出字段',
    		height:'92%',
    		layout:{
    		   type:'hbox',
    		   pack:'center',
    		   align:'center'
    		},
    		items:[{
    			xtype:'grid',
    			store:entityFieldsStore,
    			itemId:'entityFieldGrid',
    			width:200,
    			height:300,
    			padding:5,
    			forceFit:true,
    			selectedRow : true,
    			multiSelect : true,
    			viewConfig : {
    				plugins : {
    					ptype : 'gridviewdragdrop',
    					dragGroup : 'entityFieldGrid',
    					dropGroup : 'excelFieldGrid'
    				}
    			},
    			columns:[{
    				dataIndex:'NAME',
    				text:'可选导出字段',
    				sortable:false
    			}]
    		},{
    			xtype:'toolbar',
    			width:100,
    			height:300,
    			cls:'main',
    			layout:{
    				type:'vbox',
    				pack:'center',
    				align:'center'
    			},
    			items:[{
    				xtype:'button',
    				text:'添加所有',
    				scope:me,
    				iconCls:'icon-all-rigth',
    				handler:me.addAllField
    			},{
    				xtype:'button',
    				text:'添加字段',
    				scope:me,
    				iconCls:'icon-one-rigth',
    				handler:me.addField
    			},{
    				xtype:'button',
    				text:'撤销字段',
    				scope:me,
    				iconCls:'icon-one-left',
    				handler:me.cancelField
    			},{
    				xtype:'button',
    				text:'撤销所有',
    				scope:me,
    				iconCls:'icon-all-left',
    				handler:me.cancelAllField
    			}]
    		},{
    			xtype:'grid',
    			store:excelFieldsStore,
    			itemId:'excelFieldGrid',
    			width:200,
    			height:300,
    			padding:5,
    			forceFit:true,
    			selectedRow : true,
    			multiSelect : true,
    			viewConfig : {
    				plugins : {
    					ptype : 'gridviewdragdrop',
    					dragGroup : 'excelFieldGrid',
    					dropGroup : 'entityFieldGrid'
    				}
    			},
    			columns:[{
    				dataIndex:'NAME',
    				sortable:false,
    				text:'可被导出字段'
    			}]
    		},{
    			xtype:'toolbar',
    			width:60,
    			height:300,
    			cls:'main',
    			layout:{
    				type:'vbox',
    				pack:'center',
    				align:'center'
    			},
    			items:[{
        			xtype:'button',
        			text:'置顶',
        			scope:me,
        			iconCls:'icon-to-top',
        			handler:me.toTop
        		},{
        			xtype:'button',
        			text:'上移',
        			scope:me,
        			iconCls:'icon-to-up',
        			handler:me.toUp
        		},{
        			xtype:'button',
        			text:'下移',
        			scope:me,
        			iconCls:'icon-to-down',
        			handler:me.toDown
        		},{
        			xtype:'button',
        			text:'置底',
        			scope:me,
        			iconCls:'icon-to-bottom',
        			handler:me.toBottom
        		}]
    		}]
    	});
    	return me.matePanel;
    },
    
    /**
     * 操作按钮区域
     * @return {}
     */
    createOperate:function(){
    	var me=this;
    	var operate={
    		xtype:'toolbar',
    		cls:'main',
    		layout:{
    			type:'hbox',
    			pack:'center',
    			align:'center'
    		},
    		items:[{
    			xtype:'button',
    			text:'导出',
    			scope:me,
    			iconCls:'icon-export',
    			handler:me.entityExport    			
    		},{
    			xtype:'button',
    			text:'返回',
    			scope:me,
    			iconCls:'icon-return',
    			handler:me.backPage
    		}]
    	};
    	return operate;
    },
    
   /**
    * 添加字段
    */
    addField:function(){
       var me=this;
       var entityFieldGrid = me.matePanel.getComponent('entityFieldGrid');
       var selectionModel = entityFieldGrid.getSelectionModel();
       if(selectionModel.hasSelection()){
    	   var entityFields = selectionModel.getSelection();
    	   var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
           var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
           for(var i = 0; i< entityFields.length; i++){
				var entityField = entityFields[i];
		       	excelFieldStore.add(entityField);
		       	entityFieldStore.remove(entityField);
		   }  
    	   
//          var entityField = selectionModel.getSelection()[0];
//          var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
//          var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
//	       	excelFieldStore.add(entityField);
//	       	entityFieldStore.remove(entityField);
       }else{
            Ext.Msg.alert('系统提示','请先从左边选中字段后再添加');
           	return;
        }
    },
    
    /**
     * 撤销字段
     */
    cancelField:function(){
    	var me=this;
    	var excelFieldGrid = me.matePanel.getComponent('excelFieldGrid');
    	var selectionModel = excelFieldGrid.getSelectionModel();
        if(selectionModel.hasSelection()){
        	var excelFields = selectionModel.getSelection();
        	var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
            var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
            for(var i = 0; i< excelFields.length; i++){
            	var excelField = excelFields[i];
	           	entityFieldStore.add(excelField);
	           	excelFieldStore.remove(excelField);
		   }  
        	
//        	var excelField = selectionModel.getSelection()[0];
//        	var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
//          var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
//       	entityFieldStore.add(excelField);
//       	excelFieldStore.remove(excelField);
        }else{
      	  	Ext.Msg.alert('系统提示','请先从右边选中字段后再撤销');
      	  	return;
        }
    },
    
    /**
     * 添加所有
     */
    addAllField:function(){
    	var me=this;
        var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
        var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
        if(entityFieldStore && entityFieldStore.count()>0){
        	entityFieldStore.each(function(entityField){
     		    excelFieldStore.add(entityField);
        	});
        	entityFieldStore.removeAll();
        }else{
        	Ext.Msg.alert('系统提示','没有字段可添加了');
      	    return;
        }
    },
    /**
     * 撤销所有
     */
    cancelAllField:function(){
    	var me=this;
        var entityFieldStore=me.matePanel.getComponent('entityFieldGrid').getStore();
        var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();   
        if(excelFieldStore && excelFieldStore.count() > 0){
        	excelFieldStore.each(function(excelField){
        		entityFieldStore.add(excelField);
        	});
        	excelFieldStore.removeAll();
        }else{
        	Ext.Msg.alert('系统提示','没有字段可撤销了');
      	    return;
        }
    },
    
   
	
	/**
	 * 上移
	 */
	toUp:function(){
    	var me = this;
    	var excelFieldGrid = me.matePanel.getComponent('excelFieldGrid');
    	var selectionModel = excelFieldGrid.getSelectionModel();
        if(selectionModel.hasSelection()){
        	var excelField = selectionModel.getSelection()[0];
            var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
            var index = excelFieldStore.indexOf(excelField);
        	if(index-1 >= 0){
        		excelFieldStore.remove(excelField);
        		excelFieldStore.insert((index-1),excelField);
        		excelFieldGrid.getSelectionModel().select((index-1),true);
        	}else{
        		Ext.Msg.alert('系统提示','字段已置顶');
        		return;
        	}
        }else{
        	Ext.Msg.alert('系统提示','请选择上移字段');
    		return;
        }
	},
	
	/**
	 * 下移
	 */
	toDown:function(){
		var me = this;
    	var excelFieldGrid = me.matePanel.getComponent('excelFieldGrid');
    	var selectionModel = excelFieldGrid.getSelectionModel();
        if(selectionModel.hasSelection()){
        	var excelField = selectionModel.getSelection()[0];
            var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
            var index = excelFieldStore.indexOf(excelField);
        	if(index+1 < excelFieldStore.count()){
        		excelFieldStore.remove(excelField);
        		excelFieldStore.insert((index+1),excelField);
        		excelFieldGrid.getSelectionModel().select((index+1),true);
        	}else{
        		Ext.Msg.alert('系统提示','字段已置底');
        		return;
        	}
        }else{
        	Ext.Msg.alert('系统提示','请选择下移字段');
    		return;
        }
	},
	
	/**
	 * 置顶
	 */
	toTop:function(){
		var me = this;
    	var excelFieldGrid = me.matePanel.getComponent('excelFieldGrid');
    	var selectionModel = excelFieldGrid.getSelectionModel();
        if(selectionModel.hasSelection()){
        	 var excelField = selectionModel.getSelection()[0];
             var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
             var index = excelFieldStore.indexOf(excelField);
         	 if(index-1 >= 0){
         		excelFieldStore.remove(excelField);
         		excelFieldStore.insert(0,excelField);
         		excelFieldGrid.getSelectionModel().select(0,true);  
         	 }else{
         		Ext.Msg.alert('系统提示','字段已置顶');
         		return;
         	 }
        }else{
        	Ext.Msg.alert('系统提示','请选择置顶字段');
    		return;
        }
	},
	
    /**
     * 置底
     */
	toBottom:function(){
		var me = this;
    	var excelFieldGrid = me.matePanel.getComponent('excelFieldGrid');
    	var selectionModel = excelFieldGrid.getSelectionModel();
        if(selectionModel.hasSelection()){
        	var excelField = selectionModel.getSelection()[0];
            var excelFieldStore=me.matePanel.getComponent('excelFieldGrid').getStore();
            var index = excelFieldStore.indexOf(excelField);
        	if(index+1 < excelFieldStore.count()){
        		excelFieldStore.remove(excelField);
        		excelFieldStore.insert(excelFieldStore.count(),excelField);
        		excelFieldGrid.getSelectionModel().select((excelFieldStore.count()-1),true);  
        	}else{
        		Ext.Msg.alert('系统提示','字段已置底');
        		return;
        	}
        }else{
        	Ext.Msg.alert('系统提示','请选择置底字段');
    		return;
        }
	},
	
	/**
	 * 导出
	 */
	entityExport:function(){
	   	var me=this;
	   	var store = me.matePanel.getComponent('excelFieldGrid').getStore();
	   	if(store.count()==0){
	   		Ext.Msg.alert('系统提示','还没有添加导出字段');
	   		return;
	   	}
	   	//导出字段
	   	var fields="";
	   	store.each(function(field){
	   		if(fields.length>0){
	   			fields+=","+field.getId();
	   		}else{
	   			fields+=field.getId();
	   		}
	   	});
	   	
	   	//查询条件
	   	var params="";
	   	if(me.param){
	   		for(name in me.param){
	   			if(me.param[name] === undefined){
	   				me.param[name] = "";
	   			}
	   			params+="&"+name.replace(/\#/g,"%23")+"="+encodeURI(me.param[name]);
	   		}
	   	}
	
	   	var url=EPX.url(me.exportAction,me.metaId);
	   	url += "&fieldMate="+fields; 
		url += params;
	   	url += "&queryString="+me.queryString;
			
		me.up('window').close();
		window.open(url);
    },
	
	/**
	 * 返回
	 */
	backPage:function(){
		var me=this;
		me.up('window').close();
	}
    
});