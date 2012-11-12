define('Mobile/Template/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/ApplicationModule',
    './ApplicationViews'
], function(
    declare,
    lang,
    ApplicationModule,
    ApplicationViews
) {
    return declare('Mobile.Template.ApplicationModule', [ApplicationModule], {
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
        },
        loadCustomizations: function() {
        }
    });

});
