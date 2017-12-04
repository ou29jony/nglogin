"use strict" ;
var app = angular.module('ngloginApp');

app.service('APIFactory', ['APIService','APIConfig','$q','$filter',
	function APIFactoryProvider(APIService,APIConfig,$q,$filter) {

		var self = {};
		var api = APIService;

		self.setCookie =  function (cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		};

		self.getCookie =	function (cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		};

    self.getAllRightsData = function () {
      var deferred = $q.defer();
      api.service('role_resourceright').get().then(function (result) {
        APIConfig.alluserrights = result._embedded.role_resourceright;
        angular.forEach(result._embedded.role_resourceright,function (value) {
          APIConfig.alluserrightsIndexed['role_id_'+value.role_id+'_resource_id_'+value.resource_id+'_right_id_'+value.right_id] = value;
        });
        console.log(APIConfig.alluserrightsIndexed);
        deferred.resolve(APIConfig.alluserrights);
      });
      return deferred.promise;
    };
    self.getAllResourceRight = function () {
      var deferred = $q.defer();
      api.service('resource_right').get().then(function (result) {

        APIConfig.resource_right = $filter('orderBy')(result._embedded.resource_right, 'resource_id', false);

        deferred.resolve(APIConfig.resource_right);
      });
      return deferred.promise;
    };
		return self;
	}]);
