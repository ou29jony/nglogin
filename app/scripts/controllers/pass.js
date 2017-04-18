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

		var data  = {
			'passlink':1,
		}
	

	$scope.sendPassLink = function(isValid){

		console.log(isValid);

		if(isValid){

			data.username =$scope.login.email;


			api.service('usersetting').data(data).save().then(function(result){
				
				    $location.path('mailsend');
					$scope.hasError = false;
				    $scope.message = {};
					$scope.message.header = "Überprüfung Ihrer Nachrichten";
					$scope.message.text   = "Sie erhalten von uns ein E-Mail-Nachricht mit Anweisungen zum Zurücksetzen des Passworts. Wenn Sie diese Nachricht nicht erhalten haben, überprüfen Sie bitte Ihren Spam-ordner oder besuchen Sie unsere Hilfe-Seiten, um den Kundenservice für weitere Unterstützung zu kontaktieren."
					

			},
			function(error){

				

				console.log(error);
				
				if(error.status ==404){
					$scope.hasError = true;

					$scope.message = "Leider konnten wir Sie anhand der eingegebenen Daten nicht eindeutig identifizieren."
				}
			})
		}

	}

	$scope.saveNewPassword = function(user){

		if(user.password1 == user.password2){

			api.service('usersetting').id(APIConfig.userid).get().then(function(usersetting){

				console.log(usersetting.code,APIConfig.code);

				if(usersetting.code == APIConfig.code){

					var data = {
						'value':'setnewpassword',
						'code' : user.password1
					}

					api.service('usersetting').id(APIConfig.userid).data(data).update().then(function(result){

						$location.path('newpassok');

					},function(error){

						$location.path('newpasserror');

					})
				}
			},function(error){

				$scope.hasError = true; 
			})
		} else{

			$scope.hasError = true; 
			$scope.message = 'Die Passwörter Stimmen nicht überein'
		}
	};

}]);