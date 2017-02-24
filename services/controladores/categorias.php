<?php
	class categorias{
        // Datos de la tabla "cur_cursos"
        const NOMBRE_TABLA = "CAT_CATEGORIAS";
        
        // Nombre de campos
	 	const CAT_CODIGO 		= "cat_codigo";
	 	const CAT_NOMBRE 		= "cat_nombre";
	 	const CAT_DESCRIPCION 	= "cat_descripcion";

	    const CODIGO_EXITO = 1;
	    const ESTADO_EXITO = 1;
	    const ESTADO_ERROR = 2;
	    const ESTADO_ERROR_BD = 3;
	    const ESTADO_ERROR_PARAMETROS = 4;
	    const ESTADO_NO_ENCONTRADO = 5;  

		/*En las acciones privadas se llamará a autorizar
		No se podrán hacer acciones si no se está logeado*/

        // Procesar get (Consultas)
        public static function get($peticion)
        {
		    //Si la petición está vacía, se consultan todas las categorias
		    if (empty($peticion[0]))
		        return self::listarCategorias();
		    else
		        return self::listarCategorias($peticion[0]);     	
        }

        public static function post(){
        	// Primero debe autorizar antes de cualquier acción
		    // $idUsuario = usuarios::autorizar();

		    $body = file_get_contents('php://input');
		    $cat_categoria = json_decode($body);

		    // echo var_dump($body);

		    $cat_codigo = self::crear($cat_categoria);

		    VistaJson::$estado = 201;
		    return [
		        "estado" 	=> self::CODIGO_EXITO,
		        "mensaje" 	=> "Categoría creada",
		        "id" 		=> $cat_codigo
		    ];
        }

        public static function listarCategorias($cat_codigo = NULL){

            try {
				$pdo = ConexionBD::getInstancia()->getBD();

            	if(!$cat_codigo){
					// Sentencia Select
		            $comando = "SELECT " .
		                self::CAT_CODIGO.",".
						self::CAT_NOMBRE.",".
						self::CAT_DESCRIPCION.
		                " FROM " . self::NOMBRE_TABLA;

		            $sentencia = $pdo->prepare($comando);
            	} else {
					// Sentencia Select
		            $comando = "SELECT " .
		                self::CAT_CODIGO.",".
						self::CAT_NOMBRE.",".
						self::CAT_DESCRIPCION.
		                " FROM " . self::NOMBRE_TABLA.
		                " WHERE ".self::CAT_CODIGO."=?";

		            $sentencia = $pdo->prepare($comando); 
		            $sentencia.bindParam(1,$cat_codigo);           		
            	}

		        // Ejecutar sentencia preparada
		        if ($sentencia->execute()) {
		            VistaJson::$estado = 200;
		            return
		                [
		                    "estado" => self::ESTADO_EXITO,
		                    "categorias" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
		                ];
		        } else
		            throw new ExcepcionApi(self::ESTADO_ERROR, "Se ha producido un error");

            } catch (Exception $e) {
            	throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
            }

        }

		private static function crear($cat_categoria)
		{
		    if ($cat_categoria) {
		        try {

		            $pdo = ConexionBD::getInstancia()->getBD();

		            // Sentencia INSERT
		            $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
		                self::CAT_NOMBRE . "," .
		                self::CAT_DESCRIPCION .")" .
		                " VALUES(?,?)";

		            // Preparar la sentencia
		            $sentencia = $pdo->prepare($comando);

		            $sentencia->bindParam(1, $cat_nombre);
		            $sentencia->bindParam(2, $cat_descripcion);

		            $cat_nombre 		= $cat_categoria->cat_nombre;
		            $cat_descripcion 	= $cat_categoria->cat_descripcion;

		            $sentencia->execute();

		            // Retornar el último id insertado
		            return $pdo->lastInsertId();

		        } catch (PDOException $e) {
		            throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
		        }
		    } else {
		        throw new ExcepcionApi(
		            self::ESTADO_ERROR_PARAMETROS, 
		            utf8_encode("Error en existencia o sintaxis de parámetros"));
		    }

		}        

	}

  ?>