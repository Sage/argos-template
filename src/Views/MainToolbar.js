define('Mobile/Template/Views/MainToolbar', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/MainToolbar'
], function(
    declare,
    MainToolbar
) {

    return declare('Mobile.Template.Views.MainToolbar', [MainToolbar], {
        titleText: 'Sage Template',

        /*
        This override of MainToolbar injects a back and home button to the left side for all
        views except home and views with tools on the left already
         */
        showTools: function(tools) {
            var hasLeftSideTools;

            if (tools)
            {
                for (var i = 0; i < tools.length; i++)
                {
                    if (tools[i].side == 'left')
                    {
                        hasLeftSideTools = true;
                        break;
                    }
                }
            }

            if (!hasLeftSideTools && tools !== false)
            {
                if (App.getPrimaryActiveView() != App.getView('home'))
                {
                    tools = (tools || []).concat([{
                        id: 'back',
                        side: 'left',
                        fn: this.navigateBack,
                        scope: this
                    },{
                        id: 'home',
                        side: 'left',
                        fn: this.navigateToHomeView,
                        scope: this
                    }]);
                }
            }

            this.inherited(arguments);
        },
        navigateBack: function() {
            ReUI.back();
        },
        navigateToHomeView: function() {
            App.navigateToHomeView();
        }
    });
});