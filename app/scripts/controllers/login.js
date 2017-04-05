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
			$scope.loadSubmit++;
			$scope.errorloggeduser = false;
			var postData = {};

      // check to make sure the form is completely valid

      	if (isValid) {

      		postData.username 	= $scope.login.email;
      		postData.password 	= $scope.login.password;
      		postData.grant_type = 'password';
      		postData.client_id 	= APIConfig.clientID;

      		console.log(postData,'postData');

      		$http({
      			url: APIConfig.url + '/oauth',
      			method: 'POST',
      			data: postData
      		}).then(
      		function (result) {
      			
      			console.log(result,'result');

      			if (result) {


      			};
      		})
      	}
      }

      }]);