<?php

    class usuarios
    {
        // Datos de la tabla "usu_usuarios"
        const NOMBRE_TABLA = "usu_usuarios";
        // Nombre de campos

        const USU_CODIGO = "usu_codigo";
        const USU_NOMBRE = "usu_nombre";
        const USU_CORREO = "usu_correo";
        const USU_CLAVE  = "usu_clave";

        const ESTADO_CREACION_EXITOSA = 1;
        const ESTADO_CREACION_FALLIDA = 2;        
        const ESTADO_ERROR_BD = 3;
        const ESTADO_AUSENCIA_CLAVE_API = 4;
        const ESTADO_CLAVE_NO_AUTORIZADA = 5;        
        const ESTADO_URL_INCORRECTA = 6;
        const ESTADO_PARAMETROS_INCORRECTOS = 7;
        const ESTADO_FALLA_DESCONOCIDA = 8;

        // PROCESAR POST
        public static function post($peticion)
        {
            if (isset($peticion[0])) {   
                switch ($peticion[0]) {
                    //http://localhost:8888/PHP/idiomasV2/usuarios/registro
                    case 'registro':
                        return self::registrar();
                        break;
                    //http://localhost:8888/PHP/idiomasV2/usuarios/login
                    //http://localhost:8888/AppIdiomas/services/usuarios/login
                    case 'login':
                        return self::loguear();
                        break;                                    
                    default:
                        throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
                        break;
                }
            } else {
                throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
            }            
        }

        private static function registrar()
        {
            $cuerpo         = file_get_contents('php://input');
            $datosUsuario   = json_decode($cuerpo);

            $resultado = self::crear($datosUsuario);

            switch ($resultado) {
                case self::ESTADO_CREACION_EXITOSA:
                    VistaJson::$estado = 201;
                    return
                        [
                            "estado"  => self::ESTADO_CREACION_EXITOSA,
                            "mensaje" => '¡Registro creado con éxito!'
                        ];
                    break;
                case self::ESTADO_CREACION_FALLIDA:
                    throw new ExcepcionApi(self::ESTADO_CREACION_FALLIDA, "Ha ocurrido un error");
                    break;
                default:
                    throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Falla desconocida", 400);
            }            
        }        

        /* 1. CREACIÓN DE USUARIO
        Recibe los datos en forma JSON y devuelve un entero
        con código de resultado
        */
        private static function crear($datosUsuario)
        {
            $usu_nombre     = $datosUsuario->usu_nombre;
            $usu_correo     = $datosUsuario->usu_correo;
            $usu_clave      = $datosUsuario->usu_clave;

            $claveEncriptada = self::encriptarClave($usu_clave);

            /* ATENCIÓN, cambiar por TOKEN*/
            $claveApi = self::generarClaveApi();

            try {

                $pdo = ConexionBD::getInstancia()->getBD();

                // Sentencia INSERT
                $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
                    self::USU_NOMBRE . "," .
                    self::USU_CORREO . "," .
                    self::USU_CLAVE . ")" .
                    " VALUES(?,?,?)";                    


                $sentencia = $pdo->prepare($comando);

                $sentencia->bindParam(1, $usu_nombre);
                $sentencia->bindParam(2, $usu_correo);
                $sentencia->bindParam(3, $claveEncriptada);

                $resultado = $sentencia->execute();

                if ($resultado) {
                    return self::ESTADO_CREACION_EXITOSA;
                } else {
                    return self::ESTADO_CREACION_FALLIDA;
                }
            } catch (PDOException $e) {                
                throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage(),404);
            }

        }        

        // 1.1 Encriptación de contraseña
        private static function encriptarClave($clavePlana)
        {
            if ($clavePlana)
                //Encripta el texto recibido
                return password_hash($clavePlana, PASSWORD_DEFAULT);
            else return null;
        }

        // ATENCIÓN! Genera clave para acceder a API
        private static function generarClaveApi()
        {
            return md5(microtime().rand());
        }


        // 2. LOGIN
        private static function loguear()
        {
            $respuesta = array();

            $cuerpo         = file_get_contents('php://input');
            $datosUsuario   = json_decode($cuerpo);

            $usu_nombre     = $datosUsuario->usu_nombre;
            $usu_clave      = $datosUsuario->usu_clave;


            // 2.1 Autentica usuario
            if (self::autenticar($usu_nombre,$usu_clave)) {
                // 2.2 Obtiene datos de usuario
                $usu_usuario = self::obtenerUsuarioPorNombre($usu_nombre);

                if ($usu_usuario != NULL) {
                    VistaJson::$estado = 200;

                    $respuesta["usu_nombre"]    = $usu_usuario["usu_nombre"];
                    $respuesta["usu_correo"]    = $usu_usuario["usu_correo"];
                    //ATENCIÓN! retornar TOKEN
                    // Retorna respuesta
                    return [
                                "estado" => 1, 
                                "usuario" => $respuesta
                            ];

                } else {
                    throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,
                        "Ha ocurrido un error");
                }

            } else {
                throw new ExcepcionApi(self::ESTADO_PARAMETROS_INCORRECTOS,
                                        "Nombre o contraseña inválidos");
            }

        }        


        //2.1 Autentica
        private static function autenticar($usu_nombre, $usu_clave)
        {

            try {

                $pdo = ConexionBD::getInstancia()->getBD();

                // Sentencia Select
                $comando = "SELECT ".self::USU_CLAVE." FROM " .self::NOMBRE_TABLA ." WHERE " . self::USU_NOMBRE . "=?";
                
                $sentencia = $pdo->prepare($comando);

                $sentencia->bindParam(1, $usu_nombre);

                $sentencia->execute();

                if ($sentencia) {                   
                 
                    $resultado = $sentencia->fetch();

                    if (self::validarContrasena($usu_clave, $resultado['usu_clave'])) {                        
                        return true;
                    } else return false;
                } else {
                    return false;
                }
            } catch (PDOException $e) {
                throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
            }
        }

        //Verifica contraseña teniendo en cuenta que se usó password_hash para encriptar
        private static function validarContrasena($clavePlana, $claveHash)
        {
            return password_verify($clavePlana, $claveHash);
        }                

        // 2.2 Obtiene datos de usuario
        private static function obtenerUsuarioPorNombre($usu_nombre)
        {
            $pdo = ConexionBD::getInstancia()->getBD();

            // Sentencia Select
            $comando = "SELECT " .
                self::USU_NOMBRE . "," .
                self::USU_CORREO . "," .
                self::USU_CLAVE . 
                " FROM " . self::NOMBRE_TABLA .
                " WHERE " . self::USU_NOMBRE . "=?";

            $sentencia = $pdo->prepare($comando);

            $sentencia->bindParam(1, $usu_nombre);

            if ($sentencia->execute())
                return $sentencia->fetch(PDO::FETCH_ASSOC);
            else
                return null;
        }


        //Método para autorizar acciones
        public static function autorizar()
        {
            $cabeceras = apache_request_headers();

            if (isset($cabeceras["authorization"])) {

                $claveApi = $cabeceras["authorization"];

                if (usuarios::validarClaveApi($claveApi)) {
                    return usuarios::obtenerIdUsuario($claveApi);
                } else {
                    throw new ExcepcionApi(
                        self::ESTADO_CLAVE_NO_AUTORIZADA, "Clave de API no autorizada", 401);
                }

            } else {
                throw new ExcepcionApi(
                    self::ESTADO_AUSENCIA_CLAVE_API,
                    "Se requiere Clave del API para autenticación");
            }
        }        

        //Valida la claveApi en la BD
        private static function validarClaveApi($claveApi)
        {
            $comando = "SELECT COUNT(" . self::ID_USUARIO . ")" .
                " FROM " . self::NOMBRE_TABLA .
                " WHERE " . self::CLAVE_API . "=?";

            $sentencia = ConexionBD::getInstancia()->getBD()->prepare($comando);

            $sentencia->bindParam(1, $claveApi);

            $sentencia->execute();

            return $sentencia->fetchColumn(0) > 0;
        }        

        //Obtiene datos de usuario dada una claveApi
        private static function obtenerIdUsuario($claveApi)
        {
            $comando = "SELECT " . self::ID_USUARIO .
                " FROM " . self::NOMBRE_TABLA .
                " WHERE " . self::CLAVE_API . "=?";

            $sentencia = ConexionBD::getInstancia()->getBD()->prepare($comando);

            $sentencia->bindParam(1, $claveApi);

            if ($sentencia->execute()) {
                $resultado = $sentencia->fetch();
                return $resultado['idUsuario'];
            } else
                return null;
        }        

       
    }
?>