/*
autor: Wittman Gutiérrez
fecha: 2016-12-13
*/


//Para almacenar en local storage con angular
//http://www.aprende-facilmente.com/angular-js/como-utilizar-ngstorage-en-angularjs/
var app = angular.module('appPrincipal', []);


app.controller('controladorPrincipal', ['$scope','$http',
								 function($scope,$http){
	$scope.resu = 'No ha hecho click';	
	console.log($scope.resu);
	
	$scope.cambiar = function(){
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

	$scope.iniciarValores();	

	console.log('JSON recibido'+JSON.stringify($scope.ContactosBD));

}]);