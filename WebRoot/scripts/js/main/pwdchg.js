Ext.Loader.setConfig({ enabled: true,paths: { 'Ext.ux': 'scripts/ext/ux/'}});
Ext.require([ 
    'Ext.util.*', 
    'Ext.data.*',
    'Ext.form.*',
    'Ext.button.*',
    'Ext.window'
]); 

Ext.onReady(function(){
	if ( username == null) return;
	
    Ext.define('userData',{ 
        extend: 'Ext.data.Model', 
        fields: ['id','username','password'] 
    }); 

    var pwdform = Ext.create('Ext.form.Panel', {
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        autoWidth: true,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
        	xtype: 'textfield',
            fieldLabel: '用户名',
            readOnly:true,
            name: 'username',
            id:'username',
            value:username
        },{
        	xtype: 'textfield',
            fieldLabel: '原密码',
            allowBlank:false,
            blankText:'原密码不能为空！',
            name: 'password',
            id:'password',
			enableKeyEvents: true  
        },{
        	xtype: 'textfield',
            fieldLabel: '新密码',
            allowBlank:false,
            blankText:'新密码不能为空！',
            name: 'newpassword',
            id:'newpassword',
			enableKeyEvents: true,  
	        listeners: {
				'keypress':function(form, e) {
           			if (e.getKey() == e.ENTER) {  
		                this.nextSibling().focus(); 
		            } 
        		}
	        }
        },{
        	xtype: 'textfield',
            fieldLabel: '重&nbsp;&nbsp;&nbsp;输',
            allowBlank:false,
            blankText:'重输密码不能为空！',
            name: 'againpassword',
            id:'againpassword',
			enableKeyEvents: true, 
	        listeners: {
				'keypress':function(form, e) {
           			if (e.getKey() == e.ENTER) {  
		                submitPwdForm(); 
		            } 
        		}
	        }
        }],
        buttons: [{
        text: '确定',
        handler: submitPwdForm
    }, {
        text: '取消',
        handler: function() {
          chgpwdwin.close();
        }
    }]

    });
    
    function submitPwdForm(){
    	var oldVal = Ext.getCmp('password').value;
    	var newVal = Ext.getCmp('newpassword').value;
    	var againVal = Ext.getCmp('againpassword').value;
    	
    	if(oldVal == newVal){
    		ShowErrorMsg('提示','新密码和原密码相同，请重新输入！');
    	}
    	else if(newVal != againVal){
    		ShowErrorMsg('提示','二次输入的新密码不同，请重新输入！');
    	}
    	else{
			pwdform.form.submit({
				clientValidation:true,
				waitMsg:'正在提交数据请稍候',
				waitTitle:'提示',
				url:'userPwdchg.action',
				method:'post',
				success:function(form, action){
					chgpwdwin.close();
					Ext.Msg.alert('提示',action.result.msg);
				},
				failure:function(form, action){
					Ext.Msg.alert('提示',action.result==null?'请输入原密码及新密码！':action.result.msg);
				}
			});
    	}
	}

	var chgpwdwin = new Ext.Window({ 
		layout:'fit',
		width:280,
		iconCls:'pwdChg',
		closeAction:'destroy',
		height:220,
		resizable:false,
		shadow:true,
		title:'修改密码',
		modal:true,
		closable:true,
		bodyStyle:'padding:5 5 5 5',
		animCollapse:true,
		items:[pwdform],
		listeners:{
			'beforeclose':function(win){closeTab();}
		}
	}); 
	
	chgpwdwin.show();
}) 
