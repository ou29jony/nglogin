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
      var deferred = $q.defer();
			api.service('resources').get().then(function(result){
				$scope.resources = result._embedded.resources;
        deferred.resolve($scope.resources);
			});
      return deferred.promise;
		};
		$scope.getRoles = function(){
		  var deferred = $q.defer();
			api.service('roles').get().then(function(result){
				$scope.roles = result._embedded.roles;
        deferred.resolve($scope.roles);
			});
      return deferred.promise;
		};

		$scope.getAllData = function(){
			var rolepromise = $scope.getRoles();
			var resourcepromise = $scope.getResources();
		};

    $scope.$watch(function(){
      return  $('.selectpicker').length;
    }, function (newVal, oldVal) {
      $('.selectpicker').selectpicker();
    });
  }]);
