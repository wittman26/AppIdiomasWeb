modServicios.service('LlamadoHttpSrv',['$http',function($http){
	return {
		llamadoGral : function(cab0, funcionExito, funcionError){
			var cab = $.extend(true, {}, cab0);

			cab['headers'] = {
				accept: 'application/json',
				"content-type":"application/x-www-form-urlencoded"
				// authorization:''
			};

			$http(cab).then(
				function procesarExito(response){
					funcionExito(response.data, response.status, response.headers, response.config, response.statusText);
				},
				function procesarError(response){
					funcionError(response.data, response.status, response.headers, response.config, response.statusText);
				}
			);
		}
		
	}

}]);