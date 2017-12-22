'use strict';

var app = angular
  .module('ngloginApp');

app.directive('lyHeader', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/layouts/header.html'
  };
});
