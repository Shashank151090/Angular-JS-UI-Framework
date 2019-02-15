mainAppModule.controller("loginCtrl", ["$scope", "apiService", '$state', 'principal', function ($scope, apiService, $state, principal) {

        $scope.alert = {
          show: false,
          message: ""
        };

        if ($state.params.do) {
            $scope.alert.show = true;
            $scope.alert.message = $state.params.message;
        }

        $scope.login = function () {
            var _args = {
                username: $scope.username,
                password: $scope.password
            }
            // Need to remove
            var identity = {roles: ['user'], data: {username: "ashish123", name:"Ashish", email:"ashish123@gmail.com"}};

            sessionStorage['yesiamin'] = true;

            principal.authenticate(identity);
            if ($scope.returnToState)
                $state.go($scope.returnToState.name, $scope.returnToStateParams);
            else
                $state.go('rules');
            
            //Need to uncomment

           /* if (_args.username && _args.password) {
                apiService.execute("doLogin", _args, function (srvData) {
                    if (srvData) {
                        var identity = {roles: ['user'], data: srvData};

                        sessionStorage['yesiamin'] = true;

                        principal.authenticate(identity);
                        if ($scope.returnToState)
                            $state.go($scope.returnToState.name, $scope.returnToStateParams);
                        else
                            $state.go('rules');
                    }
                });
            }*/
        }

    }
]);



