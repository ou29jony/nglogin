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
    'mandatid':null,
    'indexedUser':[],
    'user_roles':[],
    'resources':[],
    'users':[],
    'roles':[],
    'alluserrights':[],
    'alluserrightsIndexed':[],
    'resource_right':null,
    'user':null,
    'code':null,
    'mailsendshowpage':undefined,
    'history':[],
    'account':{'gender':'Herr'},
    'b2c_emails':[],

      'loginApiUrl':'https://login-api.hptf.de'

	};

	return config;

}]);
