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
    $scope.alluserrightsIndexed = APIConfig.alluserrightsIndexed;
    $scope.resource_right = APIConfig.resource_right;

    $scope.getAllRightsForResourceAndRoleID = function (resourceid, roleid) {
      var rights = [];
      var deferred = $q.defer();

      for (var i = 0; APIConfig.alluserrights && i <  APIConfig.alluserrights.length; i++) {
        var onevalue = APIConfig.alluserrights[i];
        if (onevalue.role_id === roleid && onevalue.resource_id === resourceid) {
          if (!rights[onevalue.right_id]) {

            rights[onevalue.right_id] = [];
            rights[onevalue.right_id].push(
              {
                'id': onevalue.right_id,
                'rightname': onevalue.right,
                'resourceright_id':onevalue.resourceright_id
              }
            );
          }
        }
        if (i === APIConfig.alluserrights.length - 1) {
          deferred.resolve(rights);
        }
      }
      return deferred.promise;
    };

    $scope.getResources = function () {
      var defered = $q.defer();
      if (APIConfig.resources.length === 0) {
        api.service('resources').get().then(function (result) {
          $scope.resources = result._embedded.resources;
          resourceTitleIndex();
          APIConfig.resources = $scope.resources;
          defered.resolve(APIConfig.resources);
        });
      } else {
        $scope.resources = APIConfig.resources;
        defered.resolve(APIConfig.resources);
      }
      return  defered.promise;
    };
    $scope.getRoles = function () {
      var defered = $q.defer();

      if (!$cookies.getObject('roles') && APIConfig.roles.length === 0) {
        api.service('roles').get().then(function (result) {
          $scope.roles = result._embedded.roles;
          APIConfig.roles = $scope.roles;
          $cookies.putObject('roles', $scope.roles);
          defered.resolve($scope.roles);
        });
      } else {
        if (APIConfig.roles.length !== 0) {
          $scope.roles = APIConfig.roles;
          defered.resolve($scope.roles);
        } else {
          $scope.roles = $cookies.getObject('roles');
          defered.resolve($scope.roles);
        }
      }
      return defered.promise;
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

    $scope.setResourceRights = function (resourcevalue,rolevalue) {

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
    };
    $scope.getAllData = function () {
      var  rolpromise = $scope.getRoles();
      var respromise = $scope.getResources();

      $q.all([rolpromise,respromise]).then(function (resprmises) {
        if (APIConfig.alluserrights.length === 0) {
          var userrightpromise = fac.getAllRightsData();
        }
        if (!$scope.resource_right) {
          var resrightpromiuse = fac.getAllResourceRight();
        }

        $q.all([userrightpromise, resrightpromiuse]).then(function (resprmises) {

          $scope.alluserrights = resprmises[0];
          $scope.resource_right = resprmises[1];

          $scope.setResourceRights($scope.resources, $scope.roles);
        });
      });
    };

    $scope.$watch(function () {
      return $('.table tr').length;
    }, function (newVal,oldVal) {

      $('.selectpicker').selectpicker();
      if(newVal>1){
        $scope.getAllData();
      }
    });
    $scope.saveOrUpdateResourceRights = function () {
      if($scope.user.role_id==1)
      angular.forEach($scope.resources, function (resourcevalue) {
        angular.forEach($scope.roles, function (rolevalue) {
          var path = '#resourceid_' + resourcevalue.resource_id + '_roleid_' + rolevalue.role_id;

          if ($scope.rosourcerights[path]) {
              var resourceid = resourcevalue.resource_id;
              var roleid = rolevalue.role_id;
            angular.forEach($(path).val(), function (rightid) {
              if($scope.alluserrightsIndexed['role_id_'+roleid+'_resource_id_'+resourceid+'_right_id_'+rightid]){
               //exist
              }else{

                if(!$scope.alluserrightsIndexed['role_id_'+roleid+'_resource_id_'+resourceid+'_right_id_'+rightid]){

                  //this right has to be added
                  var resourcerightdata = {
                    'resource_id': parseInt(resourceid),
                    'right_id': parseInt(rightid),
                    'mid': parseInt($scope.user.mandatid)
                  };
                  api.service('resource_right').data(resourcerightdata).save().then(function (result) {
                    var roleresourcerightdata = {
                      'role_id': parseInt(rolevalue.role_id),
                      'resourceright_id': parseInt(result.id),
                      'mid': parseInt($scope.user.mandatid)
                    };
                    api.service('role_resourceright').data(roleresourcerightdata).save().then(function (result) {
                    });
                  });
                }
              }
            });
            angular.forEach($scope.rosourcerights[path], function (rightid) {
              if(rightid!== $(path).val()[0] && rightid!== $(path).val()[1]
                && rightid!== $(path).val()[2] && rightid!== $(path).val()[3]){
                var resourceright_id =$scope.alluserrightsIndexed['role_id_'+roleid+'_resource_id_'+resourceid+'_right_id_'+rightid].resourceright_id;
                api.service('resource_right').id(resourceright_id).delete().then(function (result) {

                });
              }
            });
          } else {

            if ($(path).val() && $(path).val().length > 0) {
              angular.forEach($(path).val(), function (rightid) {
                var resourcerightdata = {
                  'resource_id': parseInt(resourcevalue.resource_id),
                  'right_id': parseInt(rightid),
                  'mid': parseInt($scope.user.mandatid)
                };
                api.service('resource_right').data(resourcerightdata).save().then(function (result) {
                  var roleresourcerightdata = {
                    'role_id': parseInt(rolevalue.role_id),
                    'resourceright_id': parseInt(result.id),
                    'mid': parseInt($scope.user.mandatid)
                  };
                  api.service('role_resourceright').data(roleresourcerightdata).save().then(function (result) {
                  });
                });
              });
            }
          }
        });
      });
    }
  }]);
