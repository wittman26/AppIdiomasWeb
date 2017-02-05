<?php

/* Inicio Codificación*/

require 'conexion/ConexionBD.php';
require 'vistas/VistaJson.php';
require 'utilidades/ExcepcionApi.php';
require 'controladores/usuarios.php';
require 'controladores/cursos.php';
require 'controladores/categorias.php';

ConexionBD::getInstancia();

// Constantes de estado
const ESTADO_URL_INCORRECTA = 2;
const ESTADO_EXISTENCIA_RECURSO = 3;
const ESTADO_METODO_NO_PERMITIDO = 4;

$vista = new VistaJson();

/* Función de excepción personalizada para
imprimir error como JSON */
set_exception_handler(function ($exception) use ($vista) {

    $cuerpo = array(
        "estado" => $exception->estado,
        "mensaje" => $exception->getMessage()
    );
    if ($exception->getCode()) {
        VistaJson::$estado = $exception->getCode();
    } else {
        VistaJson::$estado = 500;
    }   

    $vista->imprimir($cuerpo);
}
);

/* Prueba para lanzar excepciones*/
//throw new ExcepcionApi(2,"Error con estado 2",404);
//throw new ExcepcionApi(2, utf8_encode("No se reconoce la petición"));

/*$cuerpo_peticion = file_get_contents('php://input');
echo $cuerpo_peticion;*/

// Extraer segmento de la url 
/* explode transfroma un string en un array dependiendo del primer parámetro*/
if (isset($_GET['PATH_INFO']))
    $peticion = explode('/', $_GET['PATH_INFO']);
else
    throw new ExcepcionApi(ESTADO_URL_INCORRECTA, 'No se reconoce la petición');


// Obtener recurso
/* array_shift quita el primer elemento de un arreglo*/
$recurso = array_shift($peticion); 
$recursos_existentes = array('categorias','cursos', 'usuarios');

// Comprobar si existe el recurso
if (!in_array($recurso, $recursos_existentes)) {
 // Respuesta error
	throw new ExcepcionApi(ESTADO_EXISTENCIA_RECURSO,"No se reconoce el recurso al que intentas acceder",404);	
}

// Obtiene el método por el que se accedió a la URL y la pasa a minúscula
$metodo = strtolower($_SERVER['REQUEST_METHOD']);

switch ($metodo) {
    case 'get':

    case 'post':

    case 'put':

    case 'delete':

        //Verifica que el método exista en la clase
        if (method_exists($recurso, $metodo)) {
            //Llama a la función definida por usuario
            //Ej: call_user_func(usuarios::post,$peticion)
            $respuesta = call_user_func(array($recurso, $metodo), $peticion);
            $vista->imprimir($respuesta);
            break;
        }

    default:
        // Método no aceptado
        //echo "Método EQUIS: ".$metodo."<br>";        
        VistaJson::$estado = 405;
        $cuerpo = [
            "estado" => ESTADO_METODO_NO_PERMITIDO,
            "mensaje" => 'Método no permitido'
        ];
        $vista->imprimir($cuerpo);        
}

?>