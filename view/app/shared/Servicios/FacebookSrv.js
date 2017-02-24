modServicios.factory('FacebookSrv',['$window','UsuariosSrv','LlamadoHttpSrv',function($window,UsuariosSrv,LlamadoHttpSrv){

  function obtenerDatos(){

    // En picture, se puede ingresar: picture.type(large)
    FB.api('/me', { locale: 'en_US', fields: 'name, email,picture.width(640),gender' }, function(response) {
      // console.log('Successful login for: ' + response.name);
      // console.log('Todo el objeto: ' + JSON.stringify(response));      

      llamarServicio(response);
      UsuariosSrv.login(response,PAGDESTINO);
    });

  }

  function llamarServicio($datosUsuario){

          console.log("LOGIN FACE: " + JSON.stringify($datosUsuario));

          // Detalles de la cabecera HTTTP
          $servicio = '/usuarios/loginface'; 
          
          cabPeticion = {
                  'method':   'POST',
                  'url':      REST + $servicio,
                  'data':     $datosUsuario
          };

          // Función de éxito: Si el llamado fué exitoso, se llenan los datos correspondientes
          var funExito = function(data, status, headers, config, statusText) {
                  console.log("Datos encontrados" + JSON.stringify(data));
                  UsuariosSrv.login(data,PAGDESTINO);
              };

          // Función de error: Muestra los detalles del error
          var funError = function(data, status, headers, config, statusText){
              // notifSrv.popup(status);
              console.log('Error status='+status);
              console.log(JSON.stringify(data));
          }

          // Llamado al servicio de http para llamado del backEnd (servicios REST)
          LlamadoHttpSrv.llamadoGral(cabPeticion,funExito,funError);
      }  

  return {         
    login : function(){
      FB.login(function(response) {
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log('Conectado');
          obtenerDatos();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          console.log('No autorizado');
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          console.log('No está loggeado');
        }
      });
    },
    logout : function() {

      var _self = this;

      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });
    } 

  }
  
}]);