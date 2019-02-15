mainAppModule.controller("sidebarCtrl", ["$scope", '$timeout', '$window', function ($scope, $timeout, $window) {
        $scope.toggleT = false;
        
        if (localStorage['nestAuth']) {
            $scope.oauth = {};
            $scope.oauth.nest = true;
        }
        else {
            $scope.oauth = {};
        }

        /**
         * 
         * @param {string} toWhom
         * @returns {undefined}
         */
        $scope.connectWith = function (toWhom) {

            switch (toWhom) {
                case 'nest':

                    var url = config.nest().authUrl + '?client_id=' + config.nest().productId + '&state=' + makeid();
                    connectWithWindow(url);

                    break;
                case 'smarthings':
                    break;
            }
        }

        $window.inviteCallback = function (whom) {
            if (whom.nest) {
                $timeout(function () {
                    $scope.oauth.nest = true;
                    $scope.oauth.alert = true;
                    $scope.oauth.message = 'Successfully connected with NEST';
                });
            }
        }

        function connectWithWindow(url) {
            var strWindowFeatures = "menubar=no,location=yes";
            $window.open(url, "NEST Authorization", strWindowFeatures);
        }

        function makeid()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }


    }
]);


