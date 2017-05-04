'use strict';

/**
 * @ngdoc function
 * @name ngloginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngloginApp
 */
var app = angular.module('ngloginApp');

  app.controller('MainCtrl',['$scope','APIService', function ($scope,APIService) {

  	$scope.user;

  	var api = APIService;
 
  	$scope.getUser = function(user){

  			console.log("getUser");

  	}

  	$scope.deleteUser = function(){

  		 api.service('user').id(26).delete().then(function(result){

  		 	console.log(result)
  		 });
  	}
	$scope.deleteUser();
  	    

   }]);
