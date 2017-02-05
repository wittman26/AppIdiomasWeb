<?php
    require_once 'config.php';

    class ConexionBD {        

        /* Única Instancia de la clase*/
        private static $dbConexion = null;

        /*Instancia de PDO*/
        private static $conexPDO;

        final private function __construct()
        {
            try {
                // Crear nueva conexión PDO
                self::getBD(); //los dos puntos se usan para acceder a elementos staticos de una clase
            } catch (PDOException $e) {
                // Manejo de excepciones
                echo $e;
            }
        }

        /* Devuelve la instancia de la clase */
        public static function getInstancia()
        {
            if (self::$dbConexion === null) {
                /*Se crea un objeto de esta misma clase*/
                self::$dbConexion = new self();
            }
            return self::$dbConexion;
        }

        /* Crea nueva conexión PDO */
        public function getBD()
        {
            if (self::$conexPDO == null) {
                /* Crea conexión con parámetros de config.php*/
                self::$conexPDO = new PDO(
                    'mysql:host='   . DB_HOST .
                    ';dbname='      . DB_DATABASE . ";",
                    DB_USER,
                    DB_PASSWORD,
                    array(PDO::MYSQL_ATTR_INIT_COMMAND =>  "SET NAMES 'UTF8'")
                );

                self::$conexPDO->exec("set names UTF8");

                // Habilitar excepciones
                self::$conexPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }

            return self::$conexPDO;
        }

        /* Evita la clonación del objeto */
        final protected function __clone(){}

        function _destructor()
        {
            self::$conexPDO = null;
        }        

    }
?>