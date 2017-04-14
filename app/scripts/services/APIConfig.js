'use strict';
/*Autor David Abuladze*/

var app = angular.module('ngloginApp');

app.factory('APIConfig', ['$http', '$q', function ($http, $q) {

	var config = {

	'clientID':'auth_client',
	'url':'http://localhost:9100',
 	'access_token': '',
    'refresh_token': '',
    'userid':null,
    'code':null

	}

	return config;

}]);