(function(){

	"use strict";

	angular.module('meanOffice.factories')
		.factory('authToken', function( $window ){

			var authToken = {};

			authToken.getToken = function(){

				return $window.localStorage.getItem('token');

			}

			authToken.setToken = function( token ){

				if( token )
					$window.localStorage.setItem('token', token);
				else
					$window.localStorage.removeItem('token');
				
			}

			return authToken;

		})

})();