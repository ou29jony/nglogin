'use strict';
/* Autor David Abuladze */

var app = angular.module('ngloginApp');

app.service('APIService', ['$rootScope', '$resource', '$q', '$http','APIConfig','$location',
	function APIServiceProvider($rootScope, $resource, $q, $http,APIConfig,$location) {

		var self = this;
		var service = '';
		var filter = {};
		var data = {};
		var tableid = ':id';


		self.setAuth = function (data) {

			$rootScope.oauth = data;


			if ($rootScope.oauth.access_token) {

				var login = $rootScope.oauth;
				$http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.oauth.access_token;
				self.refresh_token = login.refresh_token;
			}
		};

		self.getResource = function () {

		  if(APIConfig.url!=APIConfig.loginApiUrl ){

       //APIConfig.url = APIConfig.loginApiUrl;
      }

			!tableid ? tableid = ':id' : null;

			var loginApiUrl = APIConfig.url;

			return  $resource(
				loginApiUrl + '/' + service + '/' + tableid,

				filter,
				{
					'get':    {method: 'GET', isArray: false},
					'save':   {method: 'POST', headers: {'Content-Type': 'application/json'},withCredentials : true},
					'put': 	  {method: 'PUT', headers: {'Content-Type': 'application/json'}},
					'update': {method: 'PATCH', headers: {'Content-Type': 'application/json'}},
					'delete': {method: 'DELETE', isArray: false}
				},
				{isArray: false}
				);
		};

		self.service = function (name) {

			service = name;
			return self;
		};

		self.filter = function (name) {
			filter = name;
			return self;
		};
		self.id = function (id) {

			tableid = id;
			return self;
		};
		self.data = function (datalocal) {
			data = datalocal;
			return self;
		};
		self.clearAll = function () {

			self.service('');
			self.id(':id');
			self.filter({});
			self.data({});
		};
		self.get = function () {


			var deferred = $q.defer();
			var res = this.getResource();
			res.get(function (response) {
				deferred.resolve(response);
			}, function (reject) {
				deferred.reject(reject);
			});
			self.clearAll();
			return deferred.promise;
		};
		self.update = function () {

			var deferred = $q.defer();
			var res = this.getResource();

			res.update(data, function (response) {
				deferred.resolve(response);
			}, function (reject) {
				deferred.reject(reject);
			});
			self.clearAll();
			return deferred.promise;
		};

		self.save = function () {

			var deferred = $q.defer();
			var res = this.getResource();

			res.save(data, function (response) {
				deferred.resolve(response);
			}, function (reject) {
				deferred.reject(reject);
			});
			self.clearAll();
			return deferred.promise;
		};
		self.delete = function () {

			var deferred = $q.defer();
			var res = this.getResource();

			res.delete(function (response) {
				deferred.resolve(response);
			}, function (reject) {

				deferred.reject(reject);

			});
			self.clearAll();
			return deferred.promise;

		};
		self.put = function () {

			var deferred = $q.defer();
			var res = this.getResource();

			res.put(data, function (response) {

				deferred.resolve(response);

			}, function (reject) {
				deferred.reject(reject);
			});
			self.clearAll();
			return deferred.promise;
		};
	}]);
