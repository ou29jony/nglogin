'use strict';

/**
 * @ngdoc function
 * @name ngloginApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngloginApp
 */
var app = angular.module('ngloginApp');

app.controller('MainCtrl', ['$scope', 'APIService', 'APIConfig', '$window', '$cookies', '$location', function ($scope, APIService, APIConfig, $window, $cookies, $location) {

  $scope.user;
  $scope.path = $location.path();
  $scope.prev_url = $cookies.get('url');

  if ($location.search().url !== undefined) {
    $cookies.remove('url');
    $cookies.put('url', $location.search().url);
  }
  $scope.goto = function (url) {
    $location.path(url);
  };

  $scope.goBack = function () {
    $window.location.href = $cookies.get('url');
  };

  $scope.$watch(function () {
    return $location.path();
  }, function (newVal, oldVal) {
    $scope.path = newVal;

   $scope.isNaviPath =  newVal=='/account' || newVal=='/rights' || newVal==='/userrights' || newVal=== '/changeaccount';
  });
}]);
