'use strict';

/* Directives */

angular.module('angularProject.directives', ['http-auth-interceptor'])
	.directive('authApplication', function($cookieStore, $http, $rootScope) {
 		return {
 			restrict: 'A',
    		link: function (scope, elem, attrs) {

    		  var main = document.getElementById("main");
    		  var login = document.getElementById("login-holder");

    		  var applyLogin = function(good) {
    		  	if (good) {
	    		  	main.style.display = "block";
	        		login.style.display = "none";
	        	} else {
	        		main.style.display = "none";
	        		login.style.display = "block";
	        	}
    		  }

          scope.$on('event:auth-loginRequired', function () {
            applyLogin(false)
          });

          scope.$on('event:auth-loginConfirmed', function () {
            applyLogin(true);
          });

    		}
 		}
 	})
 	.directive('login', function($http, $cookieStore, authService) {
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
 			link: function(scope, elem, attrs) {

 				elem.bind('submit', function() {

					var user_data = {
		                "username": scope.username,
		                "password": scope.password,
		            };
					
					//$http.post(constants.serverAddress + "api-token-auth", user_data)
		            $http.post("http://localhost:8001/api-token-auth/", user_data)
		                .success(function(response) {
		                	$cookieStore.put('djangotoken', response.token);
		                    $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
		                    authService.loginConfirmed();
		            }); 

 				});

 			}
 		}
 	});
