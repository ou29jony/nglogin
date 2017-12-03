'use strict';
var app = angular
  .module('ngloginApp');

app.controller('AccountCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q) {

    var api = APIService;
    var fac= APIFactory;
    $scope.user = {};
    $scope.userrole = {};
    $scope.alluserrights = APIConfig.alluserrights;

    $scope.getUser = function () {
      if(!$cookies.getObject('useraccount')) {
        api.service('user').id($cookies.get('userid')).get().then(function (user) {
          $scope.user = user;
          $cookies.putObject('useraccount', user);
        });
      }else{
        $scope.user = $cookies.getObject('useraccount');
      }
    };

    $scope.getUserRole = function () {
      var filter = {'userid':$cookies.get('userid')};
      api.service('user_role').filter(filter).get().then(function (userrole) {
        api.service('roles').id(userrole.id).get().then(function (role) {
          $scope.user.rolename = role;
        },function (reject) {
        });
      },function (reject) {

      });
    };

    $scope.updateUser = function () {
      var data = $scope.user;
      var id = $scope.user.id;
      data.id = undefined;
      data._links = undefined;
      data.username = undefined;
      data.password = undefined;
      api.service('user').id(id).data(data).update().then(function (user) {
        $cookies.putObject('useraccount', user);
        $location.path('account');
      });
    };

    $scope.getAllRigheData = function () {
      fac.getAllRigheData();
      fac.getAllResourceRight();
    };


  }]);
