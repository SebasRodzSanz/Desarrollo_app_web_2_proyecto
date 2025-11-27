(function(){

var app = angular.module('ejemplosApp',[ ]);


/* $http es una inyección de instrucciones  */
app.controller('mainCtrl', ['$scope','$http', function($scope,$http){
  
  $scope.autos= {  };

$http.get('json/autos.json').success (function(data){
//Código cuando es correcta la petición, va a mandar a llamar la data y la asigna 
// a los profesores
    $scope.autos = data.autos;

});

  
}]);



})();
