modServicios.factory('FacebookSrv',['$window','UsuariosSrv',function($window,UsuariosSrv){
  var objFacebook = {};

  function obtenerDatos(){

    FB.api('/me', { locale: 'en_US', fields: 'name, email,picture,gender' }, function(response) {
      console.log('Successful login for: ' + response.name);
      console.log('Todo el objeto: ' + JSON.stringify(response));      

      UsuariosSrv.login(response,PAGDESTINO);
    });

  }

  return {
    probando : function(){
      return "Resultado de probando!";
    },          
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