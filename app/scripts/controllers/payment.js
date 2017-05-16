'use strict';
var app = angular
.module('ngloginApp');

app.controller('PaymentCtrl', ['$rootScope', '$scope', '$log', '$route', '$location', 'APIConfig', '$http', 'APIService',
	function ($rootScope, $scope, $log, $route, $location, APIConfig, $http, APIService) {

		$scope.card = {};
		var api = APIService;

		$scope.payment = function(){

			

		}


	}]);