'use strict';
var app = angular
.module('ngloginApp');

app.controller('RegisterCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;

		$scope.saveUser = function(isValid,account){

			if(isValid)
			api.service('user').data(account).save().then(function(result){
				
				console.log('account',result);

			});
		}
}]);