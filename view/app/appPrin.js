/*
	autor: Wittman Gutiérrez
	fecha: 2016-12-13
*/

var modPrincipal = angular.module('modPrincipal', ['ui.router','pascalprecht.translate','ngCookies','LocalStorageModule','modControladores','modServicios','modDirectivas']);

// Configuración de URLS para SPA
modPrincipal.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/inicio");

	/* ESTADOS_URLS: Viene de general.js*/

	for (llaveEstado in ESTADOS_URLS) {
		//https://api.jquery.com/jquery.extend/
		//var contenido = $.extend(true, {}, ESTADOS_URLS[llaveEstado]);
		console.log(JSON.stringify(llaveEstado));
		$stateProvider.state(llaveEstado, ESTADOS_URLS[llaveEstado]);
	}	
}]);

// Configuración de módulo Multilenguaje
modPrincipal.config(['$translateProvider', function ($translateProvider) {
	$translateProvider
	.useStaticFilesLoader({
		prefix: 'assets/multilenguaje/textos-',
		suffix: '.json'
	})	
	.preferredLanguage(IDIOMA) //lenguaje predeterminado
	.useSanitizeValueStrategy('escape'); //Para evitar problemas de seguridad http://angular-translate.github.io/docs/#/guide/19_security
}]);


// Configuración Global para datos de sesión
modPrincipal.run(['$rootScope','$state','$window','UsuariosSrv',
  function($rootScope,$state,$window,UsuariosSrv) {

  	$rootScope.logVisible = LOGVISIBLE;
  	$rootScope.menLateralVisible = MENLATVISIBLE;
	
	//Configuración de cambio de rutas
	$rootScope.$on('$stateChangeStart', function(event, toState,fromState)
	{
	    // Se llama a checkEstado, definido en la factoria UsuariosSrv
	    // inyectada en la acción run de la aplicación	
		UsuariosSrv.checkEstado(event,toState);
		$rootScope.logVisible = LOGVISIBLE;
		$rootScope.menLateralVisible = MENLATVISIBLE;
	});

	// Configuración API de facebook
  $rootScope.user = {};

	// Executed when the SDK is loaded
	window.fbAsyncInit = function() {		 
		FB.init({
			appId       : '1277266832330917',	//Id application
			status		: true,		// Set if you want to check the authentication status
			cookie      : true,  	// enable cookies to allow the server to access the session							
			xfbml      	: true,  	// parse social plugins on this page
			version    	: 'v2.8' 	// use graph api version 2.8
		});

	};

	// Load the SDK asynchronously
	(function(doc, scr, id){
		 var js, ref = doc.getElementsByTagName(scr)[0];
		 
		 if (doc.getElementById(id)) {
		 	return;
		 }

		 js = doc.createElement(scr);
		 js.id = id;
		 //js.src = "//connect.facebook.net/en_US/sdk.js"; //Carga en inglés
		 js.src = "//connect.facebook.net/es_LA/sdk.js";

		 ref.parentNode.insertBefore(js, ref);
	}(document, 'script', 'facebook-jssdk'));

}]);


