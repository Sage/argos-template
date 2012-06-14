define('Mobile/Template/Views/Account/Detail', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    domClass,
    Detail
) {

    return declare('Mobile.Template.Views.Account.Detail', [Detail], {
        //Localization
        titleText: 'My account',
        accountNameText: 'account',
        descriptionText: 'description',
        websiteText: 'website',

        //View Properties
        id: 'account_detail',
        editView: 'account_edit',
        security: null,
        querySelect: [
            'Description',
            'AccountName',
            'Industry'
        ],
        resourceKind: 'accounts',

        requestData: function() {
            // Here we are overriding requestData to provide our own fake data.
            // Normally you let the SDK handle this function to make a request

            domClass.add(this.domNode, 'list-loading');

            var sampleEntry1 = {
                $key: '001',
                $descriptor: 'Sample1',
                AccountName: 'Template Inc.',
                Description: 'Finest samples money can buy',
                Website: 'www.templateinc.com'
            };
            var sampleEntry2 = {
                $key: '002',
                $descriptor: 'Sample2',
                AccountName: 'Boilerplate Co.',
                Description: 'Greatest examples on earth',
                Website: 'www.boilerplateco.com'
            };

            this.onRequestDataSuccess(this.options.key == '001' ? sampleEntry1 : sampleEntry2);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'AccountName',
                    property: 'AccountName',
                    label: this.accountNameText
                },{
                    name: 'Description',
                    property: 'Description',
                    label: this.descriptionText
                },{
                    name: 'Website',
                    property: 'Website',
                    label: this.websiteText
                }]
            }]);
        }
    });
});