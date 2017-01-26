modControladores.controller('perfilCtrl',['$scope','$cookies','UsuariosSrv',function($scope,$cookies,UsuariosSrv){
	$scope.usuario = $cookies.get('username');
	$scope.nomPerfil = 'Este es el perfil';

    $scope.salir = function()
    {
        UsuariosSrv.logout();
    }		
}]);