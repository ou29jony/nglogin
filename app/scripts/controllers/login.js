'use strict';
var app = angular
.module('ngloginApp');

app.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;

		$scope.login = {};
		$scope.hasError = false;
		$scope.Message = {};
		$scope.Message.error = 'Fehler bei der Anmeldung! Bitte überprüfen Sie Ihre Login Daten.';
		$scope.loadSubmit = 0;

		$scope.submitForm = function (isValid) {

			$scope.hasError = false;
			$scope.errorloggeduser = false;

			var postData = {};

      // check to make sure the form is completely valid

      if (isValid) {

        postData.username 	= $scope.login.email;
        postData.password 	= $scope.login.password;
        postData.grant_type = 'password';
        postData.client_id 	= APIConfig.clientID;

                  //get Authorisi from api
                  $http({
                     url: APIConfig.url + '/oauth',
                     method: 'POST',
                     data: postData
               }).then(
               function (result) {

                  console.log(result);

                  if (result) {
                        $scope.hasError = false;

                  //set Bearer access token
                  api.setAuth(result.data);
                  
                  APIConfig.access_token = result.data.access_token;
                  APIConfig.refresh_token = result.data.refresh_token;

                  var data  = {

                        'username':'mail@mail.com',
                        'password':'cccc',
                        'firstname':'firstname',
                        'secondname':'secondname',
                        'gender':'male',
                        'active':0,
                        'company_name':'company',
                        'ust_id':'ustid'


                  }

                  api.service('user').data(data).save().then(function(result){

                        console.log('result save user',result);
                  })
            }
      },
      function (result) {

            $scope.hasError = true;

            if(result.status==401){


                  $scope.Message.error  =  "Ihre E-Mail-Adresse oder das Passwort war nicht korrekt. Bitte versuchen Sie es noch einmal";

            }


            })
         }else{

              $scope.loginform.password.$touched = true;
              $scope.loginform.email.$touched = true;
       }
   }

}]);