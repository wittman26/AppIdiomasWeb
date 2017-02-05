<?php
/* Clase abstracta para obligar a implementar la fución imprimir */
abstract class VistaApi{
    
    // Código de error
    //public $estado;

    public abstract function imprimir($cuerpo);
}
?>