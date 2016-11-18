(function(){

	"use strict";

	angular.module('meanOffice.factories')
		.factory('auth', function( $http, $q, authToken ){

			var auth = {};
			
			auth.login = function( username, password ){

				return $http.post('/api/authenticate',{
					username : username,
					password : password
				}).success(function(data){
					authToken.setToken(data.token);
					return data;
				})

			}

			auth.logout = function(){
				
				authToken.setToken();
			}

			auth.isLoggedIn = function(){

				if(authToken.getToken())
					return true;
				else
					return false;
			}

			auth.getUser = function(){

				if(authToken.getToken()){
					return $http.get('/api/me');
				}else {
					return $q.reject({message:'User has no token'});
				}
			}

			return auth;

		})

})();