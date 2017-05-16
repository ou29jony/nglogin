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
  'pascalprecht.translate',
  'ngSanitize',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ui.router'
  ]);


 app.config(['$routeProvider', '$httpProvider', '$locationProvider', '$translateProvider',
  function ($routeProvider, $httpProvider, $locationProvider, $translateProvider) {


    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('de_DE');
    $translateProvider.useSanitizeValueStrategy('escape');


    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/lostpass', {
      templateUrl: 'views/lostpass.html',
      controller: 'PassCtrl'
    })
    .when('/newpasslink', {
      templateUrl: 'views/newpass.html',
      controller: 'PassCtrl',
      resolveRedirectTo : function($location, $http,APIService,APIConfig){

        var api = APIService;

        return   $http.get('scripts/settings.json').then(function (response) {

          APIConfig.url = response.data.url;

             return api.service('usersetting').id(APIConfig.userid).get().then(function(result){

              var end_result = result.code == $location.search().hash;

             // console.log($location.search().hash,result,APIConfig.userid);
           return  end_result ? undefined : true;

         }, function(error){
 
           return true;
         })
        });
      }
    })
    .when('/newpassok', {
      templateUrl: 'views/newpassok.html',
      controller: 'PassCtrl'
    })
    .when('/newpasserror', {
      templateUrl: 'views/newpass.html',
      controller: 'PassCtrl'
    })
    .when('/mailsend', {
      templateUrl: 'views/mailsend.html',
      controller: 'PassCtrl',
      resolveRedirectTo : function(APIConfig){
        var result = APIConfig.mailsendshowpage == true ? undefined: true ;
        return result;
      }
    })
    .when('/registration', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'

    }) .when('/activate', {
      templateUrl: 'views/activate.html',
      controller: 'RegisterCtrl'
    })
    .when('/activateok', {
      templateUrl: 'views/activateok.html',
      controller: 'RegisterCtrl',
      resolveRedirectTo : function($cookies,APIService){
        var api = APIService;
        var result = !$cookies.get('access_token')==false ? undefined : true;
        return undefined;
      }
    }).when('/activateerror', {
      templateUrl: 'views/activateerror.html',
      controller: 'RegisterCtrl'
    }).when('/register', {
      templateUrl: 'views/registersend.html',
      controller: 'RegisterCtrl'
    })

    .when('/account', {
      templateUrl: 'views/account/account.html',
      controller: 'AccountCtrl'
   })

    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'AccountCtrl'


    }).when('/payment', {
      templateUrl: 'views/payment/payment.html',
      controller: 'AccountCtrl',
      resolveRedirectTo : function($cookies,APIService){
       return !$cookies.get('access_token')==false ? undefined : true;
     }
   })
    .otherwise({
      redirectTo: '/'
    });

    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);

  }]);

 app.run(['$rootScope', '$injector', 'APIConfig', '$location', '$http', 'APIService','$window',
  function ($rootScope, $injector, APIConfig, $location, $http, APIService,$window) {

    var history = APIConfig.history;

    $http.get('scripts/settings.json').then(function (response) {

      APIConfig.url = response.data.url;
      APIConfig.clientID = response.data.clientID;
      APIConfig.b2c_emails = response.data.b2c_emails;
      $rootScope.settings = response.data;
      $rootScope.title = $rootScope.settings.title;

    });

    if($location.path().includes('newpasslink')){

      $location.path($location.path());
      APIConfig.userid = $location.search().userid;
      APIConfig.code   = $location.search().hash;

    }

    if($location.path().includes('activate')){

      $location.path($location.path());
      APIConfig.userid = $location.search().userid;
      APIConfig.code   = $location.search().hash;
    }


  }]);