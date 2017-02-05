/*
	autor: Wittman Gutiérrez
	fecha: 2017-01-13
*/
modControladores.controller('inicioCtrl', ['$scope', function($scope){	
	$scope.prueba = 'Página de incicio';
	console.log('Imprimiendo prueba:' + $scope.prueba);
}]);