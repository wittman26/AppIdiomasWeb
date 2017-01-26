/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-13
*/
modControladores.controller('loginCtrl', ['$scope','$state','UsuariosSrv', function($scope,$state,UsuariosSrv){	
	$scope.prueba = 'Controlador de Login!';
	console.log('Valor retornado: ' + JSON.stringify(UsuariosSrv));
	$scope.serviciousu = UsuariosSrv.nombreUsuario;

	$scope.entrarV1 = function() {

		// here, we fake authenticating and give a fake user
		/*principal.authenticate({
		  name: 'Usuario de prueba',
		  roles: ['User']
		});*/

		if ($scope.returnToState) {
			console.log('nombre de estado: ' + $scope.returnToState.name);
			$state.go($scope.returnToState.name, $scope.returnToStateParams);
		} else {
			$state.go('perfil');
		}
	};

    $scope.entrar = function()
    {
        UsuariosSrv.login($scope.username, $scope.password);
    }	


}]);