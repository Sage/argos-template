define('Mobile/Template/ApplicationScene', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/Scene',
    './ApplicationLayout'
], function(
    declare,
    lang,
    Scene,
    ApplicationLayout
) {
    return declare('Mobile.Template.ApplicationScene', [Scene], {
        components: [
            {type: ApplicationLayout, attachPoint: 'layout'}
        ]
    });
});