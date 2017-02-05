/*
	autor: Wittman Gutiérrez
	fecha: 2017-02-01
*/
modControladores.controller('barraSuperiorCtrl', ['$scope','$state','$http','$filter','$translate','$cookies','UsuariosSrv',
				function($scope,$state,$http,$filter,$translate,$cookies,UsuariosSrv){

    $scope.salir = function()
    {
        UsuariosSrv.logout();
    }

	$scope.cambiaridioma = function(idioma){
		console.log('Entró a cambiar carajo!' + idioma);
		$scope.resu = 'Cambió el idioma pué'
		$translate.use(idioma);
	}    
	
	$scope.usuario = $cookies.get('nombre');
	$scope.probando = $cookies.get('datosUsu');
	console.log('Datos de usuario: ' + JSON.stringify($scope.probando));

}]);