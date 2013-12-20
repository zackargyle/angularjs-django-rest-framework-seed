'use strict';

angular.module('angularProject', ['ui.bootstrap']);


// Declare app module and Appendages
angular.module('angularProject', ['angularProject.filters', 'angularProject.services', 'angularProject.directives', 'angularProject.controllers', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
      	title: 'Home',
      	templateUrl: 'partials/home.html',
      	controller: 'homeCtrl'
      })
      .otherwise({redirectTo: '/home'});
  }])
  .run(function($cookieStore, $rootScope, $http) {
  	if ($cookieStore.get('djangotoken')) {
      $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
      document.getElementById("main").style.display = "block";
    } else {
    	document.getElementById("login-holder").style.display = "block";
    }
  });