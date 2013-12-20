'use strict';

var controllersModule = angular.module('angularProject.controllers', []) 

    .controller('homeCtrl', function($scope, User, Address) {

      $scope.users = User.query();
      $scope.addresses = Address.query();

});
