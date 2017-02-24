/*
 * @author: Wittman
 * @date: 	2016-12-13
 * 
 * Configuración Genérica
 */

/* Constantes */

/* Lista de servidores */
var LIS_SRV = {'MOCKS':'/mockup', 'LOCAL':'http://localhost:8888', 'REMOTO':'http://serviciosrest.000webhostapp.com'};
var LIS_REST = {'MOCKS':'/mockup', 'LOCAL':'/Angular/AppIdiomas/services', 'REMOTO':''};

var SRV_LOCAL = 'LOCAL';
var SRV_MOCK = 'MOCKS';
var SRV_REMOTO = 'REMOTO';

/* Servidor en uso */
var SERV = LIS_SRV[SRV_LOCAL];

/* Ubicación de servicios rest */
var REST = LIS_SRV[SRV_LOCAL] + LIS_REST[SRV_LOCAL];

/* Ruta de componentes */
var COMP = 'app/components';

/* Ruta de compartidos */
var SHAR = 'app/shared';

/* Ruta de directivas */
var DIRE = '/Angular/AppIdiomas/view/app/shared/directivas';

/* Idioma predefinido */
var IDIOMA = 'en';

/* Variable de control*/
var PROBANDO = "Muéstrese!";

/* Visibilidad de opcion login*/
var LOGVISIBLE = true;

/* Visibilidad del menú lateral*/
var MENLATVISIBLE = false;

/* Página destino después de login*/
var PAGDESTINO = 'inicio';

/* Nombre de variable en LocalStorage para usuario*/
var USULOCALSTORE = 'usu_usuario';

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
					                    templateUrl: SHAR + "/barraLateral/barraLateral.html",
										controller: 'barraLateralCtrl'
					                },
					                "superior": {
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
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
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
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
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
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
					                "superior": {
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            },
					            permitido: "N"
					        },
					'perfiledicion': {
					            url: "/perfiledicion",
					            views:{
					                "principal": {
					                    templateUrl: COMP + "/perfil/perfiledicion.html",
					                    controller: 'perfilEdicionCtrl'
					                },
					                "superior": {
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                },
					                "edicion": {
					                    templateUrl: COMP + "/perfil/perfilediciondata.html",
					                    controller: 'perfilEdicionDataCtrl'
					                }
					            },
					            permitido: "N"
					        },
					'perfiledicion.data': {
					            url: "/perfilediciondata",
					            views:{
					                "edicion": {
					                    templateUrl: COMP + "/perfil/perfilediciondata.html",
					                    controller: 'perfilEdicionDataCtrl'
					                }
					            },
					            permitido: "N"
					        },
					'perfiledicion.pass': {
					            url: "/perfiledicionpass",
					            views:{
					                "edicion": {
					                    templateUrl: COMP + "/perfil/perfiledicionpass.html",
					                    controller: 'perfilEdicionPassCtrl'
					                }
					            },
					            permitido: "N"
					        },					        
					'cursos': {
					            url: "/cursos",
					            views:{
					                "principal":{
					                    templateUrl: COMP + "/cursos/cursos.html",
					                    controller: 'cursosCtrl'
					                },
					                "lateral": {
					                    templateUrl: SHAR + "/barraLateral/barraLateral.html",
										controller: 'barraLateralCtrl'
					                },
					                "superior": {
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            }
					        },
					'referencia': {
					            url: "/referencia",
					            views:{
					                "principal":{
					                    templateUrl: COMP + "/referencia/referencia.html",
					                    controller: 'referenciaCtrl'
					                },
					                "lateral": {
					                    templateUrl: SHAR + "/barraLateral/barraLateral.html",
										controller: 'barraLateralCtrl'
					                },
					                "superior": {
					                    templateUrl: SHAR + "/barraSuperior/barraSuperior.html",
					                    controller: 'barraSuperiorCtrl'
					                }
					            }
					        },						        
			}


/* Módulos globales*/
var modControladores = angular.module('modControladores',[]);
var modServicios = angular.module('modServicios',[]);
var modDirectivas = angular.module('modDirectivas',[]);