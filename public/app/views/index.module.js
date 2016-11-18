(function(){

	"use strict";

	var ngModules =  ['ui.router'];

	var appModules = ['meanOffice.factories','meanOffice.controllers', 'meanOffice.directives'];

	var modules = [];

	modules = modules.concat( ngModules );
	modules = modules.concat( appModules );

	angular.module('meanOffice.factories',[]);
	angular.module('meanOffice.controllers', []);
	angular.module('meanOffice.directives', []);

	angular.module( 'meanOffice', modules );

})();