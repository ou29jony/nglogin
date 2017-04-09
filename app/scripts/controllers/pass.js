'use strict';
var app = angular
.module('ngloginApp');

app.controller('PassCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		var api = APIService;
		$scope.hasError = false;
		$scope.message = "Email False";

		$scope.sendPassLink = function(email){

			api.service('user').filter({'email':email}).get().then(function(result){

				console.log(result);
			})
		}
	}]);