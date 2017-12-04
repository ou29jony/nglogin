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
      var deferred = $q.defer();
      var filter = {'user_id':$cookies.get('userid')};
      api.service('user_role').filter(filter).get().then(function (userrole) {

        if(userrole && userrole.total_items===1) {

          var role = userrole._embedded.user_role[0];
          $scope.user.role = {'role_id':role.role_id ,'role_name':role.role_name};
          deferred.resolve($scope.user);
        }
      },function (reject) {

      });
        return deferred.promise;
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

    $scope.getAllRightsData = function () {

        fac.getAllRightsData();
        fac.getAllResourceRight();

    };
  }]);
