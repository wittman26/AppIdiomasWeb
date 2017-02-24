/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-13
*/
modControladores.controller('registroCtrl', ['$scope','LlamadoHttpSrv','FacebookSrv', function($scope,LlamadoHttpSrv,FacebookSrv){	
	$scope.prueba = 'Controlador de Registro!';
	console.log('Imprimiendo prueba:' + $scope.prueba);

    $scope.datosUsuario = {};

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
				},
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
		'usu_nombre'		:'',
		'usu_correo' 		:'',
		'usu_clave' 	:'',
		'usu_clave2'	:''
	};

    // 2. Entrar como usuario de facebook
    $scope.entrarFace = function(){
        console.log("Entra con facebook");
        FacebookSrv.login();
    }

	// Datos de notificación (error, información o warning)
    $scope.mensajeAlerta = null;
    $scope.mostrarAlerta = function(datos,tipo) {
        $scope.mensajeAlerta =   [{
            tipo        : tipo,      //error,aten,ok,info
            mensaje     : datos.mensaje,
            cerrable    : false,
            demora      : 4,
        }];
    };

    // Resgitrar nuevo usuario
    $scope.registrar = function()
    {	
    	if($scope.modelo.usu_clave===$scope.modelo.usu_clave2){
    		console.log("Llama a servicio: ");
    		
			$scope.datosUsuario.usu_nombre = $scope.modelo.usu_nombre;
			$scope.datosUsuario.usu_correo = $scope.modelo.usu_correo;
			$scope.datosUsuario.usu_clave  = $scope.modelo.usu_clave;

    		// En registro la imagen inicial es nulo
            $scope.datosUsuario.usu_imagen = "";
        	$scope.llamarServicio($scope.datosUsuario);
    	}
    };    

    $scope.llamarServicio = function($datosUsuario){

        console.log("Datos recibidos" + JSON.stringify($datosUsuario));
        
        // Detalles de la cabecera HTTTP
        $scope.servicio = '/usuarios/registro';    
        cabPeticion = {
                'method':   'POST',
                'url':      REST + $scope.servicio,
                'data':     $datosUsuario
        };

        // Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
        var funExito = function(data, status, headers, config, statusText) {                
                console.log("Datos de éxito" + JSON.stringify(data));
                $scope.mostrarAlerta(data,'info');
            };

        // Función de error: Muestra los detalles del error
        var funError = function(data, status, headers, config, statusText){
            // notifSrv.popup(status);            
            $scope.mostrarAlerta(data,'aten');

            console.log('Error status='+status);
            console.log(JSON.stringify(data));
        }

        // Llamado al servicio de http para llamado del backEnd (servicios REST)
        LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);
    }     

		
}]);