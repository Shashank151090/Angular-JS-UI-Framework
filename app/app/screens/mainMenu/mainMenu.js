mainAppModule.controller("mainMenuCtrl", ["$scope", '$state', 'principal', function ($scope, $state, principal) {
        
        $scope.showUserCard = false;
        if (localStorage['identity']) {
            $scope.user = angular.fromJson(localStorage['identity']);
        };      
                
        $scope.toggleUserCard = function(){
            $scope.showUserCard = !$scope.showUserCard;
        }
        
        $scope.logout = function(){
            //principal.authenticate(null);
            sessionStorage.clear();
            localStorage.clear();
            $state.go('login');
        }
    }
]);