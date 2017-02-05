<?php
	class cursos{
        // Datos de la tabla "cur_cursos"
        const NOMBRE_TABLA = "cur_cursos";
        
        // Nombre de campos
	 	const CUR_CODIGO 		= "cur_codigo";
	 	const CUR_NOMBRE 		= "cur_nombre";
	 	const CUR_DESCRIPCION 	= "cur_descripcion";
	 	const CUR_CAT_COD 		= "cur_cat_cod";

	    const CODIGO_EXITO = 1;
	    const ESTADO_EXITO = 1;
	    const ESTADO_ERROR = 2;
	    const ESTADO_ERROR_BD = 3;
	    const ESTADO_ERROR_PARAMETROS = 4;
	    const ESTADO_NO_ENCONTRADO = 5;  

		/*En todas las acciones se llamará a autorizar
		No se podrán hacer acciones si no se está logeado*/

        // Procesar get (Consultas)
        public static function get($peticion)
        {
		    //Si la petición está vacía, se consultan todos los contactos
		    if (empty($peticion[0]))
		        return self::listarCursos();
		    else
		        return self::listarCursos($peticion[0]);     	
        }

        public static function post(){

			$body = file_get_contents('php://input');
			$cur_curso = json_decode($body);

			$cur_codigo = self::crear($cur_curso);

			VistaJson::$estado = 201;
			return [
				"estado"	=>	self::CODIGO_EXITO,
				"mensaje"	=>	"Curso creado con éxito",
				"cod"		=>	$cur_codigo
			];
		}



        public static function listarCursos($cur_cat_cod = NULL){

            try {
				$pdo = ConexionBD::getInstancia()->getBD();

            	if(!$cur_cat_cod){
					// Sentencia Select
		            $comando = "SELECT " .
		                self::CUR_CODIGO.",".
						self::CUR_NOMBRE.",".
						self::CUR_DESCRIPCION.",".
						self::CUR_CAT_COD.
		                " FROM " . self::NOMBRE_TABLA;

		            $sentencia = $pdo->prepare($comando);
            	} else {
					// Sentencia Select
		            $comando = "SELECT " .
		                self::CUR_CODIGO.",".
						self::CUR_NOMBRE.",".
						self::CUR_DESCRIPCION.",".
						self::CUR_CAT_COD.
		                " FROM " . self::NOMBRE_TABLA.
		                " WHERE ".self::CUR_CAT_COD."=?";

		            $sentencia = $pdo->prepare($comando); 
		            $sentencia.bindParam(1,$cur_cat_cod);           		
            	}

		        // Ejecutar sentencia preparada
		        if ($sentencia->execute()) {
		            VistaJson::$estado = 200;
		            return
		                [
		                    "estado" => self::ESTADO_EXITO,
		                    "cursos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
		                ];
		        } else
		            throw new ExcepcionApi(self::ESTADO_ERROR, "Se ha producido un error");

            } catch (Exception $e) {
            	throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
            }

        }

		private static function crear($cur_curso)
		{
		    if ($cur_curso) {
		        try {

		            $pdo = ConexionBD::getInstancia()->getBD();

		            // Sentencia INSERT
		            $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
		                self::CUR_NOMBRE . "," .
		                self::CUR_DESCRIPCION . "," .
		                self::CUR_CAT_COD .")" .
		                " VALUES(?,?,?)";

		            // Preparar la sentencia
		            $sentencia = $pdo->prepare($comando);

		            $sentencia->bindParam(1, $cur_nombre);
		            $sentencia->bindParam(2, $cur_descripcion);
		            $sentencia->bindParam(3, $cur_cat_cod);

		            $cur_nombre 		= $cur_curso->cur_nombre;
		            $cur_descripcion 	= $cur_curso->cur_descripcion;
		            $cur_cat_cod 		= $cur_curso->cur_cat_cod;

		            echo $comando;

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