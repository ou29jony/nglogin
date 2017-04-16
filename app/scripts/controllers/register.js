'use strict';
var app = angular
.module('ngloginApp');

app.controller('RegisterCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;

		$scope.account = APIConfig.account;
		$scope.message = "";
		$scope.hasError = false;

		$scope.saveUser = function(isValid){

			$scope.account.active =0;

			if(isValid){

				if($scope.account.password1 == $scope.account.password2){

					$scope.account.password = $scope.account.password1;

					if(!checkEmail($scope.account.username)){

						APIConfig.account = $scope.account;

						api.service('user').data($scope.account).save().then(function(result){

							console.log('account',result);

						});
					}else{

						$scope.hasError = true;
						$scope.message = "Bitte geben Sie Ihre Unternehmens-E-Mail-Adresse an. E-Mail-Adressen von Massenmail-Providern wie beispielsweise gmx, icloud oder gmail können leider nicht akzeptiert werden.";

					}
				}else{
						$scope.hasError = true;
						$scope.message = "Die Passwörter Stimmen nicht überein";


				}
			}
		}

		var checkEmail = function(email){

			var result = false;

			for (var i=0; i< APIConfig.b2c_emails.length; i++) {

				var em = APIConfig.b2c_emails[i];

				if(email.includes(em))
					result = true;
			}

			return result;
		}

	}]);