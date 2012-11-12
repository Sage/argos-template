define('Mobile/Template/Application', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/_base/json',
    'dojo/_base/lang',
    'dojo/_base/sniff',
    'dojo/has',
    'dojo/string',
    'argos/CustomizationSet',
    'argos/Application',
    './ApplicationScene'
], function(
    declare,
    array,
    connect,
    json,
    lang,
    sniff,
    has,
    string,
    CustomizationSet,
    Application,
    ApplicationScene
    ) {

    return declare('Mobile.Template.Application', [Application], {
        components: [
            {type: ApplicationScene, attachPoint: 'scene'},
            {type: CustomizationSet, attachPoint: 'customizations'}
        ],
        startup: function() {
            if (has('ie') && has('ie') < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);
        },
        initConnects: function() {
            this.inherited(arguments);
        },
        run: function() {
            this.inherited(arguments);

            this.scene.showView('home');
        },
        reload: function() {
            window.location.reload();
        },
        getDefaultViews: function() {
            return [
            ];
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
        }
    });
});