var mainAppModule = angular.module('mainApp', ['ngAnimate', 'ui.router', 'rzModule', 'ui.bootstrap']).
        config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                appRoutes.init($stateProvider, $urlRouterProvider);
            }]).
        directive('loading', ['$http', function ($http)
            {
                return {
                    restrict: 'A',
                    link: function (scope, elm, attrs)
                    {
                        scope.isLoading = function () {
                            return $http.pendingRequests.length > 0;
                        };

                        scope.$watch(scope.isLoading, function (v)
                        {
                            if (v) {
                                elm.show();
                            } else {
                                elm.hide();
                            }
                        });
                    }
                };

            }]).
        factory('authorization', ['$rootScope', '$state', 'principal',
            function ($rootScope, $state, principal) {
                return {
                    authorize: function () {
                        return principal.identity()
                                .then(function () {
                                    var isAuthenticated = principal.isAuthenticated();

                                    if ($rootScope.toState.data.roles
                                            && $rootScope.toState
                                            .data.roles.length > 0
                                            && !principal.isInAnyRole(
                                                    $rootScope.toState.data.roles))
                                    {
                                        if (isAuthenticated) {
                                            // user is signed in but not
                                            // authorized for desired state
                                            $state.go('accessdenied');
                                        } else {
                                            // user is not authenticated. Stow
                                            // the state they wanted before you
                                            // send them to the sign-in state, so
                                            // you can return them when you're done
                                            $rootScope.returnToState
                                                    = $rootScope.toState;
                                            $rootScope.returnToStateParams
                                                    = $rootScope.toStateParams;

                                            // now, send them to the signin state
                                            // so they can log in
                                            $state.go('login');
                                        }
                                    }
                                    if (sessionStorage['yesiamin'] && ($rootScope.toState.name == 'login' || $rootScope.toState.name == 'signup')) {
                                        $state.go('rules');
                                    }
                                });
                    }
                };
            }
        ]).
        run(['$rootScope', '$state', '$stateParams',
            'authorization', 'principal',
            function ($rootScope, $state, $stateParams, authorization, principal)
            {
                $rootScope.nestAuth = false;
                $rootScope.$on('$stateChangeStart',
                        function (event, toState, toStateParams)
                        {
                            // track the state the user wants to go to; 
                            // authorization service needs this

                            $rootScope.toState = toState;
                            $rootScope.toStateParams = toStateParams;
                            // if the principal is resolved, do an 
                            // authorization check immediately. otherwise,
                            // it'll be done when the state it resolved.

                            if (principal.isIdentityResolved())
                                authorization.authorize();
                        });
            }
        ]);



angular.element(document).ready(function () {
    angular.bootstrap(document, ['mainApp']);
});

mainAppModule.controller('mainAppCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    }
]);

