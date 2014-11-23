'use strict';

/**
 * @ngdoc overview
 * @name ergosimoApp
 * @description
 * # ergosimoApp
 *
 * Main module of the application.
 */
angular
  .module('ergosimoApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
