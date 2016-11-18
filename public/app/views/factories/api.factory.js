(function(){
	"use strict";

	angular.module('meanOffice.factories')
		.factory('api', function( $http ){

			var api = {};

			api.getUsers = function(){

				return $http.get('/api/users')
						.success(function( users ) {
							return users;
						});

			}

			api.getUser = function( id ){

				return $http.get('/api/user/'+id)
						.success(function( users ) {
							return users;
						});

			}

			return api;

		})
})();