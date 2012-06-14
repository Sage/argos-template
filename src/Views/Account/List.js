define('Mobile/Template/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    domClass,
    string,
    List
) {

    return declare('Mobile.Template.Views.Account.List', [List], {
        // Localization
        titleText: 'Accounts',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%= $.AccountName %}</h3>'
        ]),

        //View Properties
        id: 'account_list',
        security: null,
        icon: 'content/images/icons/Company_24.png',
        enableSearch: false,
        detailView: 'account_detail',
        insertView: 'account_edit',
        queryOrderBy: 'AccountName asc',
        queryWhere: null,
        querySelect: [
            'AccountName'
        ],
        resourceKind: 'accounts',

        requestData: function() {
            // Here we are overriding requestData to provide our own fake data.
            // Normally you let the SDK handle this function to make a request


            domClass.add(this.domNode, 'list-loading');

            var sampleFeed = {
                $totalResults: 2,
                $startIndex: 1,
                $itemsPerPage: 20,
                $resources: [
                    {
                        $key: '001',
                        $descriptor: 'Sample1',
                        AccountName: 'Template Inc.'
                    },
                    {
                        $key: '002',
                        $descriptor: 'Sample2',
                        AccountName: 'Boilerplate Co.'
                    }
                ]
            };

            this.onRequestDataSuccess(sampleFeed);
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('AccountName like "%${0}%"', [
                this.escapeSearchQuery(searchQuery.toUpperCase())
            ]);
        }
    });
});
