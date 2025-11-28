(function(){

var app = angular.module('ejemplosApp',[ ]);


/* $http es una inyección de instrucciones  */
app.controller('mainCtrl', ['$scope','$http', function($scope,$http){
  
  $scope.autos= {  };
  //array de galeria de autos
  $scope.autosGaleria =[];

$http.get('json/autos.json').success (function(data){
//Código cuando es correcta la petición, va a mandar a llamar la data y la asigna 
// a los profesores
    $scope.autos = data.autos;
    $scope.autoLinkClick();
    console.log($scope.autosGaleria);

});

//Función de galeria autos 
$scope.autoLinkClick = (tipo="Auto")=>{
  $scope.autosGaleria = [];
  for (const vehiculo of $scope.autos) {
    if(vehiculo.tipo === tipo){
      $scope.autosGaleria.push(vehiculo);
    }
  }
}

  
}]);



})();
