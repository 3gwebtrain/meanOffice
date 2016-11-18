(function(){

	"use strict";

	angular.module('meanOffice.controllers')
		.controller('mainController', function( $rootScope, $scope, $location, auth ){

			var vm = this;

			vm.loggedIn = auth.isLoggedIn();

			$rootScope.$on('$stateChangeStart', function(){

				vm.loggedIn = auth.isLoggedIn();

				if( vm.loggedIn )

					auth.getUser()
						.success(function(data){
							vm.user = data;
						})

			});

			vm.doLogin = function(){

				auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data){
					$location.path('/users');
				})

			}

			vm.doLogout = function(){
				auth.logout();
				vm.user = {};
				$location.path('/');

			}

		})

})();