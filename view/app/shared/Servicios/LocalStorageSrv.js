modServicios.service('LocalStorageSrv',['localStorageService',function(localStorageService){
	
	this.llave = USULOCALSTORE;

	//Verifica que no haya nada en localStorage
	if (localStorageService.get(this.llave)) {
		this.usu_usuario = localStorageService.get(this.llave);
	}
	else {
		this.usu_usuario = {};
	}	

	//tal vez borrarlo
	this.agregar = function(newAct){
		this.usu_usuario.push(newAct);
		this.updateLocalStorage();
	}

	this.guardar = function(newUsu){
		this.usu_usuario = newUsu;
		this.actualizarLocalStorage();
	}	
	this.actualizarLocalStorage = function(){
		localStorageService.set(this.llave,this.usu_usuario);
	}
	this.clean = function(){
		this.usu_usuario = {};
		this.actualizarLocalStorage();
	}

	this.obtener = function(){
		return this.usu_usuario;
	}

	//tal vez borrarlo
	this.removeItem = function(item){
		/* La función filter filtra los elementos de un arreglo de acuerdo al parámetro.*/
		this.usu_usuario = this.usu_usuario.filter(function(activity){
			return activity !== item;
		});
		this.actualizarLocalStorage();
		return this.obtener();
	}	
}]);