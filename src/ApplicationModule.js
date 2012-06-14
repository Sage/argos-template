define('Mobile/Template/ApplicationModule', [
    /*
    These are the dependencies of this module using the AMD loading system
    The resulting object is passed in to the declare function of this module
     */

    'dojo/_base/declare',
    'Sage/Platform/Mobile/ApplicationModule',

    'Mobile/Template/Views/MainToolbar',
    'Mobile/Template/Views/FooterToolbar',
    'Mobile/Template/Views/Home',
    'Mobile/Template/Views/Help',

    'Mobile/Template/Views/Account/List',
    'Mobile/Template/Views/Account/Detail',
    'Mobile/Template/Views/Account/Edit'

], function(
    /*
    The dependencies are passed in, these must remain in the same order as above
     */
    declare,
    ApplicationModule,
    MainToolbar,
    FooterToolbar,
    Home,
    Help,
    AccountList,
    AccountDetail,
    AccountEdit
) {
    /*
    All modules return a single object (the module it is defining)
     */
    return declare('Mobile.Template.ApplicationModule', [ApplicationModule], {
        loadViews: function() {
            /*
            Load Views is where views are registered, if a view is not registered
            the app will not know its id and it will be un-accessible
             */
            this.inherited(arguments);

            this.registerView(new Home());
            this.registerView(new Help());

            this.registerView(new AccountList());
            this.registerView(new AccountDetail());
            this.registerView(new AccountEdit());
        },
        loadToolbars: function() {
            /*
            Load Toolbars is where any toolbars are registered, typically only a main bar
            and footer but any future additions will be placed here.
             */
            this.inherited(arguments);

            this.registerToolbar(new MainToolbar({
                name: 'tbar'
            }));

            this.registerToolbar(new FooterToolbar({
                name: 'bbar'
            }));
        },
        loadCustomizations: function() {
            /*
            Load Customizations is called after the views are registered and loaded so that
            customization code may alter them.
            For a customization module to an existing product most of its code would be here
             */
        }
    });

});
