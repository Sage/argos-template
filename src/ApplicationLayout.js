define('Mobile/Template/ApplicationLayout', [
    'dojo/_base/declare',
    'dojo/query',
    'dojo/NodeList-traverse',
    'argos/DialogPane',
    'argos/Layout',
    'argos/Pane',
    './TitleBar'
], function(
    declare,
    query,
    nodeListTraverse,
    DialogPane,
    Layout,
    Pane,
    TitleBar
) {
    return declare('Mobile.Template.ApplicationLayout', [Layout], {
        tiers: 2,
        maximized: -1,
        components: [
            {name: 'list', root: true, type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}, components: [
                {name: 'top', type: TitleBar, attachEvent: 'onPositionChange:_onToolbarPositionChange', props: {managed: true, visible: false}},
                {name: 'container', tag: 'div', attrs: {'class': 'view-container'}, attachPoint: 'viewContainerNode'}
            ]},
            {name: 'detail', type: Pane, attachPoint: 'panes.detail', props:{'class':'layout-right', tier: 1}},
            {name: 'dialog', type: DialogPane, attachPoint: 'panes.dialog'}
        ],
        onStartup: function() {
            this.inherited(arguments);

        },
        _contains: function(rootNode, testNode) {
            return rootNode.contains
                ? rootNode != testNode && rootNode.contains(testNode)
                : !!(rootNode.compareDocumentPosition(testNode) & 16);
        }
    });
});
