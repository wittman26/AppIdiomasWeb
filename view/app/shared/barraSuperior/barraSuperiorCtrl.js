/*
	autor: Wittman Gutiérrez
	fecha: 2017-02-01
*/
modControladores.controller('barraSuperiorCtrl', ['$scope','$state','$http','$filter','$translate','$cookies','LocalStorageSrv','UsuariosSrv',
				function($scope,$state,$http,$filter,$translate,$cookies,LocalStorageSrv,UsuariosSrv){

	$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';

    $scope.salir = function()
    {
        UsuariosSrv.logout();
    }

	$scope.cambiaridioma = function(idioma){
		$translate.use(idioma);
	}    
	
	$scope.usu_usuario = LocalStorageSrv.obtener();

	// Si el usuario no tiene imagen, se le asigna la del avatar
	if($scope.usu_usuario.usu_imagen===''){
		$scope.usu_usuario.usu_imagen = 'avatar.png';
	}
	// $scope.usuario = $cookies.get('usu_nombre');
	// $scope.probando = $cookies.get('datosUsu');
}]);