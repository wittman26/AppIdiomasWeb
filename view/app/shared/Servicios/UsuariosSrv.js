modServicios.factory('UsuariosSrv', ['$cookies','$state',function($cookies,$state) {

    return{
        login : function(datosUsuario,pagDestino)
        {
            //Se crea la cookie con el nombre de usuario
            if(datosUsuario.name!==undefined)
            	$cookies.put('nombre',datosUsuario.name);
            else
            	$cookies.put('nombre',datosUsuario.nombre);
            // $cookies.put('password',password);

            $cookies.put('datosUsu',datosUsuario);

            console.log('UsuarioC: ' + $cookies.get('nombre'));
            console.log('Objeto USU: ' + $cookies.get('datosUsu'));
            // console.log('PasswordC: ' + $cookies.get('password'));

            //Se envía a la página autorizada
            // $state.go('perfil');
            $state.go(pagDestino);
        },
        logout : function()
        {
            //al hacer logout se elimina la cookie
			$cookies.remove("nombre"),
            // $cookies.remove("password");
			
            //Se envía a login
            LOGVISIBLE = true;
            PAGDESTINO = 'inicio';
            
            $state.go('login');
        },
        // Cada vez que llame a State.go, se ejecutará esta función
        checkEstado : function(event,toState)
        {
            // El objeto ESTADOS_URLS contiene la propiedad "permitido" 
            // para controlar el acceso al usuario logeado
            if(typeof($cookies.get('nombre')) == "undefined" 
            	&& toState.name!== 'login' 
            	&& this.checkNoPermitido(toState.name,ESTADOS_URLS))
            {
                event.preventDefault();
                LOGVISIBLE = true;
                PAGDESTINO = toState.name;
                $state.go('login');

            } else {
            	if(typeof($cookies.get('nombre')) !== "undefined"){
	            	if(!this.checkNoPermitido(toState.name,ESTADOS_URLS))
	            		event.preventDefault();
            		LOGVISIBLE = false;
            		console.log('Definido!');
            	}
            }

            console.log('Visible?: ' + LOGVISIBLE);

        },
        // Devuelve true si la propiedad permitido está en N.
        // Las URL con permitido N, no están disponibles sin login
        // (Ej: login, Registro)
        checkNoPermitido : function(llaveUrl, listaUrl)
        {

            if (listaUrl.hasOwnProperty(llaveUrl)) {

            	ObjUrl = listaUrl[llaveUrl];
            	
            	if(ObjUrl.hasOwnProperty("permitido")){
	            	if(JSON.stringify(ObjUrl.permitido).localeCompare("N")){
	            		return true;
	            	}
            	}
            } 
        	return false;          
        }
    }

}]);