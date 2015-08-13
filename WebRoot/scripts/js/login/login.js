Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'scripts/ext/ux/');

Ext.require([
    'Ext.tab.*',
    'Ext.ux.extend.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border'
]);

Ext.onReady(function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    var BrowseTxt = Ext.create('Ext.toolbar.TextItem', { text: '最佳浏览器：Chrome,Firefox'});
	var loginForm = new Ext.FormPanel({
		itemId : 'loginForm',
		layOut:'anchor',
		deferredRender : false,
		border : false,
		bodyStyle:'background-image:url(styles/images/login.png)',
		items :[{
			xtype:'textfield',
			fieldLabel : '用户名',
			name : 'userName',
			value: getCookie('userName'),
			margin :'90 0 0 140',
			width:220,
			labelWidth:50,
			labelStyle:'font-size: 12px',
			style : 'font-size: 15px',
			allowBlank : false,
			blankText : '用户名不能为空！',
			enableKeyEvents: true,  
			listeners:{
				'keypress':function(form, e) {
           			if (e.getKey() == e.ENTER) {  
		                this.nextSibling().focus(); 
		            } 
        		}
			}
		}, {
			xtype:'textfield',
			fieldLabel : '密码',
			name : 'userPwd',
			value: getCookie('userPwd'),
			margin :'5 0 0 140',
			labelWidth:50,
			labelStyle:'font-size: 12px',
			style : 'font-size: 15px',
			inputType : 'password',
			width : 220,
			allowBlank : false,
			blankText : '密码不能为空！',
			enableKeyEvents: true,  
			listeners:{
				'keypress':function(form, e) {
           			if (e.getKey() == e.ENTER) {  
           				Ext.getCmp('validateCode').focus();
		            } 
        		}
			}
		},{
		    xtype: 'container',
		    layout: {
		        type: 'column'
		    },
		    width : 450,
		    items: [{
					xtype: 'textfield',
					fieldLabel : '验证码',
					name : 'validateCode',
					margin :'5 0 0 140',
					labelWidth:50,
					maxLength : 4,
					columnWidth: 0.7,
					labelStyle:'font-size: 12px',
					style : 'font-size: 15px',
					allowBlank : false,
					blankText : '验证码不能为空！',
					enableKeyEvents: true,  
					listeners:{
						'keypress':function(form, e) {
		           			if (e.getKey() == e.ENTER) {  
				                doLogin(); 
				            } 
		        		}
					}
				},imgCode = Ext.create('Ext.Img', {
					itemId:'imgCode',
				    src: 'genCodedo.action',
				    style: {
				    	padding:'5 2 2 2',cursor:'pointer'
			        },
					listeners:{
						el: {
				            'click': function() {
				            	imgCode.setSrc('genCodedo.action?'+ Math.random());
				            }
				        }
					}
				})
		    ]
		}]
	});

	var win = new Ext.Window({
		titile:'系统登录',
		layout : 'fit',
		width : 520,
		height : 245,
		closeAction : 'hide',
		plain : true,
		maximizable : false,
		draggable : true,
		closable : false,
		resizable : false,
		animateTarget : Ext.getBody(),
		items : loginForm,
        dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'bottom',
	        ui: 'footer',
	        items: [BrowseTxt, '-', getBrowserName(), '-', {
	            itemId: 'chbox_rememberme',
	            xtype: 'checkboxfield',
	            fieldLabel: '',
	            boxLabel: '记住我',
	            checked: true,
	            anchor: '30%'
	        },'->',{
				text : '登录',
				width:70,
				handler : doLogin
			}, {
				text : '取消',
				width:70,
				handler : function() {
					win.hide();
			}}]
	    }]
	}).show();
	
	function doLogin() {
		if (loginForm.form.isValid()) {
			values = loginForm.form.getValues();
			var JSONobj = [];
		    JSONobj.push(JSON.stringify(values));
			loginForm.form.submit({
				url : 'doLogin.action',
				waitTitle : '提示',
				method : 'POST',
				params:{datas:JSONobj},
				waitMsg : '正在验证您的身份,请稍候...',
				success : function(form, action) {
					if (win.down('#chbox_rememberme').checked) {
                        SetCookie('userName', loginForm.form.findField('userName').getValue());
                        SetCookie('userPwd', loginForm.form.findField('userPwd').getValue());
                    } else {
                        delCookie('userName');
                        delCookie('userpwd');
                    }
			        
			    var scriptEls = document.getElementsByTagName('script'),
			        path = scriptEls[scriptEls.length - 1].src,
			        theme = getQueryParam('theme',path) || 'neptune',
			        neptune = (theme === 'neptune');
			        
					window.location.href = 'maindo.action' + (neptune?'':'?theme='+ theme);
				},
				failure : function(form, action) {
					var errmsg = action.result.msg;
					 Ext.MessageBox.show({
			           title: '错误',
			           msg: errmsg,
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.ERROR,
			           fn: function(id, msg){  
					      loginForm.form.reset();
					    }  
			       });
				}
			});
		}
	}
});
