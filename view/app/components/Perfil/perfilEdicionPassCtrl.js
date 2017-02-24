/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-21
*/
modControladores.controller('perfilEdicionPassCtrl',['$scope','$cookies','LocalStorageSrv','UsuariosSrv',function($scope,$cookies,LocalStorageSrv,UsuariosSrv){

	$scope.usu_usuario = LocalStorageSrv.obtener();

    // Controles para directivas (input_texto)
    $scope.controles = {
				'contrasena':
				{ 
					"requerido": 	true,
					"tipo": 		"password"
				},
				'contrasena2':
				{ 
					"requerido": 	true,
					"tipo": 		"password"
				}			
			};
	// Modelo para directivas (input_texto) donde contiene los datos
    $scope.modelo = {
		'usu_clave'		:'',
		'usu_clave2' 		:''
	};

	$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';	
}]);