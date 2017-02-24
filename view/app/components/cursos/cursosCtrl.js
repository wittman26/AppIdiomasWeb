/*
	autor: Wittman Gutiérrez
	fecha: 2017-02-08
*/
modControladores.controller('cursosCtrl',['$scope','LlamadoHttpSrv',function($scope,LlamadoHttpSrv){

	$scope.cursosBD = {};	

	$scope.llamarServicio = function(){
		// Detalles de la cabecera HTTP
		$scope.servicio = '/cursos';	
		cabPeticion = {
				'method':	'GET',
				'url':		REST + $scope.servicio
		};

		$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/cursos/';
		$scope.cursoAvatar = 'cursoavatar.svg'

		// Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
		var funExito = function(data, status, headers, config, statusText) {
				$scope.cursosBD = data;
			};

		// Función de error: Muestra los detalles del error
		var funError = function(data, status, headers, config, statusText){
			// notifSrv.popup(status);
			console.log('Error status='+status);
			console.log(JSON.stringify(data));
		}

		// Llamado al servicio de http para llamado del backEnd (servicios REST)
		LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);
	}

	$scope.llamarServicio();	

}]);

