'use strict';
/*Autor David Abuladze*/

var app = angular.module('ngloginApp');

app.factory('APIConfig', [ function () {

	var config = {

	'clientID':'auth_client',
	'url':'',
    'url_local':'',
 	'access_token': '',
    'refresh_token': '',
    'userid':null,
    'resources':null,
    'roles':null,
    'user':null,
    'code':null,
    'mailsendshowpage':undefined,
    'history':[],
    'account':{'gender':'Herr'},
    'b2c_emails':[]

	};

	return config;

}]);
