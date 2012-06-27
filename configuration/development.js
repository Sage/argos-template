define('configuration/development', ['Mobile/Template/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                url: '',
                json: true
            }
        }
    };

});