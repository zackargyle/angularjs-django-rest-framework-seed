'use strict';

/* Directives */

angular.module('angularProject.directives', [])
 	.directive('login', function($http, $rootScope) {
 		return {
 			restrict: 'A',
 			template: " <form> " +
     					    "<label>Username</label>" +
      						"<input type='text' ng-model='username'>" +
      						"<label>Password</label>" +
      						"<input type='password' ng-model='password'>" +
      						"<br>" +
      						"<input type='submit'>" +
    					"</form>",
    		scope: {
    			username:'&',
    			password:'&'
    		},
 			link: function(scope, elem, attrs) {

 				elem.bind('submit', function() {

					var user_data = {
		                "username": scope.username,
		                "password": scope.password,
		            };
					
					//$http.post(constants.serverAddress + "api-token-auth", user_data)
		            $http.post("http://localhost:8001/api-token-auth/", user_data)
		                .success(function(response) {
		                    $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
		                    $rootScope.$broadcast('event:login-confirmed');
		                    elem.slideUp();
		            }); 

 				});

 			}
 		}
 	});
