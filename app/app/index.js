var appRoutes = (function () {
    var sp, urp;

    function update() {
        urp.otherwise('/rules'); // Need to change for home location

        var states = [
            {state: 'index', route: {url: '', views: {
                        '': {templateUrl: 'layout.html', controller: 'mainAppCtrl'},
                        'menu@index': {templateUrl: 'screens/mainMenu/mainMenu.html', controller: 'mainMenuCtrl'},
                        'sidebar@index': {templateUrl: 'screens/sidebar/sidebar.html', controller: 'sidebarCtrl'}
                    },
                    resolve: {
                        authorize: ['authorization',
                            function (authorization) {
                                return authorization.authorize();
                            }
                        ]
                    }
                },
            },
            {state: 'login', route: {url: '/login', params: {do: null, message: null}, templateUrl: 'screens/login/login.html', controller: 'loginCtrl', data: { roles: ['user']}}},
            {state: 'signup', route: {url: '/signup', templateUrl: 'screens/signup/signup.html', controller: 'signupCtrl', data: { roles: ['user']}}},
            {state: 'rules', route: {parent: 'index', url: '/rules', templateUrl: 'screens/rules/rules.html', controller: 'rulesCtrl', data: { roles: ['user']}}},
            {state: 'rules.addRuleName', route: {url: '/add', templateUrl: 'screens/rules/addRuleNameForm.html'}},
            {state: 'rules.addTrigger', route: {url: '/add', templateUrl: 'screens/rules/addTriggerForm.html'}},
            {state: 'rules.addAction', route: {url: '/add', templateUrl: 'screens/rules/addActionForm.html'}},
            {state: 'nestOauth', route: {url: '/nest-auth', templateUrl: 'screens/auth/auth.html', controller: 'authCtrl'}},
            {state: 'users', route: {parent: 'index', url: '/users', templateUrl: 'screens/users/list.html', controller: 'usersListCtrl'}}
        ];

//        var states = [
//            {state: 'home', route: {url: '/', templateUrl: 'screens/dashboard/dashboard.html', controller: 'dashboardCtrl'}},
//            {state: 'about', route: {url: '/about', templateUrl: 'screens/dashboard/dashboard.html', controller: 'dashboardCtrl'}}
//        ];

        for (var i = 0; i < states.length; i++) {
            sp.state(states[i].state, states[i].route);
        }
    }

    function init(stateProvider, urlRouterProvider) {
        sp = stateProvider;
        urp = urlRouterProvider;
        update();
    }

    return {'init': init, 'update': update};
})();