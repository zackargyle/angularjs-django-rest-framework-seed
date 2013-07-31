'use strict';

var controllersModule = angular.module('angularProject.controllers', []) 

    .controller('homeCtrl', function($scope, $http, User, Address) {

        $scope.getToken = function() {

        	var user_data = {
                "username": $scope.username,
                "password": $scope.password,
            };

            //$http.post(constants.serverAddress + "api-token-auth", user_data)
            $http.post("http://localhost:8001/api-token-auth/", user_data, {})
             	.success(function(response) {
             		$http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
             		$scope.users = User.query();
        			$scope.addresses = Address.query();
        	});

         };

});
