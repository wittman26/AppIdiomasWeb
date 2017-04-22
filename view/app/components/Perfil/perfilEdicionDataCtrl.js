/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-21
*/
modControladores.controller('perfilEdicionDataCtrl',['$scope','$cookies','LlamadoHttpSrv','LocalStorageSrv','UsuariosSrv','$state',function($scope,$cookies,LlamadoHttpSrv,LocalStorageSrv,UsuariosSrv,$state){

	$scope.usu_usuario = {};
	// Llamado a servicio
	$scope.cargarDatosUsuario = function(){
		// Detalles de la cabecera HTTP
		$scope.servicio = '/usuarios/obtenerusuario';	
		cabPeticion = {
				'method':			'GET',
				'url':				REST + $scope.servicio,
				'authorization': 	$cookies.get('idsesion') //Se envía clave para adicionar a headers
		};

		// Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
		var funExito = function(data, status, headers, config, statusText) {
				// $scope.categoriasBD = data;
				$scope.usu_usuario = data;
				console.log("Cargando datos: "+$scope.usu_usuario);
				
				// Modelo para directivas (input_texto) donde contiene los datos
			    $scope.modelo = {
					'usu_nombre'		: $scope.usu_usuario.usu_nombre,
					'usu_correo' 		: $scope.usu_usuario.usu_correo,
					'usu_imagen' 		: $scope.usu_usuario.usu_imagen,
				};

				// $scope.usu_usuario = LocalStorageSrv.obtener();

				$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';		
				if($scope.usu_usuario.usu_imagen)
					$scope.imagen2 = $scope.ruta + $scope.usu_usuario.usu_imagen;
				else
					$scope.imagen2 = $scope.ruta + 'avatar.png';
			};

		// Función de error: Muestra los detalles del error
		var funError = function(data, status, headers, config, statusText){
			console.log('Error status='+status);
			console.log(JSON.stringify(data));
		}

		// Llamado al servicio de http para llamado del backEnd (servicios REST)
		LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);		
	}

	$scope.actualizarDatosUsuario = function(){

		// Detalles de la cabecera HTTP
		$scope.servicio = '/usuarios/actualizar';	
		cabPeticion = {
				'method':			'PUT',
				'url':				REST + $scope.servicio,
				'data': 			$scope.modelo,
				'authorization': 	$cookies.get('idsesion') //Se envía clave para adicionar a headers
		};

		// Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
		var funExito = function(data, status, headers, config, statusText) {
				// $scope.categoriasBD = data;
				// LocalStorageSrv.clean();
				// console.log("Actualizando!");

				// if($scope.modelo.usu_imagen!=$scope.usu_usuario.usu_nombre+'.jpg')
				// 	$scope.modelo.usu_imagen = $scope.usu_usuario.usu_nombre+'.jpg';				

				// LocalStorageSrv.guardar($scope.modelo);

				console.log(JSON.stringify(data));
			};

		// Función de error: Muestra los detalles del error
		var funError = function(data, status, headers, config, statusText){
			console.log('Error status='+status);
			console.log(JSON.stringify(data));
		}

		// Llamado al servicio de http para llamado del backEnd (servicios REST)
		LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);		
	}	

	$scope.cargarDatosUsuario();


    // Controles para directivas (input_texto)
    $scope.controles = {
				'nombre':
				{ 
					"requerido": 	true,
					"tipo": 		"text",
					"inhabilitado":	true
				},
				'email':
				{ 
					"requerido": 	true,
					"tipo": 		"email"
				}			
			};


	$scope.cambiarImagen = function(element){

	 // Leer Archivos
	 // https://www.html5rocks.com/es/tutorials/file/dndfiles/
	 // http://jsfiddle.net/LvsYc/
		if(element.files && element.files[0]){

			var reader = new FileReader();

			reader.onload = function (e) {
				$scope.$apply(function(scope) {
					$scope.imagen2 = e.target.result;
					$scope.modelo.usu_imagen = $scope.imagen2;
				});
			}

			reader.readAsDataURL(element.files[0]);
			console.log("Entró a cambiar imagen: " + element.files[0]);
			console.log("imagen2: " + $scope.imagen2);
			
		}
	    
	}

	$scope.actualizar = function() {
		// for(var t in $scope.modelo)
		// 	console.log(t + ": " + $scope.modelo[t]);
		console.log("Entró a actualizar");
		$scope.actualizarDatosUsuario();		
		
		LocalStorageSrv.clean();
		console.log("Actualizando!");


		LocalStorageSrv.guardar($scope.modelo);		

		$scope.modelo.usu_imagen = 'wittman.jpg';

		// $scope.cargarDatosUsuario();	

		$scope.imagen2 = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/' + 'wittman.jpg';			

		  $state.reload();


				// $scope.$apply(function(){
				// 	// $scope.imagen2 = "";
				// 	// $scope.imagen2 = $scope.modelo.usu_imagen;
				// 	console.log("Entró a recarga");
				// });					
	}

	
}]);