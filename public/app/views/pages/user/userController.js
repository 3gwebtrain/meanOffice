(function(){

	"use strict";

	angular.module('meanOffice.controllers')
			.controller('userController', function( userData ){

				var user = this;

				user.userData = userData;

			})

})();