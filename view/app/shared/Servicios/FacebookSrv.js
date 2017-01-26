modServicios.factory('SrvFacebook',['$window',function($window){
    var datosFacebook = {};
    
/*    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Ocurrió un error');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }	*/


    watchLoginChange = function() {

      var _self = this;

      FB.Event.subscribe('auth.authResponseChange', function(res) {

        if (res.status === 'connected') {

          /*
           The user is already logged,
           is possible retrieve his personal info
          */
          _self.getUserInfo();

          /*
           This is also the point where you should create a
           session for the current user.
           For this purpose you can use the data inside the
           res.authResponse object.
          */

        }
        else {

          /*
           The user is not logged to the app, or into Facebook:
           destroy the session on the server.
          */

        }

      });

    }

    datosFacebook.nombre = function() {

        // var _self = this;
        var nombreAux = "Alguna Vaina";

        /*FB.api('/me', function(res) {
            $rootScope.$apply(function() {
                $rootScope.user = _self.user = res;
            });
        });*/

        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', { locale: 'en_US', fields: 'name, email,picture,gender' }, function(response) {
          console.log('Successful login for: ' + response.name);
          console.log('Todo el objeto: ' + JSON.stringify(response));

          nombreAux = response.name;
        }); 

        return nombreAux;     

    }    

    logout = function() {

      var _self = this;

      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });

    }    


    datosFacebook.prueba = 'Servicio de facebook';
    return datosFacebook;
}]);