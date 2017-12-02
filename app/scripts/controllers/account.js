'use strict';
var app = angular
  .module('ngloginApp');

app.controller('AccountCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q) {

    var api = APIService;
    $scope.user = {};
    $scope.userrole = {};

    $scope.getUser = function () {
      api.service('user').id($cookies.get('userid')).get().then(function (user) {
        $scope.user = user;
      });
    };

    $scope.getRole = function () {
      api.service('user_role').id($cookies.get('userid')).get().then(function (userrole) {

        api.service('roles').id(userrole.role_id).get().then(function (role) {
          $scope.user.rolename = role;
          console.log('role',role);
        },function (reject) {
        });
      },function (reject) {

      });
    };
  }]);
