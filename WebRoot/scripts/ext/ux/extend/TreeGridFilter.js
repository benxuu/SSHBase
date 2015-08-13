Ext.define('Ext.ux.extend.TreeGridFilter', {
    extend: 'Ext.grid.feature.Feature'
    , alias: 'feature.treeGridFilter'
    , collapseOnClear: true                                             // collapse all nodes when clearing/resetting the filter
    , allowParentFolders: false                                         // allow nodes not designated as 'leaf' (and their child items) to  be matched by the filter
    , treeGrid: null
    , filterPropertyNames: new Array()
    , filterPropertyValues: new Array()
    , filterColumnRenderers: new Array()
    , init: function (tree) {
        var me = this;
        treeGrid = me.tree = tree;
        var view = me.view;
        var headerCt = view.headerCt;

        // Listen for header menu being created
        headerCt.on('menucreate', me.onMenuCreate, me);

        tree.filter = Ext.Function.bind(me.filter, me);
        tree.clearFilter = Ext.Function.bind(me.clearFilter, me);
    }

    ,filter: function (value, property, re, columnRenderer) {
        var me = this
            , tree = me.tree
            , matches = []                                              // array of nodes matching the search criteria
            , root = tree.getRootNode()                                 // root node of the tree
            , property = property || 'text'                             // property is optional - will be set to the 'text' propert of the  treeStore record by default
            , visibleNodes = []                                         // array of nodes matching the search criteria + each parent non-leaf  node up to root
            , viewNode;

        me.updateValueForName(property, value, columnRenderer);
        if (me.filterPropertyNames.length == 0) {                       // if the search field is empty
            me.clearFilter();
            return;
        }

        tree.expandAll();                                               // expand all nodes for the the following iterative routines

        //iterate over all nodes in the tree in order to evalute them against the search criteria
        root.cascadeBy(function (node) {
            var numberOfFiltersMatched = 0;
            for (var index=0; index < me.filterPropertyNames.length; index++)
            {
                var propertyName = me.filterPropertyNames[index];
                var propertyValue = me.filterPropertyValues[index]
                var propertyValueOfNode = node.get(propertyName);
                if(me.filterColumnRenderers[index] != false){
                    var renderingFunction = me.filterColumnRenderers[index];
                    propertyValueOfNode = renderingFunction(propertyValueOfNode);           //Using the renderer function of the column
                }
                var regExpn = new RegExp(propertyValue, "ig")                           // the regExp could be modified to allow for case-sensitive, starts  with, etc.
                if(propertyValueOfNode != null && (propertyValueOfNode+'').match(regExpn)) {
                    numberOfFiltersMatched++;
                }
            }
            if(numberOfFiltersMatched == me.filterPropertyNames.length){
                matches.push(node);                                     // add the node to the matches array
            }
        });

        if (me.allowParentFolders === false) {                          // if me.allowParentFolders is false (default) then remove any non-leaf nodes from the regex match
            Ext.each(matches, function (match) {
                if (match == null || !match.isLeaf()) {
                    Ext.Array.remove(matches, match);
                }
            });
        }

        Ext.each(matches, function (item, i, arr) {                     // loop through all matching leaf nodes
            root.cascadeBy(function (node) {                            // find each parent node containing the node from the matches array
                if (node.contains(item) == true) {
                    visibleNodes.push(node);                            // if it's an ancestor of the evaluated node add it to the visibleNodes  array
                }
            });
            if (me.allowParentFolders === true && !item.isLeaf()) {     // if me.allowParentFolders is true and the item is  a non-leaf item
                item.cascadeBy(function (node) {                        // iterate over its children and set them as visible
                    visibleNodes.push(node);
                });
            }
            visibleNodes.push(item);                                    // also add the evaluated node itself to the visibleNodes array
        });

        root.cascadeBy(function (node) {                                // finally loop to hide/show each node
            viewNode = Ext.fly(tree.getView().getNode(node));           // get the dom element assocaited with each node
            if (viewNode) {                                             // the first one is undefined ? escape it with a conditional
                viewNode.setVisibilityMode(Ext.Element.DISPLAY);        // set the visibility mode of the dom node to display (vs offsets)
                viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
            }
        });
    }

    , clearFilter: function () {
        var me = this
            , tree = this.tree
            , root = tree.getRootNode();

        if (me.collapseOnClear) {
            tree.collapseAll();                                         // collapse the tree nodes
        }
        root.cascadeBy(function (node) {                                // final loop to hide/show each node
            viewNode = Ext.fly(tree.getView().getNode(node));           // get the dom element assocaited with each node
            if (viewNode) {                                             // the first one is undefined ? escape it with a conditional and show  all nodes
                viewNode.show();
            }
        });
    },

    onMenuCreate: function(headerCt, menu) {
        var me = this;
        menu.on('beforeshow', me.onMenuBeforeShow, me);
    },

    onMenuBeforeShow: function(menu) {
        var me = this;
        var currentHeaderFilter = menu.activeHeader.filter;
        if(currentHeaderFilter == null){
            if(me.menuItem == null){
                return;
            }
            me.menuItem.hide();
            me.menuSeparator.hide();
        }else if(me.menuItem != null){
            me.menuItem.show();
            me.menuSeparator.show();
        }
        if(me.menuItem){
            var perviousFilterValue = me.getValueForName(menu.activeHeader.dataIndex);
            if(perviousFilterValue == null || perviousFilterValue == ''){
                me.menuItem.setRawValue('');
            }else{
                me.menuItem.setRawValue(perviousFilterValue);
            }
        }else{
            me.menuSeparator = menu.add('-');

            var filterTextFiels = new Ext.form.TextField({
                itemId: 'filterTextBox',
                cls : 'find-icon',
                listeners: {
                    'change': this.onFilterTextChange
                }
            });
            me.menuItem = menu.add(filterTextFiels);
        }
        me.menuItem.activeDataIndex = menu.activeHeader.dataIndex;
        me.menuItem.activeRenderer = menu.activeHeader.renderer;
        me.menuItem.width = (currentHeaderFilter == null || currentHeaderFilter.width == null) ? 150 : currentHeaderFilter.width;
    },

    onFilterTextChange : function (searchMenuItem, value) {
        treeGrid.filter(value,searchMenuItem.activeDataIndex, null, searchMenuItem.activeRenderer);
    },

    updateValueForName : function(property, value, columnRenderer){
        var propertyIndex = -1;
        for (var index=0; index < this.filterPropertyNames.length; index++)
        {
            if(property == this.filterPropertyNames[index]){
                propertyIndex = index;
                break;
            }
        }
        if(propertyIndex >= 0){
            if(value == null || value == ''){
                this.filterPropertyNames.splice(propertyIndex, 1);
                this.filterPropertyValues.splice(propertyIndex, 1);
                this.filterColumnRenderers.splice(propertyIndex, 1);
            }else{
                this.filterPropertyValues[propertyIndex] = value;
            }
        }else{
            propertyIndex = this.filterPropertyNames.length;
            this.filterPropertyNames[propertyIndex] = property;
            this.filterPropertyValues[propertyIndex] = value;
            this.filterColumnRenderers[propertyIndex] = columnRenderer;
        }
    },

    getValueForName : function(property){
        var propertyIndex = -1;
        for (var index=0; index < this.filterPropertyNames.length; index++)
        {
            if(property == this.filterPropertyNames[index]){
                propertyIndex = index;
                break;
            }
        }
        if(propertyIndex >= 0){
            return this.filterPropertyValues[propertyIndex];
        }else{
            return null;
        }
    }
});