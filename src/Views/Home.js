define('Mobile/Template/Views/Home', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/GroupedList'
], function(
    declare,
    array,
    lang,
    GroupedList
) {

    return declare('Mobile.Template.Views.Home', [GroupedList], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '<div class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',
            '</h3>'
        ]),

        //Localization
        titleText: 'Home',
        viewsText: 'Go To',

        //View Properties
        id: 'home',
        expose: false,
        enableSearch: false,
        customizationSet: 'home',

        navigateToView: function(params) {
            var view = App.getView(params && params.view);
            if (view)
                view.show();
        },
        hasMoreData: function() {
            return false;
        },
        getGroupForEntry: function(entry) {
            if (entry.view)
                return {
                    tag: 'view',
                    title: this.viewsText
                };

            return {
                tag: 'action',
                title: this.actionsText
            };
        },
        init: function() {
            this.inherited(arguments);

            this.connect(App, 'onRegistered', this._onRegistered);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        createLayout: function() {
            // don't need to cache as it is only re-rendered when there is a change
            var configured = lang.getObject('preferences.home.visible', false, App) || [],
                layout = [];

            var visible = {
                id: 'views',
                children: []
            };

            for (var i = 0; i < configured.length; i++)
            {
                var view = App.getView(configured[i]);
                if (view)
                {
                    visible.children.push({
                        'action': 'navigateToView',
                        'view': view.id,
                        'icon': view.icon,
                        'title': view.titleText,
                        'security': view.getSecurity()
                    });
                }
            }

            layout.push(visible);

            return layout;
        },
        requestData: function() {
            var layout = this._createCustomizedLayout(this.createLayout()),
                list = [];

            for (var i = 0; i < layout.length; i++)
            {
                var section = layout[i].children;

                for (var j = 0; j < section.length; j++)
                {
                    var row = section[j];

                    if (row['security'] && !App.hasAccessTo(row['security']))
                        return;
                    if (typeof this.query !== 'function' || this.query(row))
                        list.push(row);
                }
            }

            this.processFeed({'$resources': list});
        },
        _onRegistered: function() {
            this.refreshRequired = true;
        },
        refreshRequiredFor: function(options) {
            var visible = lang.getObject('preferences.home.visible', false, App) || [],
                shown = this.feed && this.feed['$resources'];

            if (!visible || !shown || (visible.length != shown.length))
                return true;

            for (var i = 0; i < visible.length; i++)
                if (visible[i] != shown[i]['$key']) return true;

            return this.inherited(arguments);
        }
    });
});