define('Mobile/Template/TitleBar', [
    'dojo/_base/declare',
    'argos/TitleBar'
], function(
    declare,
    TitleBar
) {
    return declare('Mobile.Template.TitleBar', [TitleBar], {

        homeView: 'home',

        titleText: 'Template',

        _setItemsAttr: function(items) {
            var hasItemsOnLeft;

            if (items)
            {
                for (var i = 0; i < items.length; i++)
                {
                    if (items[i].place == 'left')
                    {
                        hasItemsOnLeft = true;
                        break;
                    }
                }
            }

            if (hasItemsOnLeft || items === false) return this.inherited(arguments);

            this.inherited(arguments);
        }
    });
});