'use strict';
var app = angular
.module('ngloginApp');

app.controller('RightsCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
	'APIConfig', '$http', 'APIService','$window','$cookies','APIFactory','$q',
	function ($rootScope, $scope, $log, $route, $location,
		APIConfig, $http, APIService,$window,$cookies,APIFactory,$q) {

		var api = APIService;
		$scope.resources = [];
		$scope.roles = [];

		$scope.getResources = function(){
			api.service('resources').get().then(function(result){
				$scope.resources = result._embedded.resources;
			})
		}
		$scope.getRoles = function(){
			api.service('roles').get().then(function(result){
				console.log(result._embedded.roles);
				$scope.roles = result._embedded.roles;
			})
		}
		$scope.getAllData = function(){
			$scope.getRoles();
			$scope.getResources();
		}




  }]);
