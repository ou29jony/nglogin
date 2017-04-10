'use strict';
var app = angular
.module('ngloginApp');

app.controller('PassCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;
		$scope.hasError = false;
		$scope.message = "Leider konnten wir Sie anhand der eingegebenen Daten nicht eindeutig identifizieren.";
		$scope.login ={};
		 var data  = {
		 			'passlink':1,
                    'username':'test',
                    'password':'pass',
                    'firstname':'pass',
                    'secondname':'pass',
                    'gender':'pass',
                    'active':0,
                    'company_name':'pass',
                    'ust_id':'pass'
                  }

		$scope.sendPassLink = function(isValid){

			
			if(isValid){
				
				data.username =$scope.login.email;

			 
				api.service('user').data(data).save().then(function(result){

					console.log('result',result);

				},function(error){
					
					$scope.hasError = true;

				
					if(error.status ==404){
						
						$scope.message = "Leider konnten wir Sie anhand der eingegebenen Daten nicht eindeutig identifizieren."
					}
				})
			}
		}
	}]);