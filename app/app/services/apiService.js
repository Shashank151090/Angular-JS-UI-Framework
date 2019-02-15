mainAppModule.factory('apiService', ['$http', function ($http) {
        // Register interceptors service
        return {
            execute: function (type, args, cb) {
                var apiData = {};
                switch (type) {
                    case 'getRulesConfigData':
                    {
                        apiData.url = config.uim() + 'deviceTypes/'; //"JSON/ruleConfigData.json"; //
                        apiData.type = "GET";
                        break;
                    }
                    
                    case 'getHamranConfigType':
                    {
                        apiData.url = config.uim() + 'rekha1/harman/device/actions'; //"JSON/harmanConfig.json"; //
                        apiData.type = "GET";
                        break;
                        break;
                    }
                    
                    case 'doLogin':
                    {
                        apiData.url = config.uma() + 'login'; 
                        apiData.type = "POST";
                        break;
                    }
                    
                    case 'doSignup':
                    {
                        apiData.url = config.uma() + 'save';
                        apiData.type = "POST";
                        break;
                    }
                    
                    case 'getUserDeviceList':
                    {
                        apiData.url = config.uim() + 'user/rekha1/devices/?manufacturer=' + args.manufacturer + '&deviceTypeId=' + args.deviceTypeId; 
                        apiData.type = "GET";
                        break;
                    }
                    
                    case 'saveRule':
                    {
                        apiData.url = config.uim() + 'policy/'; 
                        apiData.type = "POST";
                        break;
                    }
                    
                    case 'getRulesList':
                    {
                        apiData.url = config.uim() + 'getAllpolicy/'; 
                        apiData.type = "GET";
                        break;
                    }
                    
                    case 'getNestAccessToken':
                    {
                        apiData.url = config.uma() + 'getNestToken'
                                /*'http://localhost:3000/getNESTAccessToken?client_id=' + args.clientId + 
                                '&code=' + args.code + '&client_secret=' + args.clientSecret + '&grant_type=' + args.grantType;*/
                                
                        apiData.type = "POST";
                        break;
                    }
                }
                var xhr = $http({
                    method: apiData.type,
                    url: apiData.url,
                    headers: apiData.headers || {},
                    data: JSON.stringify(args),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {
                        console.log('request begin');
                    }
                });
                xhr.success(function (srvData) {
                    cb(srvData);
//                    if (srvData.status == 200) {
//                        cb(srvData);
//
//                    } else if (srvData.status == 503) {
//                        alert(srvData.message);
//
//                    } else if (srvData.status == 500) {
//                        alert(srvData.message);
//                    }

                });
                xhr.error(function () {
                    //document.getElementById("loadingContainer").style.display = "none";
                    alert("Application could not call this API.");
                });
                return xhr;
            }
        };

    }]);



