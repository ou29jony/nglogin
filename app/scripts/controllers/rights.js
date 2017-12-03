'use strict';
var app = angular
.module('ngloginApp');

app.controller('RightsCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
	'APIConfig', '$http', 'APIService','$window','$cookies','APIFactory','$q',
	function ($rootScope, $scope, $log, $route, $location,
		APIConfig, $http, APIService,$window,$cookies,APIFactory,$q) {

		var api = APIService;
		$scope.resources = [];
		$scope.roles = [];

		$scope.getResources = function(){
      if(APIConfig.resources.length === 0) {
        api.service('resources').get().then(function (result) {
          $scope.resources = result._embedded.resources;
          resourceTitleIndex();
          APIConfig.resources = $scope.resources;
        });
      }else{
        $scope.resources = APIConfig.resources;
      }
		};
		$scope.getRoles = function(){


      if(!$cookies.getObject('roles') && APIConfig.roles.length===0 ) {
        api.service('roles').get().then(function (result) {
          $scope.roles = result._embedded.roles;
          APIConfig.roles = $scope.roles;
          $cookies.putObject('roles', $scope.roles)

        });
      }else{
        if(APIConfig.roles.length!==0) {
          $scope.roles = APIConfig.roles;
        }else {
          $scope.roles = $cookies.getObject('roles');
        }
      }
		};

  var resourceTitleIndex = function () {
    $scope.resources.splice(0,0,{'titlename':'Main Konto'});
    $scope.resources.splice(4,0,{'titlename':'Meine Bestellungen'});
    $scope.resources.splice(10,0,{'titlename':'Ihre Adressen'});
    $scope.resources.splice(12,0,{'titlename':'Andere Konten'});
    $scope.resources.splice(19,0,{'titlename':'Gamification Verwaltung'});
    $scope.resources.splice(27,0,{'titlename':'Gamification Akquisition'});
    $scope.resources.splice(34,0,{'titlename':'Gamification Verhalten'});
    $scope.resources.splice(40,0,{'titlename':'Gamification Conversion'});
    $scope.resources.splice(47,0,{'titlename':'Zahlungsarten'});
    $scope.resources.splice(51,0,{'titlename':'Accountstatistiken'});
    $scope.resources.splice(54,0,{'titlename':'Gamification'});

  };
		$scope.getAllData = function(){
		 $scope.getRoles();
		 $scope.getResources();

		};



    $scope.$watch(function(){
      return  $('.selectpicker').length;
    }, function (newVal, oldVal) {
      $('.selectpicker').selectpicker();
    });
  }]);
