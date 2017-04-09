'use strict';

/**
 * @ngdoc overview
 * @name ngloginApp
 * @description
 * # ngloginApp
 *
 * Main module of the application.
 */
var app = angular
  .module('ngloginApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'pascalprecht.translate',
    'ngTouch'
  ]);


app.config(['$routeProvider', '$httpProvider', '$locationProvider', '$translateProvider',
  function ($routeProvider, $httpProvider, $locationProvider, $translateProvider) {

$translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('de_DE');
    $translateProvider.useSanitizeValueStrategy('sanitize');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/newpass', {
        templateUrl: 'views/newpass.html',
        controller: 'PassCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);
  }]);

app.run(['$rootScope', '$injector', 'APIConfig', '$location', '$http', 'APIService',
  function ($rootScope, $injector, APIConfig, $location, $http, APIService) {

 


}]);