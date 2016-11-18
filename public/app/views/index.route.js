(function(){

	"use strict";

	angular.module('meanOffice')
		.config(routeConfig)
		.config(['$httpProvider', function($httpProvider){
			$httpProvider.interceptors.push('authInterceptor')
		}])
		.run(stateController)



	function routeConfig( $locationProvider, $stateProvider, $urlRouterProvider ){

		$stateProvider
			.state('login', {
				url:'/',
				templateUrl : 'app/views/pages/login/login.html',
				controller	: 'mainController as main'
			})
			.state('users', {
				url:'/users',
				templateUrl : 'app/views/pages/users/users.html',
				controller	: 'usersController as users',
				required	: true,
				resolve		: {
					usersData : function( $q, api ){

						var differed = $q.defer();

						api.getUsers().then(function( data ){
							differed.resolve( data.data );
						});

						return differed.promise;

					}
				}
			})
			.state('user', {
				url:'/user/:userId',
				templateUrl : 'app/views/pages/user/user.html',
				controller	: 'userController as user',
				required	: true,
				resolve		: {
					userData : function( $q, api, $stateParams ){

						var userId = $stateParams.userId;

						var differed = $q.defer();

						api.getUser( userId ).then(function( data ){
							differed.resolve( data.data );
						});

						return differed.promise;

					}
				}
			})


      	$urlRouterProvider.otherwise('/');

	}


	function stateController( $rootScope, auth, authToken, $state ){

		 $rootScope.$on("$stateChangeStart", function( event, toState ){

		 	var isLoggedIn = auth.isLoggedIn();

		 	if(  !isLoggedIn && toState.required ) {
		 		$state.go('login'); 
		 		event.preventDefault(); //must to presence
		 	}

		 })

	}

})();