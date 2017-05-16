'use strict';

/**
 * @ngdoc function
 * @name ngloginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngloginApp
 */
var app = angular.module('ngloginApp');

  app.controller('MainCtrl',['$scope','APIService','APIConfig','$window','$cookies', function ($scope,APIService,APIConfig,$window,$cookies) {

  	$scope.user;

  	var api = APIService;

    $scope.prev_url = $cookies.get('url');

  //  api.service('user').id(49).delete().then();
  $scope.goBack = function(){
  	 $window.location.href = $cookies.get('url');

  	 console.log($cookies.get('url'));
  	 	
  }

   }]);
