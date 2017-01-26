modServicios.factory('UsuariosSrv', ['$rootScope','$cookies','$state',function($rootScope,$cookies,$state) {
  /*return {
    estaLogeado: false,
    nombreUsuario: 'Wisman'
  };*/


    return{
        login : function(username, password)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.put('username',username);
            $cookies.put('password',password);

            console.log('UsuarioC: ' + $cookies.get('username'));
            console.log('PasswordC: ' + $cookies.get('password'));           

            //mandamos a la página autorizada
            //$location.path("/home");
            $state.go('perfil');
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove			
			$cookies.remove("username"),
            $cookies.remove("password");
			
            //mandamos al login
            //$location.path("/login");
            LOGVISIBLE = true;
            $state.go('login');
        },
        checkStatus : function(event,toState)
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/home","/dashboard","/login"];

            console.log('Entró a checkear');

			/*for (llaveEstado in ESTADOS_URLS) {
				console.log('En CheckStatus: '+JSON.stringify(llaveEstado));
			}*/

			/*console.log('estados:' + JSON.stringify($state.current));
			console.log('Actual:' + $state.current.name);
			console.log('Verdad?:' + this.in_array(JSON.stringify($state.current.name),ESTADOS_URLS));
			console.log('Usuario cookie?:' + typeof($cookies.username));*/

            // if(this.in_array($state.current.name,ESTADOS_URLS) && typeof($cookies.username) == "undefined")
            if(typeof($cookies.get('username')) == "undefined" && toState.name!== 'login')
            {
                //$location.path("/login");
                console.log('Tipo variable: ' + typeof($cookies.username));
                console.log('usuario indefinido, vaya a login: ' + typeof($cookies.username));                
                event.preventDefault();
                LOGVISIBLE = true;
                $state.go('login');
            // } else {
            // 	console.log('por el otro lao');
            // 	$state.go($state.current.name);
            } else {
            	if(typeof($cookies.get('username')) !== "undefined"){
            		LOGVISIBLE = false;
            		console.log('Definido!');
            	}
            }


            console.log('Visible?: ' + LOGVISIBLE);

/*            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                //$location.path("/login");
            }*/
        },
        in_array : function(needle, haystack)
        {
            var key = '';

            
/*            for(key in haystack)
            {
            	console.log('Tipo needle '+ typeof(needle));
            	console.log('Tipo elemento '+ typeof(String(haystack[key])));
				console.log('Comparación 3: '+ String(haystack[key]) == needle);

            	console.log('FUNCION: '+JSON.stringify(key) + ' igual a ' + String(needle));
            	console.log('Comparación: '+ String(haystack[key]).localeCompare(String(needle)));
            	console.log('Comparación 2: '+ String(haystack[key]) == String(needle));
            	console.log('Comparación 3: '+ String(haystack[key]) === String(needle));

                //if(String(haystack[key]) === String(needle))
                if(String(haystack[key]).localeCompare(String(needle))===0)
                {
                    return true;
                }

                if (haystack.hasOwnProperty(needle)) {
                	console.log('Entró...' + String(haystack[key]));
                	return true;
                }
            }*/

			/*if (haystack.hasOwnProperty(needle)) {
				console.log('Entró...' + String(haystack[needle]));
				return true;
			} else {
				console.log('Paila...' + String(haystack[needle]));
				return false;	
			}*/
			return false;
            
        }
    }


}]);