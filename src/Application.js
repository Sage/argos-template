define('Mobile/Template/Application', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/_base/json',
    'dojo/_base/lang',
    'dojo/has',
    'dojo/string',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Application',
    'dojo/_base/sniff'
], function(
    declare,
    array,
    connect,
    json,
    lang,
    has,
    string,
    ErrorManager,
    Application
) {

    return declare('Mobile.Template.Application', [Application], {
        navigationState: null,
        rememberNavigationState: true,
        enableUpdateNotification: false,
        enableCaching: true,
        init: function() {
            if (has('ie') && has('ie') < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);

            this._loadNavigationState();

            var views = this.getDefaultViews();
            this.preferences = {
                home: {
                    visible: views
                },
                configure: {
                    order: views.slice(0)
                }
            };
        },
        _viewTransitionTo: function(view) {
            this.inherited(arguments);

            this._checkSaveNavigationState();
        },
        _checkSaveNavigationState: function() {
            if (this.rememberNavigationState !== false) this._saveNavigationState();
        },
        _saveNavigationState: function() {
            try
            {
                if (window.localStorage)
                    window.localStorage.setItem('navigationState', json.toJson(ReUI.context.history));
            }
            catch (e) { }
        },
        run: function() {
            this.inherited(arguments);

            this.navigateToHomeView();
        },
        hasAccessTo: function(security) {
            if (!security) return true;

            var user = this.context['user'],
                userId = user && user['$key'],
                userSecurity = this.context['userSecurity'];

            if (/^ADMIN\s*/i.test(userId)) return true;

            if (typeof userSecurity === 'undefined') return true; // running against a pre 8.0 Template environment

            return !!userSecurity[security];
        },
        reload: function() {
            window.location.reload();
        },
        _clearNavigationState: function() {
            try
            {
                this.initialNavigationState = null;

                if (window.localStorage)
                    window.localStorage.removeItem('navigationState');
            }
            catch (e) { }
        },
        _loadNavigationState: function() {
            try
            {
                if (window.localStorage)
                    this.navigationState = window.localStorage.getItem('navigationState');
            }
            catch (e) { }
        },
        getDefaultViews: function() {
            return [];
        },
        getExposedViews: function() {
            var exposed = [];

            for (var id in this.views)
            {
                var view = App.getView(id);

                if (view.id == 'home') continue;
                if (view.expose) exposed.push(id);
            }

            return exposed;
        },
        cleanRestoredHistory: function(restoredHistory) {
            var result = [],
                hasRoot = false;

            for (var i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--)
            {
                if (restoredHistory[i].data.options && restoredHistory[i].data.options.negateHistory)
                {
                    result = [];
                    continue;
                }

                if (App.hasView(restoredHistory[i].page))
                    result.unshift(restoredHistory[i]);

                hasRoot = (restoredHistory[i].page === 'home');
            }

            return hasRoot && result;
        },
        navigateToInitialView: function() {
            try
            {
                var restoredState = this.navigationState,
                    restoredHistory = restoredState && json.fromJson(restoredState),
                    cleanedHistory = this.cleanRestoredHistory(restoredHistory);

                this._clearNavigationState();

                if (cleanedHistory)
                {
                    ReUI.context.transitioning = true;
                    ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

                    for (var i = 0; i < cleanedHistory.length - 1; i++)
                    {
                        window.location.hash = cleanedHistory[i].hash;
                    }

                    ReUI.context.transitioning = false;

                    var last = cleanedHistory[cleanedHistory.length - 1],
                        view = App.getView(last.page),
                        options = last.data && last.data.options;

                    view.show(options);
                }
                else
                {
                    this.navigateToHomeView();
                }
            }
            catch (e)
            {
                this._clearNavigationState();

                this.navigateToHomeView();
            }
        },
        navigateToHomeView: function() {
            var view = this.getView('home');
            if (view)
                view.show();
        }
    });
});