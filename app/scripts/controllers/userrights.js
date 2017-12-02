'use strict';
var app = angular
  .module('ngloginApp');

app.controller('UserrightsCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q) {

    var api = APIService;

  }]);
