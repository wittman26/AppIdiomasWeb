<?php

    class usuarios
    {
        // Datos de la tabla "usu_usuarios"
        const NOMBRE_TABLA = "USU_USUARIOS";
        // Nombre de campos

        const USU_CODIGO = "usu_codigo";
        const USU_NOMBRE = "usu_nombre";
        const USU_CORREO = "usu_correo";
        const USU_IMAGEN = "usu_imagen";
        const USU_CLAVE  = "usu_clave";
        const USU_IDFACEBOOK  = "usu_idfacebook";

        const ESTADO_CREACION_EXITOSA = 1;
        const ESTADO_CREACION_FALLIDA = 2;        
        const ESTADO_ERROR_BD = 3;
        const ESTADO_AUSENCIA_CLAVE_API = 4;
        const ESTADO_CLAVE_NO_AUTORIZADA = 5;        
        const ESTADO_URL_INCORRECTA = 6;
        const ESTADO_PARAMETROS_INCORRECTOS = 7;
        const ESTADO_FALLA_DESCONOCIDA = 8;
        const ESTADO_USUARIO_EXISTENTE = 9;
        const ESTADO_ACTUALIZACION_EXITOSA = 10;
        const ESTADO_ACTUALIZACION_FALLIDA = 10;

        public function __construct()
        {
            $this->usu_codigo='';
            $this->usu_nombre='';
            $this->usu_correo='';
            $this->usu_imagen='';
            $this->usu_clave='';
            $this->usu_idfacebook='' ;           
        }        

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
                    case 'loginface':
                        return self::loguearFace();
                        break;
                    default:
                        throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
                        break;
                }
            } else {
                throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
            }            
        }

        // PROCESAR GET (Consultas)
        public static function get($peticion)
        {
            if (isset($peticion[0])) {   
                switch ($peticion[0]) {
                    case 'obtenerusuario':
                        // Primero debe autorizar antes de cualquier acción
                        $datosUsuario = self::autorizar();
                        //Obtiene los datos de usuario
                        return self::obtenerUsuario(self::USU_NOMBRE,$datosUsuario->{self::USU_NOMBRE});
                        break;
                    default:
                        throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
                        break;                    
                }
            } else {
                throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
            }            

        }

        // PROCESAR PUT (Actualizaciones)
        public static function put($peticion)
        {
            $datosUsuario = self::autorizar();
            $datosUsuario = self::obtenerUsuario(self::USU_NOMBRE,$datosUsuario->{self::USU_NOMBRE});            

            if(isset($peticion[0])){
                switch ($peticion[0]) {
                    case 'actualizar':
                        $cuerpo                = file_get_contents('php://input');                
                        $datosUsuarioNuevos    = json_decode($cuerpo);

                        $resultado = self::actualizarUsuario($datosUsuario,$datosUsuarioNuevos);

                        switch ($resultado) {
                            case self::ESTADO_ACTUALIZACION_EXITOSA:
                                VistaJson::$estado = 201;
                                return
                                    [
                                        "estado"  => self::ESTADO_ACTUALIZACION_EXITOSA,
                                        "mensaje" => '¡El registro se ha actualizado con éxito!'
                                    ];
                                break;
                            case self::ESTADO_ACTUALIZACION_FALLIDA:
                                throw new ExcepcionApi(self::ESTADO_CREACION_FALLIDA, "Ha ocurrido un error en actualización");
                                break;
                            default:
                                throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Falla desconocida", 400);
                        }                    
                        break;
                    default:
                        throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
                        break;        
                }
            }
        }
        
        /* ACTUALIZAR DATOS DE USUARIO */
        private static function actualizarUsuario($datosUsuario,$datosUsuarioNuevos)
        {
            try {
                // Creando consulta UPDATE
                $consulta = "UPDATE ". self::NOMBRE_TABLA .
                            " SET ".self::USU_NOMBRE . "=?, " .
                            self::USU_CORREO . "=?, " .
                            self::USU_IMAGEN . "=?" .
                            " WHERE " . self::USU_NOMBRE . "=?";

                // Preparar la sentencia
                $sentencia = ConexionBD::getInstancia()->getBD()->prepare($consulta);

                $sentencia->bindParam(1, $usu_nombre);
                $sentencia->bindParam(2, $usu_correo);
                $sentencia->bindParam(3, $usu_imagen);
                $sentencia->bindParam(4, $usu_nombre_ant);

                $usu_nombre       = $datosUsuarioNuevos->usu_nombre;
                $usu_correo       = $datosUsuarioNuevos->usu_correo;
                $usu_imagen       = $datosUsuarioNuevos->usu_imagen;
                $usu_nombre_ant   = $datosUsuario['usu_nombre'];
                
                // echo "HOLA - ".var_dump($datosUsuario)." - ".$datosUsuario['usu_nombre']." -".$datosUsuarioNuevos->usu_correo;

                // Ejecutar la sentencia
                $sentencia->execute();

                if($sentencia->rowCount()>0){
                    return self::ESTADO_ACTUALIZACION_EXITOSA;
                } else {
                    return self::ESTADO_ACTUALIZACION_FALLIDA;
                }

            } catch (PDOException $e) {
                throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
            }
                
        }        

        /* 1. REGISTRO DE USUARIO
        Se encarga de crear un nuevo usuario
        */
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

        /* 1.1 CREACIÓN DE USUARIO
        Recibe los datos en forma JSON y devuelve un entero
        con código de resultado
        */
        private static function crear($datosUsuario)
        {
            if(self::buscarUsuario(self::USU_NOMBRE,$datosUsuario->usu_nombre)){
                throw new ExcepcionApi(self::ESTADO_USUARIO_EXISTENTE, "El usuario ".$datosUsuario->usu_nombre." ya existe", 400);
            } else {            

                $usu_nombre         = $datosUsuario->usu_nombre;
                $usu_correo         = $datosUsuario->usu_correo;
                $usu_imagen         = $datosUsuario->usu_imagen;
                $usu_clave          = $datosUsuario->usu_clave;
                $usu_idfacebook     = $datosUsuario->usu_idfacebook;

                $claveEncriptada = self::encriptarClave($usu_clave);

                /* ATENCIÓN, cambiar por TOKEN*/
                $claveApi = self::generarClaveApi();

                try {

                    $pdo = ConexionBD::getInstancia()->getBD();

                    // Sentencia INSERT
                    $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
                        self::USU_NOMBRE . "," .
                        self::USU_CORREO . "," .
                        self::USU_IMAGEN . "," .
                        self::USU_IDFACEBOOK . "," .
                        self::USU_CLAVE . ")" .
                        " VALUES(?,?,?,?,?)";                    


                    $sentencia = $pdo->prepare($comando);

                    $sentencia->bindParam(1, $usu_nombre);
                    $sentencia->bindParam(2, $usu_correo);
                    $sentencia->bindParam(3, $usu_imagen);
                    $sentencia->bindParam(4, $usu_idfacebook);
                    $sentencia->bindParam(5, $claveEncriptada);

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

        }        

        /* 1.1.1 BUSCA USUARIO EXISTENTE
        */
        private static function buscarUsuario($usu_campo,$usu_nombre)
        {
            try {

                $pdo = ConexionBD::getInstancia()->getBD();

                // Sentencia Select
                $comando =  "SELECT ".self::USU_NOMBRE.
                            " FROM " .self::NOMBRE_TABLA .
                            " WHERE UPPER(" .$usu_campo . ")=UPPER(?)";
                
                $sentencia = $pdo->prepare($comando);

                $sentencia->bindParam(1, $usu_nombre);

                $sentencia->execute();

                if (!empty($sentencia->fetchAll(PDO::FETCH_ASSOC))) {                 
                    return true;
                } else {
                    return false;
                }
            } catch (PDOException $e) {
                throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
            }            
        }        

        // 1.1.1 Encriptación de contraseña
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
                $usu_usuario = self::obtenerUsuario(self::USU_NOMBRE,$usu_nombre);

                if ($usu_usuario != NULL) {
                    return self::devolverSesion($usu_usuario);
                } else {
                    throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,
                        "Ha ocurrido un error");
                }

            } else {                
                throw new ExcepcionApi(self::ESTADO_PARAMETROS_INCORRECTOS,
                                        "Nombre o contraseña inválidos",401);
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

        // 2.1.1 Verifica contraseña teniendo en cuenta que se usó password_hash para encriptar
        private static function validarContrasena($clavePlana, $claveHash)
        {
            return password_verify($clavePlana, $claveHash);
        }                

        // 2.2 Obtiene datos de usuario
        private static function obtenerUsuario($usu_campo, $usu_nombre)
        {
            $pdo = ConexionBD::getInstancia()->getBD();

            // Sentencia Select
            $comando = "SELECT " .
                self::USU_NOMBRE . "," .
                self::USU_CORREO . "," .
                self::USU_IMAGEN .
                " FROM " . self::NOMBRE_TABLA .
                " WHERE UPPER(" . $usu_campo . ")=UPPER(?)";

            $sentencia = $pdo->prepare($comando);

            $sentencia->bindParam(1, $usu_nombre);

            if ($sentencia->execute())
                return $sentencia->fetch(PDO::FETCH_ASSOC);
            else
                return null;
        }

        // 3. LOGIN CON FACEBOOK
        private static function loguearFace()
        {
            $respuesta = array();

            $cuerpo         = file_get_contents('php://input');
            $datosUsuario   = json_decode($cuerpo);

            $usu_idfacebook     = $datosUsuario->id;

                
            // 3.1 Obtiene datos de usuario
            $usu_usuario = self::obtenerUsuario(self::USU_IDFACEBOOK,$usu_idfacebook);

            if ($usu_usuario != NULL) {
                return self::devolverSesion($usu_usuario);                   
            } else {
                // Se guarda la imagen en el servidor
                
                $usu_imagen = file_get_contents($datosUsuario->picture->data->url);
                file_put_contents(DIR_IMG_USU.preg_replace('[\s+]','', $datosUsuario->name).'.jpg', $usu_imagen);

                $usu_usuario = new self();;

                // Se formatean los datos de facebook a la base
                $usu_usuario->usu_nombre         = $datosUsuario->name;
                $usu_usuario->usu_correo         = $datosUsuario->email;
                $usu_usuario->usu_imagen         = preg_replace('[\s+]','', $datosUsuario->name).'.jpg';
                $usu_usuario->usu_clave          = $datosUsuario->id;                
                $usu_usuario->usu_idfacebook     = $datosUsuario->id;

                // Se crea el usuario en la base
                $resultado = self::crear($usu_usuario);
                
                // Devuelve sesion al crear usuario
                switch ($resultado) {
                    case self::ESTADO_CREACION_EXITOSA:
                        $usu_usuario = self::obtenerUsuario(self::USU_IDFACEBOOK,$usu_idfacebook);
                        if ($usu_usuario != NULL) {
                            return self::devolverSesion($usu_usuario);
                        }
                        break;
                    case self::ESTADO_CREACION_FALLIDA:
                        throw new ExcepcionApi(self::ESTADO_CREACION_FALLIDA, "Ha ocurrido un error");
                        break;
                    default:
                        throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Falla desconocida", 400);
                }

            }


        }           

        private static function devolverSesion($usu_usuario){
            VistaJson::$estado = 200;

            $respuesta["usu_nombre"]    = $usu_usuario["usu_nombre"];
            $respuesta["usu_imagen"]    = $usu_usuario["usu_imagen"];
            
            //ATENCIÓN! retornar TOKEN
            return [
                        "estado" => 1, 
                        "usuario" => $respuesta,
                        "idsesion" => Auth::SignIn($usu_usuario)
                    ];
        }

        // 3. Método para autorizar acciones
        private static function autorizar()
        {
            $cabeceras = apache_request_headers();

            if (isset($cabeceras["authorization"])) {

                $token = $cabeceras["authorization"];

                // if (usuarios::validarClaveApi($claveApi)) {
                if(Auth::GetData($token)){
                    // return usuarios::obtenerIdUsuario($claveApi);
                    VistaJson::$estado = 200;
                    return Auth::GetData($token);
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
           
    }
?>