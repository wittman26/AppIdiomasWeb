/* NOTIFICACIONES
	Modo de empleo:
	1.  Se crea una función que recibe el mensaje del servidor(datos)
		se crea mensaje alerta que será el objeto que usará la directiva
	$scope.mensajeAlerta = null;    
    $scope.mostrarAlerta = function(datos) {
        $scope.mensajeAlerta =   [{
            tipo        : "aten",      //error,aten,ok,info
            mensaje     : datos.mensaje,
            cerrable    : false,
            demora      : 2,
        }];
    };
    2. En función error, llamar a la función
    $scope.mostrarAlerta(data);

*/
modDirectivas.directive('notificacion',[function(){
	return{
		restrict: 	'A',
		templateUrl: 	SERV + DIRE + '/notificacion.html',
        scope: {
            control: "="
        },
        link: function (scope, element) {
            // Actualiza el mensaje de alerta cada vez que el objeto es modificado.            
            scope.$watch('control', function () {
                actualizaAlerta();
            });

            // Cerrar mensaje de alerta
            scope.close = function() {
                scope.control = null;
            }
 
 			//Actualiza alerta
            function actualizaAlerta() {
                if (scope.control && scope.control[0].demora > 0) {
                    setTimeout(function () {
                        scope.control = null;           
                        scope.$apply();
                    }, scope.control[0].demora * 1000);
                }
            }
        }

	}

}]);

modDirectivas.directive('campo',[function(){
	return{
		restrict: 		'A',
		templateUrl: 	function(elem, attr){
				return SERV + DIRE + '/input_'+attr.campo+'.html';
			},
		scope: 	{
			control: "=",
			modelo: "=",
			etiqueta: "=",
			nombre: "=",
			ayuda:"="
		}
	}
}]);