'use strict';
var app = angular
.module('ngloginApp');

app.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService','$window','$cookies','APIFactory',
  function ($rootScope, $scope, $log, $route, $location,
   APIConfig, $http, APIService,$window,$cookies,APIFactory) {

    var api = APIService;
    var fac = APIFactory;

    $scope.login = {};

    $scope.hasError = false;
    $scope.message = {};
    $scope.message = 'Fehler bei der Anmeldung! Bitte überprüfen Sie Ihre Login Daten.';
    $scope.loadSubmit = 0;

    $scope.submitForm = function (isValid) {

     $scope.hasError = false;
     $scope.errorloggeduser = false;

     var postData = {};

      // check to make sure the form is completely valid

      if (isValid) {

        postData.username 	= $scope.login.email;
        postData.password 	= $scope.login.password;
        postData.grant_type = 'password';
        postData.client_id 	= APIConfig.clientID;

                  //get Authorisi from api
                  $http({
                   url: APIConfig.url + '/oauth',
                   method: 'POST',
                   data: postData
                 }).then(
                 function (result) {


                  if (result) {
                    $scope.hasError = false;

                  //set Bearer access token
                  api.setAuth(result.data);
                  
                  APIConfig.access_token = result.data.access_token;
                  APIConfig.refresh_token = result.data.refresh_token;

                  fac.setCookie('access_token',result.data.access_token,12);
                  fac.setCookie('refresh_token',result.data.refresh_token,12);

                  var url = fac.getCookie('url');

                  if(url == undefined)
                   $window.history.back();
                 else
                  $window.location.href  = url;
              }
            },
            function (result) {

              $scope.hasError = true;

              if(result.status==401){

                $scope.message  =  "Ihre E-Mail-Adresse oder das Passwort war nicht korrekt. Bitte versuchen Sie es noch einmal";
              }
            })

               }else{

                $scope.loginform.password.$touched = true;
                $scope.loginform.email.$touched = true;
              }
            } 
          }]);