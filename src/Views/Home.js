define('Mobile/Template/Views/Home', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/store/Memory',
    'argos/GroupedList',
    'argos!application',
    'argos!scene',
    'argos!customizations'
], function(
    declare,
    array,
    lang,
    domAttr,
    Memory,
    GroupedList,
    app,
    scene,
    customizations
) {
    return declare('Mobile.Template.Views.Home', [GroupedList], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '<div class="list-item-static-selector">',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '</div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>{%: $.title %}</h3>'
        ]),

        //Localization
        titleText: 'Home',
        viewsText: 'Go To',
        accountsText: 'Accounts',

        //View Properties
        id: 'home',
        hideSearch: true,
        customizationSet: 'home',

        navigateToView: function(evt, node) {
            var view = node && domAttr.get(node, 'data-view');
            if (view) scene().showView(view);
        },
        getGroupForItem: function(item) {
            if (item.action == 'navigateToView')
                return {
                    tag: 'view',
                    title: this.viewsText
                };

            return {
                tag: 'action',
                title: this.actionsText
            };
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: false
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                id: 'views',
                children: []
            }]);
        },
        createDefaultViewOrder: function(layout) {
            var order = [];

            array.forEach(layout, function(section) {
                array.forEach(section['children'], function(row) {
                    if (row['default']) order.push(row['view']);
                }, this);
            }, this);

            return order;
        },
        createListFrom: function(layout) {
            var configured = this.createDefaultViewOrder(layout),
                visible = {},
                views = null,
                list = [];

            array.forEach(configured, function(view, index) { this[view] = index; }, visible);
            array.some(layout, function(row) { if (row.id == 'views') { views = row.children; return false; } });
            array.forEach(views, function(view) { view.position = visible.hasOwnProperty(view.view) ? visible[view.view] : -1; });

            views.sort(function(a, b) {
                return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
            });

            array.forEach(layout, function(section) {
                array.forEach(section['children'], function(row) {
                    if (row['position'] <= -1)
                        return;

                    if (typeof this.query !== 'function' || this.query(row))
                        list.push(row);
                }, this);
            }, this);

            return list;
        },
        createStore: function() {
            var layout = customizations().apply(customizations().toPath(this.customizationSet, 'home', this.id), this.createLayout()),
                store = new Memory({
                    idProperty: 'name',
                    data: this.createListFrom(layout)
                });

            return store;
        }
    });
});
