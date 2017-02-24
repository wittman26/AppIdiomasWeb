/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-21
*/
modControladores.controller('perfilCtrl',['$scope','$cookies','LocalStorageSrv','UsuariosSrv',function($scope,$cookies,LocalStorageSrv,UsuariosSrv){
	// $scope.usuario = $cookies.get('nombre');
	$scope.usu_usuario = LocalStorageSrv.obtener();

	$scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/usuarios/';	
}]);