/*
	autor: Wittman Gutiérrez
	fecha: 2017-02-09
*/
modControladores.controller('barraLateralCtrl',['$scope','LlamadoHttpSrv',function($scope,LlamadoHttpSrv){

	$scope.categoriasBD = {};

	$scope.llamarServicio = function(){
		// Detalles de la cabecera HTTP
		$scope.servicio = '/categorias';	
		cabPeticion = {
				'method':	'GET',
				'url':		REST + $scope.servicio
		};

		// Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
		var funExito = function(data, status, headers, config, statusText) {
				$scope.categoriasBD = data;
			};

		// Función de error: Muestra los detalles del error
		var funError = function(data, status, headers, config, statusText){
			console.log('Error status='+status);
			console.log(JSON.stringify(data));
		}

		// Llamado al servicio de http para llamado del backEnd (servicios REST)
		LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);		
	}

	$scope.llamarServicio();	


}]);