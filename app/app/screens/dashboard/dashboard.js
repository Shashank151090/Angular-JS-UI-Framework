mainAppModule.controller("dashboardCtrl", ["$scope", function ($scope) {
    $scope.tests = [
       {name: 'iot managed services', status: 'success'}
    ];
    
    $scope.z = 0;
    $scope.add = function(){
        $scope.z = $scope.x + $scope.y;
    }
}]);

    