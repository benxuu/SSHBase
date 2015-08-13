function getRight(pageName,fn){
	var objRights={};
    Ext.Ajax.request({
        url: 'usersgetRights.action',
        method: 'post',
        autosync: true,
        params: {pageName: pageName},
        scope: this,
        callback:function(response){
        	var tab = Ext.getCmp('mainContent').getActiveTab();
        	for(var i in objRights){
        		var objcode = objRights[i].id.objcode;
        		var objvb = objRights[i].visibleright;
        		var objeb = objRights[i].enableright;
        		if(objcode != pageName){
	        		var extComponent = tab.down('#' + objcode)//Ext.ComponentQuery.query('#' + objcode);
		        	if(extComponent != undefined && extComponent != null){
			        	extComponent.hidden = objvb;
		        		extComponent.setDisabled(!objeb);
		        	}
        		}
        	}
        	tab.doLayout();
        },
        success: function (response) {
			var rightList = Ext.JSON.decode(response.responseText).list;
			
			for(var i in rightList)
				objRights[rightList[i].id.objcode]= rightList[i];
			
			if(!objRights[pageName].enableright){
				Ext.Msg.show({title:"提示",msg:'您没有该页面访问权限！',buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING,fn: function(){closeTab();}});
				return false;
			}
			fn(objRights);
        },
        failure: function (response) {
        	Ext.Msg.show({title:"提示",msg:'权限获取失败！',buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
        }
    });
}

function getQueryParam(name,path) {
    var regex = RegExp('[?&]' + name + '=([^&]*)');

    var match = regex.exec(location.search) || regex.exec(path);
    return match && decodeURIComponent(match[1]);
}

function getSelIds(grid){
	var recs = grid.getSelectionModel().getSelection();
	var list = [];
	if(recs.length == 0){
		ShowInfoMsg('提示', '请选择要进行操作的记录！');
	}else{
		for(var i = 0; i < recs.length ; i++){
			var rec = recs[i];
			list.push(rec.get('id'));
		}
	}
	return list;
}

function getSearchCmb(){
    var fieldCmbOpt = Ext.create('Ext.data.Store', {
	    fields: ['abbr', 'value'],
	    data: [
	        { abbr: '包含', value: 'hylxbm' },
	        { abbr: '前匹配', value: 'hylxbm' },
	        { abbr: '等于', value: 'hylxbm' },
	        { abbr: '大于', value: 'hylxmc' },
	        { abbr: '小于', value: 'hylxmc' },
	        { abbr: '大于等于', value: 'hylxmc' },
	        { abbr: '小于等于', value: 'hylxmc' },
	        { abbr: '不等于', value: 'hylxmc' },
	        { abbr: '为空', value: 'hylxmc' },
	        { abbr: '不为空', value: 'hylxmc' }
	    ]
    });
    return fieldCmbOpt
}

function getBrowserName() {
	var name = '未知浏览器';
	if (Ext.isIE6)
	    name = "IE6";
	if (Ext.isIE7)
	    name = "IE7";
	if (Ext.isIE8)
	    name = "IE8";
	if (Ext.isIE9)
	    name = "IE9";
	if (Ext.isChrome)
	    name = "Chrome";
	if (Ext.isOpera)
	    name = "Opera";
	if (Ext.isSafari)
	    name = "Safari";
	if (Ext.isGecko)
	    name = "FireFox";
		return name;
}

function closeTab(){
	var curTab = Ext.getCmp('mainContent').getActiveTab();  
	curTab.close();
}

function closeweb(){ 
    var browserName=navigator.appName; 
    if (browserName=="Netscape") {
 	    window.open('','_parent',''); window.close(); 
     } else if (browserName=="Microsoft Internet Explorer") { 
 	    window.opener = null; window.close(); 
     }
}

ShowErrorMsg = function(title, msg) {
	Ext.MessageBox.show({
				title : title,
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			})
}

ShowWarningMsg = function(title, msg) {
	Ext.MessageBox.show({
				title : title,
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			})
}

ShowInfoMsg = function(title, msg) {
	Ext.MessageBox.show({
				title : title,
				msg : msg,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			})
}


DoDelete = function(url, params, store) {
	var msgTip = Ext.MessageBox.show({
		title:'提示',
		width:250,
		msg:'正在删除，请稍候...'
	});
	Ext.MessageBox.confirm('操作确认', '确定要删除选择的项吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : url,
				method:'POST',
				async : false,
				params : params,
//				success : function(response) {
//					var result = Ext.JSON.decode(response.responseText);
//					if (Ext.isDefined(result)) {
//						store.load();
//					};
//				}
				success:function(response, action){
					msgTip.hide();
					var result = Ext.JSON.decode(response.responseText);
					if(result.success){
						for(var i = 0; i < ids.length; i++){
							var index = store.find('id', ids[i]);
							if(index != -1){
								var rec = store.getAt(index);
								store.remove(rec);
	//							store.load();
							}
						}
						ShowInfoMsg('提示', '删除记录成功！');
					}else{
						ShowErrorMsg('提示', '删除记录失败！');
					}
				},
				failure:function(response, action){
					msgTip.hide();
					ShowErrorMsg('提示', '删除用户信息失败!');
				}
				});
		}
	}, this);
}

// 获取grid当前选中行的数据(单行)
GetGridSelectedRowData = function(grid) {
	var selModel = grid.getSelectionModel();
	if (Ext.isDefined(selModel.getSelection()[0]))
		return selModel.getSelection()[0].data;
	else
		return null;
}

// 返回枚举列
GetEnumCm = function(cmc) {
	var cm = cmc;
	var list;
	Ext.Ajax.request({
				url : cm.url,
				async : false,
				success : function(response) {
					list = Ext.JSON.decode(response.responseText);
				}
			});
	var filterOptions = new Array();
	Ext.each(list, function(item) {
				filterOptions[filterOptions.length] = {
					id : item.Value,
					text : item.Key
				};
			})
	cm.filter = {
		type : 'list',
		options : filterOptions,
		phpMode : true
	}
	cm.renderer = function(v) {
		var rr;
		Ext.each(list, function(item) {
					if (v == item.Value) {
						rr = item.Key;
					}
				})
		if (!rr)
			return "";
		return rr;
	};
	return cm
};
// 树结点全选子节点帮助类
ChildCheck = function(node, checked) {
	node.eachChild(function(child) {
				if (child.get('checked') != checked) {
					child.set('checked', checked);
					node.expand();
					ChildCheck(child, checked);
				}
			});
};
// 树结点全选父节点帮助类
ParentCheck = function(node, checked) {
	if (checked) {
		node.parentNode.set('checked', true);
	} else {
		var flag = false;
		node.parentNode.eachChild(function(child) {
					if (child.get('checked') == true) {
						flag = true;
						return;
					}
				}, this);
		node.parentNode.set('checked', flag);
	}
	if (node.get('depth') > 1) {
		ParentCheck(node.parentNode, checked);
	}
}

// 列的金额格式化
CnMoneyRenderer = function(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;

};


// 保存cookie
function SetCookie(name, value)// 两个参数，一个是cookie的名子，一个是值
{
	var Days = 3000; // 此 cookie 将被保存 30 天
	var exp = new Date(); // new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
// 获取cookie
function getCookie(name)// 取cookies函数
{
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;

}
// 移除cookie
function delCookie(name)// 删除cookie
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getHeaders(destGrid) {
    var list = [];
    for (var i = 0; i < destGrid.initialConfig.columns.length; i++)
        if (destGrid.initialConfig.columns[i].hidden==undefined ||!destGrid.initialConfig.columns[i].hidden) {
            if (destGrid.initialConfig.columns[i].columns == undefined) {
                list.push(destGrid.initialConfig.columns[i].dataIndex)
            }
            else {
                for (var j = 0; j < destGrid.initialConfig.columns[i].columns.length; j++)
                    list.push(destGrid.initialConfig.columns[i].columns[j].dataIndex);
            }
        }
    return list.join(",");
}

function getCHeaders(destGrid) {
    var list = [];
    for (var i = 0; i < destGrid.initialConfig.columns.length; i++)
        if (destGrid.initialConfig.columns[i].hidden == undefined || !destGrid.initialConfig.columns[i].hidden) {
            if (destGrid.initialConfig.columns[i].columns == undefined) {
                list.push(destGrid.initialConfig.columns[i].text);
            }
            else {
                for (var j = 0; j < destGrid.initialConfig.columns[i].columns.length; j++)
                    list.push(destGrid.initialConfig.columns[i].text + destGrid.initialConfig.columns[i].columns[j].text);
            }
        }
    return list.join(",");
}



function getExcelParams(destGrid) {
    var list = [];
    var cnfilter;
    if (destGrid.getStore().getProxy().extraParams != undefined) cnfilter = destGrid.getStore().getProxy().extraParams.cnfilter;
    var filter = new Array();

    if (destGrid.filters != undefined) {
        for (var i = 0; i < destGrid.filters.filters.keys.length; i++) {
            var cf = destGrid.filters.getFilter(destGrid.filters.filters.keys[i]);
            if (cf.active) {
                var ncf = {
                    type: cf.inputItem.type,
                    field: cf.inputItem.dataIndex,
                    value: cf.inputItem.value
                }
                filter.push(ncf);
            }
        }
    }

    var sort = destGrid.getStore().getSorters()[0];

    list.push(cnfilter);
    list.push(Ext.encode(filter));
    list.push(sort ==null?"id":sort.property);
    list.push(sort ==null?"ASC":sort.direction);
    list.push(getHeaders(destGrid));
    list.push(getCHeaders(destGrid));
    list.push(destGrid.title);

    return list;
}

function SearchWinShow(destGrid) {
    var searchForm = Ext.create('Ext.form.Panel', {
        id: 'seachForm',
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        autoWidth:true,
        autoHeight:true,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        layout: {
            type: 'column'
        },
        items: []
    });

    var headers = getHeaders(destGrid);
    var cheaders = getCHeaders(destGrid);

    var fStore = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'value'],
        data: []
    });

    for (var i = 0; i < headers.length; i++) {
        if (headers[i] != "memo")
            fStore.add({ abbr: cheaders[i], value: headers[i] });
    }

    for (var i = 0; i < headers.length; i++) {
        if (headers[i] != "memo") {
            var optCmbStore = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'value'],
                data: []
            });

            var curType = 'string';
            for (var j = 0; j < destGrid.filters.filterConfigs.length; j++) {
                if (headers[i] == destGrid.filters.filterConfigs[j].dataIndex) {
                    curType = destGrid.filters.filterConfigs[j].type;
                    break;
                }
            }

            var optCmb;
            var valueField;

            switch (curType) {
                case 'string':
                    optCmbStore.add({ abbr: '包含', value: '' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'textfield',
                        fieldLabel: '',
                        columnWidth: 0.4
                    };
                    break;
                case 'numeric':
                    optCmbStore.add({ abbr: '小于', value: 'lt' });
                    optCmbStore.add({ abbr: '等于', value: 'eq' });
                    optCmbStore.add({ abbr: '大于', value: 'gt' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'numberfield',
                        fieldLabel: '',
                        columnWidth: 0.4
                    };
                    break;
                case 'date':
                    optCmbStore.add({ abbr: '小于', value: 'lt' });
                    optCmbStore.add({ abbr: '等于', value: 'eq' });
                    optCmbStore.add({ abbr: '大于', value: 'gt' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'datefield',
                        fieldLabel: '',
                        allowBlank: true,
                        format: 'Y-m-d',
                        value: '',
                        columnWidth: 0.4
                    };
                    break;
                case 'boolean':
                    optCmbStore.add({ abbr: '等于', value: 'eq' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'combobox',
                        fieldLabel: '',
                        columnWidth: 0.4,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'value'],
                            data: [
                                { "abbr": '是', "value": true },
					            { "abbr": '否', "value": false}]
                        }),
                        allowBlank: true,
                        editable: false,
                        loadingText: '正在加载...',
                        displayField: 'abbr',
                        valueField: 'value',
                        emptyText: '请选择！',
                        queryMode: 'local'
                    };
                    break;
                default:
                    optCmbStore.add({ abbr: '包含', value: '' });
                    valueField = {
                        id: 'valueField-' + i,
                        xtype: 'textfield',
                        fieldLabel: '',
                        columnWidth: 0.4
                    };
                    break;
            }

            var hiddenType = {
                id: 'hf-' + i,
                xtype: 'hiddenfield',
                value: curType,
                columnWidth: 0,
                width: 0
            }

            var pCmb = {
                id: 'pCmb-' + i,
                xtype: 'combobox',
                fieldLabel: '',
                columnWidth: 0.4,
                store: fStore,
                allowBlank: true,
                value: headers[i],
                editable: false,
                loadingText: '正在加载...',
                displayField: 'abbr',
                valueField: 'value',
                emptyText: '请选择查询项！',
                queryMode: 'local',
                listeners: {
                    scope: this,
                    'select': function (arg, row) {
                        var idArr = arg.id.split('-');
                        var i = idArr[idArr.length - 1];
                        var header = row[0].data.value;
                        var headers = getHeaders(destGrid);
                        var cheaders = getCHeaders(destGrid);

                        var optCmbStore = Ext.create('Ext.data.Store', {
                            fields: ['abbr', 'value'],
                            data: []
                        });

                        var curType = 'string';
                        for (var j = 0; j < destGrid.filters.filterConfigs.length; j++) {
                            if (header == destGrid.filters.filterConfigs[j].dataIndex) {
                                curType = destGrid.filters.filterConfigs[j].type;
                                break;
                            }
                        }

                        var optCmb;
                        var valueField;
                        switch (curType) {
                            case 'string':
                                optCmbStore.add({ abbr: '包含', value: '' });
                                valueField = {
                                    id: 'valueField-' + i,
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    columnWidth: 0.4
                                };
                                break;
                            case 'numeric':
                                optCmbStore.add({ abbr: '小于', value: 'lt' });
                                optCmbStore.add({ abbr: '等于', value: 'eq' });
                                optCmbStore.add({ abbr: '大于', value: 'gt' });
                                valueField = {
                                    id: 'valueField-' + i,
                                    xtype: 'numberfield',
                                    fieldLabel: '',
                                    columnWidth: 0.4
                                };
                                break;
                            case 'date':
                                optCmbStore.add({ abbr: '小于', value: 'lt' });
                                optCmbStore.add({ abbr: '等于', value: 'eq' });
                                optCmbStore.add({ abbr: '大于', value: 'gt' });
                                valueField = {
                                    id: 'valueField-' + i,
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    allowBlank: true,
                                    format: 'Y-m-d',
                                    value: '',
                                    columnWidth: 0.4
                                };
                                break;
                            case 'boolean':
                                optCmbStore.add({ abbr: '等于', value: 'eq' });
                                valueField = {
                                    id: 'valueField-' + i,
                                    xtype: 'combobox',
                                    fieldLabel: '',
                                    columnWidth: 0.4,
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['abbr', 'value'],
                                        data: [
                                        { "abbr": '是', "value": true },
					                    { "abbr": '否', "value": false}]
                                    }),
                                    allowBlank: true,
                                    editable: false,
                                    loadingText: '正在加载...',
                                    displayField: 'abbr',
                                    valueField: 'value',
                                    emptyText: '请选择！',
                                    queryMode: 'local'
                                };
                                break;
                            default:
                                optCmbStore.add({ abbr: '包含', value: '' });
                                valueField = {
                                    id: 'valueField-' + i,
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    columnWidth: 0.4
                                };
                                break;
                        }

                        Ext.getCmp('hf-' + i).setValue(curType);
                        var p = searchForm.items.keys.indexOf('optCmb-' + i);
                        var q = searchForm.items.keys.indexOf('valueField-' + i)
                        searchForm.remove(Ext.getCmp('optCmb-' + i));
                        searchForm.remove(Ext.getCmp('valueField-' + i));
                        var optCmb = {
                            id: 'optCmb-' + i,
                            xtype: 'combobox',
                            fieldLabel: '',
                            columnWidth: 0.2,
                            store: optCmbStore,
                            allowBlank: true,
                            value: curType == 'string' ? '' : 'eq',
                            editable: false,
                            loadingText: '正在加载...',
                            displayField: 'abbr',
                            valueField: 'value',
                            emptyText: '请选择条件！',
                            queryMode: 'local'
                        };
                        searchForm.insert(p, optCmb);
                        searchForm.insert(q, valueField);
                        searchForm.doLayout();
                    }
                }
            };
            var optCmb = {
                id: 'optCmb-' + i,
                xtype: 'combobox',
                fieldLabel: '',
                columnWidth: 0.2,
                width:74,
                store: optCmbStore,
                allowBlank: true,
                value: curType == 'string' ? '' : 'eq',
                editable: false,
                loadingText: '正在加载...',
                displayField: 'abbr',
                valueField: 'value',
                emptyText: '请选择条件！',
                queryMode: 'local'
            };
            searchForm.add(hiddenType);
            searchForm.add(pCmb);
            searchForm.add(optCmb);
            searchForm.add(valueField);
        }
    }
    
    searchForm.doLayout();
    var searchWin = new Ext.Window({
        id: 'searchWin',
        title: '查询',
        iconCls: 'icon-asearch',
        layout: 'fit',
        width: 400,
        closeAction: 'destroy',
        autoHeight: true,
        resizable: false,
        shadow: true,
        modal: true,
        closable: true,
        bodyStyle: 'padding:5 5 5 5',
        animCollapse: true,
        items: [searchForm],
        buttons: [{
            text: '显示全部',
            handler: function () {
                destGrid.filters.clearFilters();
            }
        }, {
            text: '搜索',
            handler: function () {
                var fArray = [];
                var filterStr = '';
                var valueList = searchForm.getValues();
                for (var abbr in valueList) {
                    filterStr += valueList[abbr] + ',';
                }
                var pArr = filterStr.substr(0, filterStr.length - 1).split(',');
                var postion = [];
                for (var i = 0; i < pArr.length; i++) {
                    if (pArr[i] == 'string' || pArr[i] == 'numeric' || pArr[i] == 'date' || pArr[i] == 'boolean')
                        postion.push(i);
                }
                postion.push(pArr.length);
                for (var i = 0; i < postion.length; i++) {
                    if (postion[i + 1] - postion[i] == 4 && pArr[postion[i + 1] - 1] != '') {
                        switch (pArr[postion[i]]) {
                            case 'string':
                                var nf = {
                                    type: 'string',
                                    field: pArr[postion[i] + 1],
                                    value: pArr[postion[i + 1] - 1]
                                };
                                fArray.push(nf);
                                break;
                            case 'numeric':
                                var nf = {
                                    type: 'numeric',
                                    comparison: pArr[postion[i] + 2],
                                    field: pArr[postion[i] + 1],
                                    value: (pArr[postion[i + 1] - 1]).indexOf('.') >= 0 ? parseFloat(pArr[postion[i + 1] - 1]) : parseInt(pArr[postion[i + 1] - 1])
                                };
                                fArray.push(nf);
                                break;
                            case 'date':
                                var nf = {
                                    type: 'date',
                                    comparison: pArr[postion[i] + 2],
                                    field: pArr[postion[i] + 1],
                                    value: pArr[postion[i + 1] - 1]
                                };
                                fArray.push(nf);
                                break;
                            case 'boolean':
                                var nf = {
                                    type: 'boolean',
                                    field: pArr[postion[i] + 1],
                                    value: pArr[postion[i + 1] - 1]
                                };
                                fArray.push(nf);
                                break;
                            default:
                                var nf = {
                                    type: 'string',
                                    field: pArr[postion[i] + 1],
                                    value: pArr[postion[i + 1] - 1]
                                };
                                fArray.push(nf);
                                break;
                        }
                    }
                }
                if (fArray.length > 0)  DoFilters(destGrid, fArray);
            }
        }, {
            text: '关闭',
            handler: function () {
                searchWin.destroy();
            }
        }]
    });
    searchWin.setHeight(fStore.data.length * 30 + 75);
    searchWin.show();
}