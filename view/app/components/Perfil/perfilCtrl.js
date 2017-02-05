modControladores.controller('perfilCtrl',['$scope','$cookies','UsuariosSrv',function($scope,$cookies,UsuariosSrv){
	$scope.usuario = $cookies.get('nombre');
	$scope.nomPerfil = 'Este es tu perfil';
	
}]);