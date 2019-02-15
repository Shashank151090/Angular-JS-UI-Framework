mainAppModule.controller("rulesCtrl", ["$scope", "apiService", "$state", '$timeout',
    '$rootScope', function ($scope, apiService, $state, $timeout, $rootScope) {
        $scope.showModal = false;
        $scope.rule = {};
        $scope.rule.cs = {};
        $scope.rule.selectedTargetValueT = 1;
        $scope.rule.selectedTargetValueA = 1;
        $scope.rule.cs.targetValue = 1;
        $scope.cdeviceId = {};
        $scope.ruleModalTemp = 'screens/rules/addRuleModal.html';

        $scope.rulesList = []

        var _args = {};

        apiService.execute("getRulesList", _args, function (srvData) {
            $scope.rulesList = srvData;
            $rootScope.$broadcast('data', srvData);

        });

        $scope.$on('data', function (event, data) {
            $scope.rulesList = data;
            console.log('test' + $scope.rulesList);
        });

        $scope.slider = {
            value: 1,
            options: {
                showSelectionBar: true,
                floor: 1,
                ceil: 50
            }
        };

        $scope.refreshSlider = function () {
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            });
        };





        /**
         * fetch all the rules
         * 
         * @returns {Array}
         */
        function getRulesList() {
            var rulesList = [];

            var _args = {};

            apiService.execute("getRulesList", _args, function (srvData) {
                rulesList = srvData;
                return rulesList;
            });
        }

        /**
         * 
         * @returns {undefined}
         */
        $scope.addRulesModalToggle = function () {
            $scope.showModal = !$scope.showModal;

            var _args = {};

            apiService.execute("getRulesConfigData", _args, function (srvData) {
                $scope.manufactures = srvData; //srvData.data.manufacturers;
                $state.go('rules.addRuleName');
            });

        }

        /**
         * To Get device list based on the manufatucrer selected
         * 
         * @returns {undefined}
         */
        $scope.getDevices = function (menufacturer, deviceType) {

            $scope.clientSpec = [];

            $scope.switchActionFields = "";
            if ($state.current.name == "rules.addAction" && $scope.rule.selectedManufacturerA.manufacturerName == "Harman" &&
                    $scope.rule.selectedDeviceTypeA.deviceType == "speaker") {
                $scope.switchActionFields = "HARMAN";

                var _args = {};

                apiService.execute("getHamranConfigType", _args, function (srvData) {
                    $scope.clientSpecs = srvData;
                });
            }
            else {
                if (deviceType) {
                    var _args = {
                        manufacturer: menufacturer.manufacturerName, //$scope.rule.selectedManufacturerT.manufacturerName
                        deviceTypeId: deviceType.deviceType
                    };

                    apiService.execute("getUserDeviceList", _args, function (srvData) {

                        for (var i = 0; i < $scope.manufactures.length; i++) {
                            if ($scope.manufactures[i].manufacturerName == _args.manufacturer) {
                                for (var j = 0; j < $scope.manufactures[i].deviceTypes.length; j++) {
                                    if ($scope.manufactures[i].deviceTypes[j].deviceType == _args.deviceTypeId) {
                                        $scope.manufactures[i].deviceTypes[j].deviceList = srvData
                                    }
                                }
                            }
                        }
                        //$scope.manufactures[0].deviceList = srvData;
                        console.log(JSON.stringify($scope.manufactures));
                    });
                }
            }
        }

//        $scope.stateChange = function (device) {
//            var selectedDevices = [];
//            if ($scope.cdeviceId) {
//                selectedDevices.push(device);
//            }
//            else {
//                selectedDevices.filter(function (el) {
//                    return ;
//                })
//            }
//        }

        /**
         * Pop up Add Rule handler
         * 
         * @returns {undefined}
         */
        $scope.addRuleHandler = function () {
            var _args = {
                "ruleName": $scope.rule.ruleName,
                "userId": "rekha1", //TODO: Need to change                
                "trigger": {
                    "device": {
                        "deviceId": $scope.rule.selectedDeviceT.deviceId
                    },
                    "attribute": {
                        "id": $scope.rule.selectedTriggerT.id
                    },
                    "operator": {
                        "operatorId": $scope.rule.selectedOperatorT.operatorId
                    },
                    "value": $scope.rule.selectedTargetValueT.trim(),
                    "manufacturer": {
                        "manufacturerName": $scope.rule.selectedManufacturerT.manufacturerName
                    }
                },
                "actions": []
            };


            if ($scope.rule.selectedManufacturerA.manufacturerName == "Harman" && $scope.rule.selectedDeviceTypeA.deviceType == "speaker") {
                _args.actions = [];
                var obj = {
                    "attribute": {
                        "id": $scope.rule.cs.action.id,
                        "requirements": []
                    },
                    "value": $scope.rule.cs.targetValue
                }
                if ($scope.rule.cs.req) {
                    if ($scope.rule.cs.req.device) {
                        var temp = {
                            requirementType: "device_list",
                            selectedDeviceList: [$scope.rule.cs.req.device]
                        }
                        obj.attribute.requirements.push(temp);
                    }
                    if ($scope.rule.cs.req.media) {
                        var temp = {
                            requirementType: "media_list",
                            selectedMedia: $scope.rule.cs.req.media
                        }
                        obj.attribute.requirements.push(temp);
                    }

                    if ($scope.rule.cs.req.group) {
                        var temp = {
                            requirementType: "group_list",
                            selectedGroup: $scope.rule.cs.req.group
                        }
                        obj.attribute.requirements.push(temp);
                    }
                }
                _args.actions.push(obj);
            }
            else {
                _args.actions = [];
                _args.actions.push({
                    "device": {
                        "deviceId": $scope.rule.selectedDeviceA.deviceId,
                        "deviceType": {
                            "deviceType": $scope.rule.selectedDeviceTypeA.deviceType
                        }
                    },
                    "manufacturer": {
                        "manufacturerName": $scope.rule.selectedManufacturerA.manufacturerName
                    },
                    "attribute": {
                        "id": $scope.rule.selectedTriggerA.id
                    },
                    "value": $scope.rule.selectedOperatorA.value == 'get' ? '' : $scope.rule.selectedTargetValueA,
                    "actionType": $scope.rule.selectedOperatorA.value
                });
            }

            console.log(JSON.stringify(_args));

            apiService.execute("saveRule", _args, function (srvData) {
                if (srvData) {
                    $scope.showModal = false;
                    $scope.rule = {};
                    $state.go('rules', {}, {reload: true});
                    console.log(srvData);
                    safeApply($scope);
                }
            });

        }

        /**
         * To control the modal close event
         * @returns {undefined}
         */

        $scope.closeModal = function () {
            $timeout(function () {
                $scope.showModal = false;
                $scope.rule = {};
                // $location.path('/rules');
            })
        }

    }
]);

