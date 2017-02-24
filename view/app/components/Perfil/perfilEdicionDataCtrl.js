/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-21
*/
modControladores.controller('perfilEdicionDataCtrl',['$scope','$cookies','LocalStorageSrv','UsuariosSrv',function($scope,$cookies,LocalStorageSrv,UsuariosSrv){

	$scope.usu_usuario = LocalStorageSrv.obtener();

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


	$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';	
}]);