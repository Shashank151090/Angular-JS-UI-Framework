mainAppModule.controller("authCtrl", ["$scope", '$location', '$rootScope', 'apiService', '$window',
    function ($scope, $location, $rootScope, apiService, $window) {
        
        var params = $location.search();

        $scope.doAuth = function () {
            if (params) {
                
                var identity = JSON.parse(localStorage['identity']);

                var _args = {
                    userId: identity.data.userId,
                    clientId: config.nest().productId,
                    code: params.code,
                    clientSecret: config.nest().productSecret,
                    grantType: "authorization_code"
                };

                apiService.execute("getNestAccessToken", _args, function (srvData) {
                    if (srvData) {
                        localStorage['nestAuth'] = JSON.stringify(srvData);
                        window.opener.inviteCallback({nest:true});
                        $window.close();
                    }
                });
            }
        }


    }
])


