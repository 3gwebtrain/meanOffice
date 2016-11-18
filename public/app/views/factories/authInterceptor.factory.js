(function(){

	"use strict";

	angular.module('meanOffice.factories')
		.factory('authInterceptor', function( $q, $location, authToken ){

			var authInterceptor = {};

				authInterceptor.request = function( config ) {

					var token = authToken.getToken();

					if( token ) {
						config.headers['x-access-token'] = token;
					} 

					return config;

				}

				authInterceptor.responseError = function( response ) {

					if( response.status == 403 ){
						authToken.setToken();
						$location.path('/');
					}

					return $q.reject(response);

				}


			return authInterceptor;

		})


})();