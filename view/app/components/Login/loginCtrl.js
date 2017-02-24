/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-13
*/
modControladores.controller('loginCtrl', ['$scope','$state','UsuariosSrv','FacebookSrv', 'LlamadoHttpSrv',
	function($scope,$state,UsuariosSrv,FacebookSrv,LlamadoHttpSrv){	

	$scope.datosUsuario = {};
    $scope.error = false;       //Oculta mensaje de error al iniciar

	$scope.imagenUsu = SERV + '/Angular/AppIdiomas/view/assets/img/avatar.png';

    // 1. Entrar como usuario normal
    $scope.entrar = function()
    {	
    	console.log('State: ' + JSON.stringify($state.get()));
    	console.log('Current: ' + JSON.stringify($state.current));
    	
        $scope.datosUsuario.usu_nombre = $scope.usu_nombre;
        $scope.datosUsuario.usu_clave = $scope.usu_clave;
    	// $scope.datosUsuario.pais = 'Colombia';

        $scope.llamarServicio($scope.datosUsuario);    	
        // UsuariosSrv.login($scope.datosUsuario,PAGDESTINO);
    };

    // 2. Entrar como usuario de facebook
    $scope.entrarFace = function(){
    	console.log("Entra con facebook");
    	FacebookSrv.login();
    }


    $scope.llamarServicio = function($datosUsuario){

        console.log("Datos recibidos" + JSON.stringify($datosUsuario));

        // Detalles de la cabecera HTTTP
        $scope.servicio = '/usuarios/login'; 
        
        cabPeticion = {
                'method':   'POST',
                'url':      REST + $scope.servicio,
                'data':     $datosUsuario
        };

        $scope.ruta = SERV + '/Angular/AppIdiomas/view/assets/img/cursos/';

        // Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
        var funExito = function(data, status, headers, config, statusText) {
                console.log("Datos encontrados" + JSON.stringify(data));
                UsuariosSrv.login(data,PAGDESTINO);
            };

        // Función de error: Muestra los detalles del error
        var funError = function(data, status, headers, config, statusText){
            // notifSrv.popup(status);
            $scope.error = true;
            setTimeout(function () {
                $scope.error = false;
                scope.$apply();
            }, 2000); 

            console.log('Error status='+status);
            console.log(JSON.stringify(data));
        }

        // Llamado al servicio de http para llamado del backEnd (servicios REST)
        LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);
    }    


}]);