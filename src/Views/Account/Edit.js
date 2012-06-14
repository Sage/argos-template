define('Mobile/Template/Views/Account/Edit', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    Edit
) {

    return declare('Mobile.Template.Views.Account.Edit', [Edit], {
        //Localization
        titleText: 'Account',
        accountNameText: 'account',
        descriptionText: 'description',
        websiteText: 'website',

        //View Properties
        id: 'account_edit',
        insertSecurity: null,
        updateSecurity: null,
        querySelect: [
            'AccountName',
            'Description',
            'Industry'
        ],
        resourceKind: 'accounts',

        requestTemplate: function() {
            // This override prevents a call for the default template values
            // when inserting a new entity

            this.processTemplateEntry({});
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.accountNameText,
                name: 'AccountName',
                property: 'AccountName',
                type: 'text'
            },
            {
                label: this.descriptionText,
                name: 'Description',
                property: 'Description',
                type: 'text'
            },{
                label: this.websiteText,
                name: 'Website',
                property: 'Website',
                type: 'text'
            }]);
        }
    });
});