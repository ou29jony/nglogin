'use strict';
var app = angular
.module('ngloginApp');

app.controller('RegisterCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;

		$scope.account = APIConfig.account;

		$scope.saveUser = function(isValid){

			$scope.account.active =0;

			if(isValid){
				APIConfig.account = $scope.account;

				console.log(' $scope.account', $scope.account);
				
				return;

			api.service('user').data($scope.account).save().then(function(result){
				
				console.log('account',result);

			});
		}
	}

}]);