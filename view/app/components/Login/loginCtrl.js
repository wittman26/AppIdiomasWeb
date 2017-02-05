/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-13
*/
modControladores.controller('loginCtrl', ['$scope','$state','UsuariosSrv','FacebookSrv',
	function($scope,$state,UsuariosSrv,FacebookSrv){	

	$scope.datosUsuario = {};
	$scope.prueba = 'Controlador de Login!';
	console.log('Valor retornado: ' + JSON.stringify(UsuariosSrv));
	$scope.serviciousu = FacebookSrv.probando();

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
    	console.log('State: ' + JSON.stringify($state.get()));
    	console.log('Current: ' + JSON.stringify($state.current));
    	$scope.datosUsuario.nombre = $scope.username;
    	$scope.datosUsuario.pais = 'Colombia';
    	
        UsuariosSrv.login($scope.datosUsuario,PAGDESTINO);

    };

    $scope.entrarFace = function(){
    	console.log("Entra con facebook");
    	FacebookSrv.login();
    	console.log('Objeto' + FacebookSrv.objFacebook);
    }


}]);