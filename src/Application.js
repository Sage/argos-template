define('Mobile/Template/Application', [
    'dojo/_base/declare',
    'dojo/_base/sniff',
    'dojo/has',
    'dojo/string',
    'argos/CustomizationSet',
    'argos/Application',
    './ApplicationScene'
], function(
    declare,
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
        run: function() {
            this.inherited(arguments);

            this.scene.showView('home');
        },
        reload: function() {
            window.location.reload();
        }
    });
});