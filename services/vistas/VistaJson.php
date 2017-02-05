<?php

    require_once "VistaApi.php";

    /**
     * Clase para imprimir en la salida respuestas con formato JSON
     */

    class VistaJson extends VistaApi
    {
        public static $estado;

        public function __construct($estado = 400)
        {
            self::$estado = $estado;
        }

        /**
         * Imprime el cuerpo de la respuesta y setea el código de respuesta
         * @param mixed $cuerpo de la respuesta a enviar
         */
        public function imprimir($cuerpo)
        {
            if (self::$estado) { 
                http_response_code(self::$estado);
            }
            header('Content-Type: application/json;charset=utf-8');

            echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
            exit;
        }
    }

?>