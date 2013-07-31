'use strict';

/* Filters */

angular.module('angularProject.filters', [])
  .filter('demoFilter', function() {
  	return function (order) {
        return order;
    }
  });
