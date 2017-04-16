'use strict';
/*Autor David Abuladze*/

var app = angular.module('ngloginApp');

app.factory('APIConfig', ['$http', '$q', function ($http, $q) {

	var config = {

	'clientID':'auth_client',
	'url':'',
 	'access_token': '',
    'refresh_token': '',
    'userid':null,
    'code':null,
    'account':{},
    'b2c_emails':[]

	}

	return config;

}]);