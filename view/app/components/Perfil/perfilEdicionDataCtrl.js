/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-21
*/
modControladores.controller('perfilEdicionDataCtrl',['$scope','$cookies','LocalStorageSrv','UsuariosSrv',function($scope,$cookies,LocalStorageSrv,UsuariosSrv){

	$scope.usu_usuario = LocalStorageSrv.obtener();
	$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';		

	$scope.imagen2 = $scope.ruta + $scope.usu_usuario.usu_imagen;

    // Controles para directivas (input_texto)
    $scope.controles = {
				'nombre':
				{ 
					"requerido": 	true,
					"tipo": 		"text"
				},
				'email':
				{ 
					"requerido": 	true,
					"tipo": 		"email"
				}			
			};
	// Modelo para directivas (input_texto) donde contiene los datos
    $scope.modelo = {
		'usu_nombre'		:'',
		'usu_correo' 		:''
	};

	$scope.cambiar = function(){
		console.log("Cambia foto: " + $scope.imagen2);
	}

	$scope.cambiarImagen = function(element){
		console.log("Cambia foto!: " + $scope.imagen2);
	    
	    $scope.$apply(function(scope) {
	      console.log('files:', element.files);
	      // Turn the FileList object into an Array
	        scope.files = []
	        for (var i = 0; i < element.files.length; i++) {
	          scope.files.push(element.files[i])
	        }
	      console.log(scope.files);
	      scope.progressVisible = false;
	      /* Nombre de archivo */
	      console.log(scope.files[0].name);
	      $scope.imagen2 = $scope.ruta + scope.files[0].name;
	     });
	    
	}	

	
}]);