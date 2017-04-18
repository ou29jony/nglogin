'use strict';
var app = angular
.module('ngloginApp');

app.controller('RegisterCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;

		$scope.account = APIConfig.account;
		$scope.message = "";
		$scope.hasError = false;
		$scope.clicked = false;

		$scope.saveUser = function(isValid){

			$scope.clicked = true;
			$scope.account.active =0;

			if(isValid){

				if($scope.account.password1 == $scope.account.password2){

					$scope.account.password = $scope.account.password1;

					if(!checkEmail($scope.account.username)){

						APIConfig.account = $scope.account;

						api.service('user').data($scope.account).save().then(function(result){

							$location.path('registrierungsend');

							console.log('account',result);

						},function(error){

							if(error.status == 422){

								$scope.hasError = true;
								$scope.message = "Diese E-Mail-Adresse existiert schon";
							}
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
		$scope.activate= function(){

			api.service('usersetting').id(APIConfig.userid).get().then(function(usersetting){

				console.log(usersetting.code,"shechemisa",APIConfig.code);

				if(usersetting.code == APIConfig.code){

					var data = {
						'value':'activate',
						'code' : APIConfig.code
					}

					api.service('usersetting').id(APIConfig.userid).data(data).update().then(function(result){

						$location.path('activateok');

					},function(error){

						$location.path('activateerror');

					})
				}
			},function(error){

				$scope.hasError = true; 
			})
		};
	}]);