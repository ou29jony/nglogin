'use strict';
var app = angular
  .module('ngloginApp');

app.controller('RightsCtrl', ['$rootScope', '$scope', '$log', '$route', '$location',
  'APIConfig', '$http', 'APIService', '$window', '$cookies', 'APIFactory', '$q', '$filter',
  function ($rootScope, $scope, $log, $route, $location,
            APIConfig, $http, APIService, $window, $cookies, APIFactory, $q, $filter) {

    var api = APIService;
    var fac = APIFactory;
    $scope.rosourcerights = [];
    $scope.resources = [];
    $scope.roles = [];
    $scope.data = {'rights': []};

    $scope.alluserrights = APIConfig.alluserrights;
    $scope.resource_right = APIConfig.resource_right;

    if (!$scope.alluserrights) {
      fac.getAllRightsData().then(function (result) {
        $scope.alluserrights = result;
      });
    }
    if (!$scope.resource_right) {
      fac.getAllResourceRight().then(function (result) {
        $scope.resource_right = result;
      });
    }

    $scope.getAllRightsForResourceAndRoleID = function (resourceid, roleid) {
      var rights = [];
      var deferred = $q.defer();
      for (var i = 0; i < $scope.alluserrights.length; i++) {
        var onevalue = $scope.alluserrights[i];
        if (onevalue.role_id === roleid && onevalue.resource_id === resourceid) {
          if (!rights[onevalue.right_id]) {
            rights[onevalue.right_id] = [];
            rights[onevalue.right_id].push(
              {
                'id': onevalue.right_id,
                'rightname': onevalue.right
              }
            );
          }
        }
        if (i === $scope.alluserrights.length - 1) {
          deferred.resolve(rights);
        }
      }
      return deferred.promise;
    };

    $scope.getResources = function () {
      if (APIConfig.resources.length === 0) {
        api.service('resources').get().then(function (result) {
          $scope.resources = result._embedded.resources;
          resourceTitleIndex();
          APIConfig.resources = $scope.resources;
        });
      } else {
        $scope.resources = APIConfig.resources;
      }
    };
    $scope.getRoles = function () {


      if (!$cookies.getObject('roles') && APIConfig.roles.length === 0) {
        api.service('roles').get().then(function (result) {
          $scope.roles = result._embedded.roles;
          APIConfig.roles = $scope.roles;
          $cookies.putObject('roles', $scope.roles)

        });
      } else {
        if (APIConfig.roles.length !== 0) {
          $scope.roles = APIConfig.roles;
        } else {
          $scope.roles = $cookies.getObject('roles');
        }
      }
    };

    var resourceTitleIndex = function () {
      $scope.resources.splice(0, 0, {'titlename': 'Main Konto'});
      $scope.resources.splice(4, 0, {'titlename': 'Meine Bestellungen'});
      $scope.resources.splice(10, 0, {'titlename': 'Ihre Adressen'});
      $scope.resources.splice(12, 0, {'titlename': 'Andere Konten'});
      $scope.resources.splice(19, 0, {'titlename': 'Gamification Verwaltung'});
      $scope.resources.splice(27, 0, {'titlename': 'Gamification Akquisition'});
      $scope.resources.splice(34, 0, {'titlename': 'Gamification Verhalten'});
      $scope.resources.splice(40, 0, {'titlename': 'Gamification Conversion'});
      $scope.resources.splice(47, 0, {'titlename': 'Zahlungsarten'});
      $scope.resources.splice(51, 0, {'titlename': 'Accountstatistiken'});
      $scope.resources.splice(54, 0, {'titlename': 'Gamification'});

    };
    $scope.getAllData = function () {
      $scope.getRoles();
      $scope.getResources();

    };


    $scope.$watch(function () {
      return $('.table tr').length;
    }, function (newVal, oldVal) {


      $('.selectpicker').selectpicker();

      angular.forEach($scope.resources, function (resourcevalue) {
        angular.forEach($scope.roles, function (rolevalue) {

          if (resourcevalue.resource_id && rolevalue.role_id) {

            var rightspromise = $scope.getAllRightsForResourceAndRoleID(resourcevalue.resource_id, rolevalue.role_id);
            rightspromise.then(function (rights) {
              if (rights.length > 0) {
                var localrights = [];
                if (rights[1]) {
                  localrights.push('1')
                }
                if (rights[2]) {
                  localrights.push('2')
                }
                if (rights[3]) {
                  localrights.push('3')
                }
                if (rights[4]) {
                  localrights.push('4')
                }
                var path = '#resourceid_' + resourcevalue.resource_id + '_roleid_' + rolevalue.role_id;
                $scope.rosourcerights[path] = localrights;
                $(path).selectpicker('val', localrights);
              }
            });
          }

        });
      });
    });

    $scope.saveOrUpdateResourceRights = function () {
      angular.forEach($scope.resources, function (resourcevalue) {
        angular.forEach($scope.roles, function (rolevalue) {
          var path = '#resourceid_' + resourcevalue.resource_id + '_roleid_' + rolevalue.role_id;
          if ($scope.rosourcerights[path]) {
            if ($scope.rosourcerights[path].length !== $(path).val()) {
              angular.forEach($(path).val(), function (rightid, key) {
                  var oldrightid = $scope.rosourcerights[path][key];
                  var newrightid = rightid;
                  if(oldrightid && newrightid){
                    if(oldrightid !== newrightid){
                      var roleresourcerightdata = {
                        'role_id': parseInt(rolevalue.role_id),
                        'resourceright_id': parseInt(newrightid)
                      };
                      api.service('role_resourceright').data(roleresourcerightdata).update().then(function (result) {
                        console.log(result, 'result');
                      });
                    }
                  }

                console.log(rightid, $scope.rosourcerights[path], $(path).val(), key);
              });
            }
          } else {

            if ($(path).val() && $(path).val().length > 0) {
              console.log(resourcevalue.resource_id, rolevalue.role_id, $(path).val());
              angular.forEach($(path).val(), function (rightid) {
                var resourcerightdata = {
                  'resource_id': parseInt(resourcevalue.resource_id),
                  'right_id': parseInt(rightid)
                };
                api.service('resource_right').data(resourcerightdata).save().then(function (result) {
                  console.log(result, 'result');
                  var roleresourcerightdata = {
                    'role_id': parseInt(rolevalue.role_id),
                    'resourceright_id': parseInt(result.id)
                  };
                  api.service('role_resourceright').data(roleresourcerightdata).save().then(function (result) {
                    console.log(result, 'result');
                  });
                });
              });
            }
          }
        });
      });
    }
  }]);
