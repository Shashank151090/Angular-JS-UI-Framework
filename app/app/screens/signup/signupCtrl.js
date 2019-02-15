mainAppModule.controller("signupCtrl", ["$scope", "apiService", '$state', function ($scope, apiService, $state) {

        $scope.showErrorContainer = false;
        $scope.signup = function () {
            var _args = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                username: $scope.username,
                password: $scope.password
            }

            $scope.errors = doValidation();

            if ($scope.errors) {
                $scope.showErrorContainer = true;
            }
            else {
                $scope.showErrorContainer = false;
                apiService.execute("doSignup", _args, function (srvData) {
                    if (srvData) {
                        
                        $state.go('login', {do: srvData.token, message: "Sign up successful. Please login here."});
                    }
                });

            }
        }

        function doValidation() {
            var errors = [];

            var ck_name = /^[A-Za-z]{3,20}$/;
            var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            var ck_username = /^[A-Za-z0-9_]{3,20}$/;
            var ck_password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/
                   // /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;

            if (!ck_name.test($scope.firstname)) {
                errors[errors.length] = {
                    field: 'First Name',
                    assertions: [
                        "should be 3 to 20 character long",
                        "accepts only alphabets"
                    ]
                };
            }
            if (!ck_name.test($scope.lastname)) {
                errors[errors.length] = {
                    field: 'Last Name',
                    assertions: [
                        "should be 3 to 20 character long",
                        "accepts only alphabets"
                    ]
                };
            }
            if (!ck_email.test($scope.email)) {
                errors[errors.length] = {
                    field: 'Email',
                    assertions: [
                        "You must enter a valid email address."
                    ]
                };
            }
            if (!ck_username.test($scope.username)) {
                errors[errors.length] = {
                    field: 'Username',
                    assertions: [
                        "should be 3 to 20 character long",
                        "can contain a number, alphabet or '_'"
                    ]
                };
                        
            }
//            if (!ck_password.test($scope.password)) {
//                errors[errors.length] = {
//                    field: 'Password',
//                    assertions: [
//                        "should be 6 to 20 character long",
//                        "must contain a number and alphabet",
//                        "should have one special character as !@#$%^&*()_"
//                    ]
//                };
//            }
            if ($scope.password != $scope.cpassword) {
                errors[errors.length] = {
                    field: 'Password',
                    assertions: [
                        "Password do not match."
                    ]
                };
                        
            }

            if (errors.length > 0) {
                return errors;
            }
            else {
                return undefined;
            }
        }

    }
]);