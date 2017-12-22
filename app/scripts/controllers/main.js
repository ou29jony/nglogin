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
  $scope.smallWindowSize = 1333;
  $scope.path = $location.path();
  $scope.prev_url = $cookies.get('url');
  $scope.isSmallWindow = window.innerWidth < $scope.smallWindowSize;
  $scope.showdropdown = false;

$scope.logout = function () {

  $cookies.remove('useraccount');
  $cookies.remove('userid');
  $cookies.remove('access_token');
  $cookies.remove('refresh_token');
  $cookies.remove('mandatid');
  $cookies.remove('roleid');
  $location.path('/');
};
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

    var user = $cookies.getObject('useraccount');
    if(user){
      return user.firstname;
    }else{
      return user;

    }
  }, function (newVal, oldVal) {
    $scope.user= $cookies.getObject('useraccount');
  });
  $scope.$watch(function () {
    return $location.path();
  }, function (newVal, oldVal) {
    $scope.path = newVal;
   $scope.isNaviPath =  newVal=='/account' || newVal=='/rights' || newVal==='/userrights' || newVal=== '/changeaccount' || newVal=== '/invite';
  });

  $(window).resize(function(){

    $scope.$apply(function(){

      $scope.isSmallWindow = window.innerWidth < $scope.smallWindowSize;

    });
  });
}]);
