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

      if(!APIConfig.resources) {
        api.service('resources').get().then(function (result) {
          $scope.resources = result._embedded.resources;
          APIConfig.resources = $scope.resources;
        });
      }else{
        $scope.resources = APIConfig.resources;
      }
		};
		$scope.getRoles = function(){
      if(!$cookies.getObject('resources') && !APIConfig.roles ) {
        api.service('roles').get().then(function (result) {
          $scope.roles = result._embedded.roles;
          APIConfig.roles = $scope.roles;
          $cookies.putObject('roles', $scope.roles)
        });
      }else{
        if(APIConfig.roles) {
          $scope.roles = APIConfig.roles;
        }else {
          $scope.roles = $cookies.getObject('roles');
        }
      }
		};

		$scope.getAllData = function(){
		 $scope.getRoles();
		 $scope.getResources();
		};

    $scope.$watch(function(){
      return  $('.selectpicker').length;
    }, function (newVal, oldVal) {
      $('.selectpicker').selectpicker();
    });
  }]);
