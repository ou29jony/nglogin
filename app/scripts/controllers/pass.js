'use strict';
var app = angular
.module('ngloginApp');

app.controller('PassCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;
		$scope.hasError = false;
		$scope.message = "Leider konnten wir Sie anhand der eingegebenen Daten nicht eindeutig identifizieren.";
		$scope.login ={};
		$scope.user = {};

		var clickedcount = 0;

		var data  = {
			'passlink':1,
		}

		$scope.sendPassLink = function(isValid){

			if(isValid && clickedcount ==0){
				
				clickedcount++;
				data.username =$scope.login.email;


				api.service('usersetting').data(data).save().then(function(result){

					
					$location.path('mailsend');
					APIConfig.mailsendshowpage = true;
					$scope.hasError = false;
					$scope.message = {};
					$scope.message.header = "Überprüfung Ihrer Nachrichten";
					$scope.message.text   = "Sie erhalten von uns ein E-Mail-Nachricht mit Anweisungen zum Zurücksetzen des Passworts. Wenn Sie diese Nachricht nicht erhalten haben, überprüfen Sie bitte Ihren Spam-ordner oder besuchen Sie unsere Hilfe-Seiten, um den Kundenservice für weitere Unterstützung zu kontaktieren."
					clickedcount = 0;
				},

				function(error){

					if(error.status ==-1){
						
						$location.path('mailsend');
						APIConfig.mailsendshowpage = true;
						$scope.hasError = false;
						$scope.message = {};
						$scope.message.header = "Überprüfung Ihrer Nachrichten";
						$scope.message.text   = "Sie erhalten von uns ein E-Mail-Nachricht mit Anweisungen zum Zurücksetzen des Passworts. Wenn Sie diese Nachricht nicht erhalten haben, überprüfen Sie bitte Ihren Spam-ordner oder besuchen Sie unsere Hilfe-Seiten, um den Kundenservice für weitere Unterstützung zu kontaktieren."

					}

					if(error.status ==404){

						$scope.hasError = true;
						$scope.message = "Leider konnten wir Sie anhand der eingegebenen Daten nicht eindeutig identifizieren."
					}
					clickedcount =0;
				})
			}
		}

		$scope.saveNewPassword = function(isValid){
			$scope.hasError = false;

			if(isValid  && clickedcount == 0){
				clickedcount++;

				if($scope.user.password1 == $scope.user.password2){

					api.service('usersetting').id(APIConfig.userid).get().then(function(usersetting){

						if(usersetting.code == APIConfig.code){

							var data = {

								'value':'setnewpassword',
								'code' : $scope.user.password1
							}

							api.service('usersetting').id(APIConfig.userid).data(data).update().then(function(result){
								
								$location.path('newpassok');
								api.service('usersetting').id(APIConfig.userid).delete().then(function(result){
									clickedcount =0;
								});
								

							},function(error){
								if(error.status ==-1){

									$location.path('newpassok');
									api.service('usersetting').id(APIConfig.userid).delete().then(function(result){
										clickedcount =0;
									});
									$scope.hasError = false;


								}else{

									$location.path('newpasserror');


								}
								clickedcount =0;
							})

						}else{
						
							$scope.hasError = true;
							$scope.message = 'Der Hashcode ist falsch';
							clickedcount =0;

						}
					},function(error){

						$scope.hasError = true; 
						clickedcount =0;
					})

				} else{

					$scope.hasError = false; 
					$scope.message = 'Die Passwörter Stimmen nicht überein';
					clickedcount =0;
				}
			}
		}

	}]);