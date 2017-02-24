modServicios.factory('UsuariosSrv', ['$cookies','LocalStorageSrv','$state',function($cookies,LocalStorageSrv,$state) {

    return{
        login : function(datosUsuario,pagDestino)
        {

            console.log('Pagina destino: ' + pagDestino);

            //Se crea la cookie con el nombre de usuario
            // if(datosUsuario.name!==undefined)
            // 	$cookies.put('usu_nombre',datosUsuario.name);
            // else
            // 	$cookies.put('usu_nombre',datosUsuario.usu_nombre);

            // $cookies.put('password',password);

            // $cookies.put('datosUsu',datosUsuario);

            // console.log('UsuarioC: ' + $cookies.get('usu_nombre'));
            // console.log('Objeto USU: ' + $cookies.get('datosUsu'));
            // console.log('PasswordC: ' + $cookies.get('password'));

            //Se envía a la página autorizada
            // $state.go('perfil');

            //Se guarda en local storage los datos grales de usuario
            LocalStorageSrv.guardar(datosUsuario.usuario);
            //Se guarda en cookie la sesión
            $cookies.put('idsesion',datosUsuario.idsesion);

            $state.go(pagDestino);
        },
        logout : function()
        {
            //al hacer logout se elimina la cookie
			// $cookies.remove("nombre"),            
            // $cookies.remove("password");

            $cookies.remove("idsesion");
            LocalStorageSrv.clean();
			
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
            if(typeof($cookies.get('idsesion')) == "undefined" 
            	&& toState.name!== 'login' 
            	&& this.checkNoPermitido(toState.name,ESTADOS_URLS))
            {
                event.preventDefault();
                MENLATVISIBLE = this.checkLateralVisible(toState.name,ESTADOS_URLS); 
                LOGVISIBLE = true;
                PAGDESTINO = toState.name;
                $state.go('login');

            } else {
                

            	if(typeof($cookies.get('idsesion')) !== "undefined"){
                    // Se está logeado e intenta ir a login o registro, 
                    // evita la navegación
	            	// if(!this.checkNoPermitido(toState.name,ESTADOS_URLS))
                    if(toState.name==="login" || toState.name==="registro"){
                        event.preventDefault();
                        return;
                    }
                    
            		LOGVISIBLE = false;
            		console.log('Definido!');
            	}

                MENLATVISIBLE = this.checkLateralVisible(toState.name,ESTADOS_URLS);                
            }
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
        },
        // Devuelve true si existe el estado lateral dentro de views
        checkLateralVisible : function(llaveUrl, listaUrl)
        {
            if (listaUrl.hasOwnProperty(llaveUrl)) {

                ObjUrl = listaUrl[llaveUrl]["views"];
                
                if(ObjUrl.hasOwnProperty("lateral")){
                    return true;
                }
            } 
            return false;                      
        }
    }

}]);