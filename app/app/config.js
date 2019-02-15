var config = (function () {
    return {
        uma: function (){
            return 'http://harman-iot-vm.cloudapp.net:1111/user/'; //'http://10.97.52.30:1111/user/' //;
        },
        uim: function (){
             return 'http://harman-iot-vm.cloudapp.net:1113/uiproxy/'; //'http://10.97.52.30:1113/uiproxy/';
        },        
        nest: function (){
            return {
                productId: 'b2cf57f5-3bb3-441b-9f56-93e02d72d6cf',
                productSecret: '6ZA9T8RDOKvPKzI6k5GdGFnvD',
                authUrl: 'https://home.nest.com/login/oauth2',
                authTokenUrl: 'https://api.home.nest.com/oauth2/access_token'
            };
        },
        
    };
})();


function safeApply($scope, fn) {
    if (!$scope.$$phase) {
        $scope.$apply(fn);
    }
    else {
        if (fn && typeof (fn) == 'function') {
            fn();
        }
    }
};

if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}