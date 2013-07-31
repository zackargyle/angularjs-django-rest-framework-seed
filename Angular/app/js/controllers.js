'use strict';

var controllersModule = angular.module('angularProject.controllers', []) 

    .controller('homeCtrl', function($scope, $http, User, Address) {

        $scope.$on('event:login-confirmed', function() {
            $scope.users = User.query();
            $scope.addresses = Address.query();
        });

});
