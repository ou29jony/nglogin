'use strict';
var app = angular
.module('ngloginApp');

app.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService','$window','$cookies','APIFactory','$q',
  function ($rootScope, $scope, $log, $route, $location,
   APIConfig, $http, APIService,$window,$cookies,APIFactory,$q) {

    var api = APIService;
    var fac = APIFactory;

    $scope.login = {};
    $scope.hasError = false;
    $scope.message = {};
    $scope.message = 'Fehler bei der Anmeldung! Bitte überprüfen Sie Ihre Login Daten.';
    $scope.loadSubmit = 0;

    $scope.getLogedUserID = function () {

      var deferred = $q.defer();
      var filter = {'username': $scope.login.email};

      api.service('user').filter(filter).get().then(function (response) {
        deferred.resolve(response);
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };

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

                  $scope.getLogedUserID().then(function (rslt) {

                    if (rslt._embedded.user[0]) {

                      var url = $cookies.get('url');

                      APIConfig.user = rslt._embedded.user[0];
                      APIConfig.userid = rslt._embedded.user[0].id;
                      fac.setCookie('userid', APIConfig.userid,12);

                      if(url === undefined){
                       $window.history.back();
                     }
                     else{
                      $window.location.href  = url+"?access_token="+result.data.access_token+"&userid="+APIConfig.userid;
                    }
                  }
                });
                }
              },
              function (result) {

                $scope.hasError = true;

                if(result.status === 401){

                  $scope.message  =  "Ihre E-Mail-Adresse oder das Passwort war nicht korrekt. Bitte versuchen Sie es noch einmal";
                }
              });

               }else{

                $scope.loginform.password.$touched = true;
                $scope.loginform.email.$touched = true;
              }
            };
          }]);