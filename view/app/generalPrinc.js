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

/* Visibilidad login*/
var LOGVISIBLE = true;

/* Dirección de páginas*/
var ESTADOS_URLS = {

					'login': {
					            url: "/login",
					            views:{
					                "principal": {
					                    templateUrl: COMP + "/login/login.html",
					                    controller: 'loginCtrl'
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
					                "lateral": {
					                    templateUrl: "lateral.html"
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
					                }
					            }					            
					        },					        
			}


/* Módulos globales*/
var modControladores = angular.module('modControladores',[]);
var modServicios = angular.module('modServicios',[]);