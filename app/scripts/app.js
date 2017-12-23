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
    .when('/accountupdate', {
      templateUrl: 'views/account/accountupdate.html',
      controller: 'RegisterCtrl'
    })
      .when('/changeaccount', {
        templateUrl: 'views/account/changeaccount.html',
        controller: 'AccountCtrl'
      })
    .when('/rights', {
      templateUrl: 'views/rights/rights.html',
      controller: 'RightsCtrl'
    }).when('/invite', {
      templateUrl: 'views/invate/invite.html',
      controller: 'InviteCtrl'
    })
    .when('/newpasslink', {
      templateUrl: 'views/newpass.html',
      controller: 'PassCtrl'
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
      controller: 'PassCtrl'
    })
    .when('/registration', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'

    }).when('/userrights', {
      templateUrl: 'views/rights/userrights.html',
      controller: 'UserrightsCtrl'

    })  .when('/activate', {
      templateUrl: 'views/activate.html',
      controller: 'RegisterCtrl'
    })
    .when('/activateok', {
      templateUrl: 'views/activateok.html',
      controller: 'RegisterCtrl'
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
      .when('/invite', {
        templateUrl: 'views/invite/invite.html',
        controller: 'InviteCtrl'


      })
    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'AccountCtrl'


    }).when('/payment', {
      templateUrl: 'views/payment/payment.html',
      controller: 'AccountCtrl',
      resolveRedirectTo : function($cookies){
       return !($cookies.get('access_token')===false) ? undefined : true;
     }
   })
    .otherwise({
      redirectTo: '/'
    });

      //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);
     //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


  }]);

 app.run(['$rootScope', '$injector', 'APIConfig', '$location', '$http', 'APIService','$window','APIFactory',
  function ($rootScope, $injector, APIConfig, $location, $http, APIService,$window,APIFactory) {

    var fac = APIFactory;
    var api = APIService;

    if((!$rootScope.oauth || !$rootScope.oauth.access_token) && fac.getCookie('access_token') ){

      var data = {'access_token' : fac.getCookie('access_token')};
      api.setAuth(data);
    }

    $http.get('scripts/settings.json').then(function (response) {

      APIConfig.url = response.data.login_api_url;
      APIConfig.url_local = response.data.login_api_url_local;

     // window.location.origin.indexOf('localhost')!==-1 ? APIConfig.url = APIConfig.url_local : APIConfig.url =APIConfig.url;

      APIConfig.clientID = response.data.clientID;
      APIConfig.b2c_emails = response.data.b2c_emails;
      APIConfig.mailstone = response.data.mailstone;

      $rootScope.settings = response.data;
      $rootScope.title = $rootScope.settings.title;

    });

    if($location.path().indexOf('newpasslink') !== -1){

      $location.path($location.path());
      APIConfig.userid = $location.search().userid;
      APIConfig.code   = $location.search().hash;

    }

    if($location.path().indexOf('activate')!==-1){

      $location.path($location.path());
      APIConfig.userid = $location.search().userid;
      APIConfig.code   = $location.search().hash;
    }


  }]);
