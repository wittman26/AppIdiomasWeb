/*
 * @author: Wittman
 * @date: 	2016-12-13
 * 
 * Configuración Genérica
 */

/* Constantes */

/* Lista de servidores */
var LIS_SRV = {'MOCKS':'/mockup', 'LOCAL':'http://localhost:8888', 'REMOTO':''};

var SRV_LOCAL = 'LOCAL';
var SRV_MOCK = 'MOCKS';
var SRV_REMOTO = 'REMOTO';

/* Servidor en uso */
var SERV = LIS_SRV[SRV_LOCAL];

/* Ruta de componentes */
var COMP = 'app/components';

/* Idioma predefinido */
var IDIOMA = 'en';

/* Variable de control*/
var PROBANDO = "Muéstrese!";

/* Visibilidad de opcion login*/
var LOGVISIBLE = true;

/* Página destino después de login*/
var PAGDESTINO = 'inicio';

/* Dirección de páginas*/
var ESTADOS_URLS = {

					'inicio': {
					            url: "/inicio",
					            views:{
					                "principal": {
					                    templateUrl: COMP + "/inicio/inicio.html",
					                    controller: 'inicioCtrl'
					                },
					                "lateral": {
					                    templateUrl: "lateral.html"
					                },
					                "superior": {
					                    templateUrl: COMP + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            },
					            permitido: "N"
					        },					
					'login': {
					            url: "/login",
					            views:{
					                "principal": {
					                    templateUrl: COMP + "/login/login.html",
					                    controller: 'loginCtrl'
					                },
					                "superior": {
					                    templateUrl: COMP + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            }					            
					        },
					'registro': {
					            url: "/registro",
					            views:{
					                "principal":{
					                    templateUrl: COMP + "/registro/registro.html",
					                    controller: 'registroCtrl'
					                },
					                "superior": {
					                    templateUrl: COMP + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            } 
					        },
					'perfil': {
					            url: "/perfil",
					            views:{
					                "principal": {
					                    templateUrl: COMP + "/perfil/perfil.html",
					                    controller: 'perfilCtrl'
					                },
					                "lateral": {
					                    templateUrl: "lateral.html"
					                },
					                "superior": {
					                    templateUrl: COMP + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            },
					            permitido: "N"
					        },					        
			}


/* Módulos globales*/
var modControladores = angular.module('modControladores',[]);
var modServicios = angular.module('modServicios',[]);