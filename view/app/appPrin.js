/*
	autor: Wittman Gutiérrez
	fecha: 2016-12-13
*/

var modPrincipal = angular.module('modPrincipal', ['ui.router','pascalprecht.translate','ngCookies','modControladores','modServicios']);

// Configuración de URLS para SPA
modPrincipal.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");

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


// Configuración API de facebook
modPrincipal.run(['$rootScope','$state', '$window','UsuariosSrv',
  function($rootScope,$state,$window,UsuariosSrv) {

  	$rootScope.visible = LOGVISIBLE;
	
	//al cambiar de rutas
	$rootScope.$on('$stateChangeStart', function(event, toState,fromState)
	{
	    //llamamos a checkStatus, el cual lo hemos definido en la factoria UsuariosSrv
	    //la cuál hemos inyectado en la acción run de la aplicación

	    console.log('En el run');

	    /*var algo = 'boo';

            if(typeof(algo) !== "undefined")
            {
                //$location.path("/login");
                console.log('usuario indefinido: ');
                // $state.go('login');
            } else {
            	console.log('por el otro lao');
            	// $state.go($state.current.name);
            }
		event.preventDefault();*/
	    // UsuariosSrv.checkStatus();

		/*var cosa = 'g';
		if (typeof(cosa) !== "undefined" && toState.name!== 'login') {
			console.log('vaya a login');
			event.preventDefault();
		    $state.go('login');
		}*/

		// event.preventDefault();
		
		UsuariosSrv.checkStatus(event,toState);
		$rootScope.visible = LOGVISIBLE;
		console.log('LLegó acá Visible?: ' + $rootScope.visible);		
	}

	/*function (event, toState, toParams, fromState, fromParams) {

		console.log('toState.name: '+toState.name);
		console.log('fromState.name: '+fromState.name);

		if(confirm("Would you like to change state?")){
			console.log('go to: '+ toState.name);
		} else {
		console.log('stay at state: '+fromState.name);
			event.preventDefault();
		//event.stopPropagation;
		}
	}*/

	)  	

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

		// sAuth.watchAuthenticationStatusChange();

		FB.getLoginStatus(function(response) {
			//statusChangeCallback(response);
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


// Probando factory
modPrincipal.factory('SrvFacebook',function($timeout, $rootScope){
    var datosFacebook = {};

        // var svc = {};
        var fbReady = false;

        function checkFB(){
        	try{       		
	            if (typeof FB===undefined){
	                fbReady = false;
	                console.log("ngFB: FB is undefined");
	                $timeout(checkFB, 250);

	            } else {
	                
	                console.log("ngFB: FB is defined");	                
	                console.log("Esto es FB" + FB);
	                fbReady = true;
             
	                $rootScope.$broadcast('ngFBReady',{});
	            }        		

        	} catch(e){
        		console.log('Se totió' + e);
        		$timeout(checkFB, 250);
        	}

        }

        datosFacebook.fbReady = function(){
            checkFB();
            return fbReady;
        }

        // return svc;


	datosFacebook.nombre = function() {
		var aux = "nada";
		if(checkFB()){
	        console.log('Welcome!  Fetching your information.... ');
	        FB.api('/me', { locale: 'en_US', fields: 'name, email,picture,gender' }, function(response) {
	          console.log('Successful login for: ' + response.name);
	          console.log('Todo el objeto: ' + JSON.stringify(response));

	          aux = response.name;
	        });			
		} else {
			checkFB();
		}

        return aux;
	}


    return datosFacebook;
});


modPrincipal.controller('controladorPrincipal', ['$scope','$state','$http','$filter','$translate','SrvFacebook',
								 function($scope,$state,$http,$filter,$translate,SrvFacebook){

	//$scope.Servicio1 = SrvFacebook.prueba;
	// $scope.Nombre1 = SrvFacebook.nombre();

   /*     $scope.$on('ngFBReady', function(e, d){
            console.log("FB defined, running init.");
            FB.init({
		      appId: 'your-app-id',
		      xfbml: true,
		      version: 'v2.1'
	      });
        })*/

     // Trigger the polling loop in the service
      // SrvFacebook.fbReady();
      //$scope.Nombre1 = SrvFacebook.nombre();


	$scope.x = 0;

	if($scope.x<1){
		$state.go('perfil');
		console.log('Despues del state');	
	} else {
		$state.go('registro');
		console.log('Despues del state en else');			
	}

/*	$scope.getMyLastName = function() {
	   facebookService.getMyLastName() 
	     .then(function(response) {
	       $scope.last_name = response.last_name;
	     }
	   );
	};								 	*/

	$scope.cambiaridioma = function(idioma){
		console.log('Entró a cambiar carajo!' + idioma);
		$scope.resu = 'Cambió el idioma pué'
		$translate.use(idioma);
	}    

	$scope.numero = 5;

	$scope.resu = 'No ha hecho click';	
	console.log($scope.resu);
	
	$scope.cambiar = function(boo){
		console.log('Entró a cambiar carajo!' + boo);
		$scope.resu = 'Ya hizo click pué!'
	}

	$scope.ContactosBD = {};

	// Datos Quemados
	$scope.datos =	
		{
			"estado": 1,
			"contactos": [
				{
					"idContacto": "1",
					"primerNombre": "Gumercindo",
					"primerApellido": "Riquísimo",
					"telefono": "3152684",
					"correo": "gumerrico@mail.com",
					"idUsuario": "2"
				},
				{
					"idContacto": "2",
					"primerNombre": "Thomas",
					"primerApellido": "Torres",
					"telefono": "3625749",
					"correo": "thomastorres@mail.com",
					"idUsuario": "2"
				}
			]
		};

	// console.log(JSON.stringify($scope.datos));
	// console.log(JSON.stringify($scope.datos.contactos));
	// console.log(JSON.stringify($scope.datos.contactos[0]));

	console.log($scope.datos.contactos.length);

	var valores = $scope.datos;
	
	$scope.columnas = {};

	if($scope.datos.contactos.length > 0) {
		// console.log('tá lleno');
		var i = 0;
		for(var aux in $scope.datos.contactos[0]){
			$scope.columnas['columna'+i] = aux;
			i += 1;
		}
	}	

    //Lee valores del Servicio
	$scope.iniciarValores = function(){

		console.log('URL: ' + SERV);
		console.log('La variable de generalPrinc: ' + PROBANDO);

		$scope.servicio = '/PHP/idiomasV2/contactos';
		peticion = {
				'method':	'GET',
				'url':		SERV + $scope.servicio
		};	
		// console.log('URL: ' + RAIZ_SRV + $scope.servicio);	

		var funcionExito = function(data, status, headers, config, statusText) {
			console.log('ha sido un éxito!');

			$scope.ContactosBD=data;

			var contactos = $scope.ContactosBD;
			
			$scope.columnasContactos = {};

			if($scope.ContactosBD.contactos.length > 0) {
				console.log('tá lleno');
				var i = 0;
				for(var aux in $scope.ContactosBD.contactos[0]){
					$scope.columnasContactos['columna'+i] = aux;
					//$scope.columnas2 = {'columna' : aux};
					i += 1;
				}
			}			

			// console.log(JSON.stringify($scope.ContactosBD));		
		};		
		
		var funcionError = function(data, status, headers, config, statusText) {
			// notifSrv.popup(status);
			console.log('Error status='+status);
			console.log(JSON.stringify(data));
		};		
		

		var coreHttpSrv = function(req0, exitoFun, errorFun) {
			var req = $.extend(true, {}, req0);
			// console.log(JSON.stringify(req0));
			// var llave = 'peticion http '+ Math.floor((Math.random() * 1000));
			req['headers'] = {
				accept: 'application/json',
				//Authorization: 'Basic '+Base64.encode('erics:bpmsuite1!')
				//authorization: 'd9fd76678489a54f49aa7f4b8ace77b0' //La clave api del usuario conectado
				authorization: 'fc8b14ea2c62fa5d4108031218cd19fe' //La clave api del usuario conectado PCLau
			};

			console.log(JSON.stringify(req));

			// var valVacio = undefined;
			// if ('valVacio' in req) {
			// 	valVacio = req['valVacio'];
			// 	delete req['valVacio'];
			// }

			// indActSrv.esperar(llave);
			$http(req).then(function successCallback(response) {
				// indActSrv.liberar(llave);
				console.log('Exitoso');
				exitoFun(response.data, response.status, response.headers, response.config, response.statusText);
			}, function errorCallback(response) {
				// if (response.status == 404 && valVacio !== undefined) {
				if (response.status == 404) {
					// indActSrv.liberar(llave);
					console.log('paila 404');
					exitoFun(valVacio, response.status, response.headers, response.config, response.statusText);
				} else {
					// indActSrv.liberar(llave);
					console.log('Otra paila');
					errorFun(response.data, response.status, response.headers, response.config, response.statusText);
				}
			});
		};

		coreHttpSrv(peticion, funcionExito, funcionError);				

	}

	// $scope.iniciarValores();	

	console.log('JSON recibido'+JSON.stringify($scope.ContactosBD));

}]);