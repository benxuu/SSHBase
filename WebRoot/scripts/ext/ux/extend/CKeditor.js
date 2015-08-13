Ext.define('Ext.ux.extend.CKeditor',{
	extend:'Ext.form.field.TextArea',
	alias:'widget.ckeditor',
    
    onRender : function(ct, position){
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                autocomplete: "off"
            };
        }
        this.callParent(arguments);
        this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
    },
 
    setValue: function(value) {
        this.callParent(arguments);
        if(this.editor && value != undefined){
            this.editor.setData(value);
        }
        /*var inputId = this.getInputId();
        if(CKEDITOR.instances[inputId]){
            CKEDITOR.instances[inputId].setData(value);
        }*/
    },
 
    getValue: function() {
        if (this.editor) {
            this.editor.updateElement();
            return this.editor.getData()
        } else {
            return ''
        }
    },
 
    getRawValue: function() {
        if (this.editor) {
            this.editor.updateElement();
            return this.editor.getData()
        } else {
            return ''
        }
    }
     
});
//    constructor : function() {  
//        this.callParent(arguments);//必须先构造父类对象  
//        this.addEvents("instanceReady");//注册一个instanceReady事件  
//    },  
//      
//    initComponent: function () {  
//        this.callParent(arguments);  
//        this.on("afterrender", function(){  
//            Ext.apply(this.CKConfig, {  
//               height : this.getHeight(),  
//               width : this.getWidth()  
//            });  
//            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);  
//            this.editor.name = this.name;//把配置中的name属性赋值给CKEditor的name属性  
//            this.editor.on("instanceReady", function(){  
//                this.fireEvent("instanceReady", this, this.editor);//触发instanceReady事件  
//            }, this);  
//        }, this);  
//    },  
//    onRender: function (ct, position) {  
//        if (!this.el) {  
//            this.defaultAutoCreate = {  
//                tag: 'textarea',  
//                autocomplete: 'off'  
//            };  
//        }  
//        this.callParent(arguments)  
//    },  
//    setValue: function (value) {  
//        this.callParent(arguments);  
//        if (this.editor && value != undefined) {  
//            this.editor.setData(value);  
//        }  
//    },  
//    getRawValue: function () {//要覆盖getRawValue方法，否则会取不到值  
//        if (this.editor) {  
//            return this.editor.getData();  
//        } else {  
//            return ''  
//        }  
//    },  
//    getValue: function () {  
//        return this.getRawValue();  
//    }  
//});  