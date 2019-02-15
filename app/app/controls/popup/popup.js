mainAppModule.directive('modal', ['$state', function ($state) {
        return{
            templateUrl: 'controls/popup/popup.html',
            restirct: 'E',
            replace: true,
            transclude: true,
            scope: true,
            link: function (scope, element, attrs, $timeout) {
                scope.title = attrs.title;
                var toState = attrs.toState;


                scope.close = function () {

                    $state.go(toState);
                    scope.closeModal();
                    $(element).modal('hide');
                }

                scope.$watch(attrs.visible, function (value) {
                    if (value == true) {
                        $(element).modal('show');
                        //$(element).modal({backdrop: 'static', keyboard: false});
                    }
                    else {
                        if (angular.element('.modal-backdrop.fade.in')) {
                            angular.element('.modal-backdrop.fade.in').remove();
                            angular.element('body').removeClass('modal-open');
                        }

                        $(element).modal('hide');
                    }
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    }]);


