'use strict';
var app = angular
  .module('ngloginApp');

app.controller('UserrightsCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q) {

    var api = APIService;
    $scope.users = APIConfig.users;
    $scope.indexedUser = APIConfig.indexedUser;
    $scope.roles = APIConfig.roles;
    $scope.indexedRoles = [];
    $scope.userroles = [];
    $scope.olduserroles = [];

    $scope.getUsers = function () {
      var deferred = $q.defer();

      if (APIConfig.users.length===0) {
        api.service('user').get().then(function (result) {
          $scope.users = result._embedded.user;
          angular.forEach(result._embedded.user, function (value) {
            $scope.indexedUser[value.id] = value;

          });
          $scope.users = result._embedded.user;
          deferred.resolve($scope.users);
        });
      } else {
        $scope.users = APIConfig.users;
        deferred.resolve($scope.users);
      }

      return deferred.promise;
    };

    $scope.getRoles = function () {
      if (!$cookies.getObject('roles') && APIConfig.roles.length===0) {
        api.service('roles').get().then(function (result) {
          $scope.roles = result._embedded.roles;
          APIConfig.roles = $scope.roles;
          $cookies.putObject('roles', $scope.roles);
        });
      } else {
        if (APIConfig.roles.length!==0) {
          $scope.roles = APIConfig.roles;
        } else {
          $scope.roles = $cookies.getObject('roles');
        }
      }
    };
    $scope.getUserRoles = function () {
      api.service('user_role').get().then(function (result) {
        $('.selectpicker').selectpicker();
        var userroles = result._embedded.user_role;
        for (var i = 0; i < userroles.length; i++) {
          if ($scope.indexedUser[userroles[i].user_id]) {
            $scope.indexedUser[userroles[i].user_id].role = userroles[i];
            APIConfig.indexedUser = $scope.indexedUser;
            $('#'+userroles[i].user_id+'_user_role').selectpicker('val', $scope.indexedUser[userroles[i].user_id].role.role_id);
          }
        }

      }, function (reject) {
      });
    };
    $scope.getAllData = function () {

      var userpromise = $scope.getUsers();
      userpromise.then(function (users) {
        $scope.getUserRoles();
        $scope.getRoles();

      });


    };

    $scope.$watch(function () {
      return $scope.indexedUser;
    }, function (newVal, oldVal) {


    });

    $scope.saveOrUpdateUserRole = function (users) {
      for (var i = 0; i < $scope.users.length; i++) {
        if ($('#' + i + '_user_role') && $scope.users[i]) {
          var userID = $scope.users[i].id;
          var userRoleId = $('#' + userID + '_user_role').val();
          var data = {'user_id': parseInt(userID), 'role_id': parseInt(userRoleId)};
          if ($scope.indexedUser[userID].role) {
            if (userRoleId !== $scope.indexedUser[userID].role.role_id) {
              var roleID = $scope.indexedUser[userID].role.id;
              api.service('user_role').id(roleID).data(data).update().then(function (result) {
                $scope.indexedUser[userID].role = result;
                $location.path('account');

              });
            }
          } else {
            if (userRoleId) {
              api.service('user_role').data(data).save().then(function (result) {
                $scope.roles.push(result);
                $scope.indexedUser[userID].role = result;
                APIConfig.roles = $scope.roles;
                $location.path('account');
              });
            }
          }
        }
      }
    };

}]);

