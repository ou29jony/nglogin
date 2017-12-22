'use strict';
var app = angular
  .module('ngloginApp');

app.controller('InviteCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q) {

    var api = APIService;
    var fac= APIFactory;
    $scope.roles = $cookies.getObject('roles');
    $scope.userrole = {};
    $scope.userinvite = {};
    $scope.userinvite.body ="Sie sind im Marketing Dashboard Plattform eingeladen";

    $scope.getUser = function () {

      if(!$cookies.get('userid')){
        $location.path('/');

      }

    };
    $scope.inviteUser = function (inviteduser) {
          var data = inviteduser;

          data.inviteuser = true;
          data.username = data.email;

          var account =  $cookies.getObject('useraccount');
         data.firstname = account.firstname;
         data.lastname = account.lastname;

        var path = window.location.pathname.substring(0,window.location.pathname.indexOf('invite'));
      data.url =""+ window.location.origin
        +'/account/#!/registration?company_name='+account.company_name;
      if(account.street!=undefined){
        data.url = data.url+ '&street='+account.street;
      }
      if(account.ust_id!=undefined){
        data.url = data.url+ '&ust_id='+account.ust_id;
      }
      if(account.ort!=undefined){
        data.url = data.url+ '&ort='+account.ort;
      }
      if(account.plz!=undefined){
        data.url = data.url+ '&plz='+account.plz;
      }

       data.role_id = $('#'+$scope.user.id+'_user_role').val();
        var mandatid = $cookies.get('mandatid');
       data.url = data.url+ '&mandatid='+mandatid;
      data.url = data.url+ '&product=Marketing Dashboard';
      data.url = data.url+ '&role_id='+data.role_id;

      console.log(data);

         api.service('usersetting').filter(data).get().then(function (result) {

      },function (error) {

           if(error.status==-1){
             $location.path('/account');
           }
         })
    };
  }]);
