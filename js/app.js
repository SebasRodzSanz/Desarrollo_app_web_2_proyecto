(function () {

var app = angular.module('ejemplosApp', []);


app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.autos = [];
    $scope.autosGaleria = [];

    // OBJETO DE BÚSQUEDA (AQUÍ VA TODO)
    $scope.busqueda = {
        modelo: "",
        auto: "",
        filtroPrecioActivo: false,
        precioMax: 0,
        tipoVehiculo: "" 
    };

    // VARIABLE PARA ORDENAR ASC/DESC
    $scope.ordenAsc = true;

    // FUNCIÓN PARA ORDENAR POR PRECIO
    $scope.ordenarPrecio = function () {
        $scope.ordenAsc = !$scope.ordenAsc;

        $scope.autos.sort((a, b) => {
            return $scope.ordenAsc
                ? a.precio - b.precio    // menor → mayor
                : b.precio - a.precio;   // mayor → menor
        });
    };

    // BOTÓN PARA MOSTRAR / OCULTAR SLIDER
    $scope.activarPrecio = function () {
        $scope.busqueda.filtroPrecioActivo = !$scope.busqueda.filtroPrecioActivo;
    };

    // PETICIÓN DE AUTOS
    $http.get('json/autos.json').success(function (data) {

        $scope.autos = data.autos;
        $scope.autoLinkClick();

        // DEFINIR RANGO DE PRECIOS
        $scope.precioMin = Math.min(...$scope.autos.map(a => a.precio));
        $scope.precioMax = Math.max(...$scope.autos.map(a => a.precio));
        $scope.busqueda.precioMax = $scope.precioMax;

        // FILTRO DE AUTOS 
        $scope.filtroAutos = function (auto) {

            // FILTRO POR PRECIO (SLIDER)
            if ($scope.busqueda.filtroPrecioActivo) {
                if (auto.precio > $scope.busqueda.precioMax) {
                    return false;
                }
            }

            // FILTRO POR TIPO DE VEHÍCULO (RADIOS)
            if ($scope.busqueda.tipoVehiculo !== "") {
                if (auto.tipo !== $scope.busqueda.tipoVehiculo) {
                    return false;
                }
            }

            // SI NO HAY TEXTO → mostrar lo filtrado
            if (!$scope.busqueda.modelo) {
                return true;
            }

            const texto = $scope.busqueda.modelo.toLowerCase();

            switch ($scope.busqueda.auto) {

                case "marca":
                    return auto.marca.toLowerCase().includes(texto);

                case "color":
                    return auto.color.toLowerCase().includes(texto);

                case "anio":
                    return auto.anio.toString().includes(texto);

                case "tipo":
                    return auto.tipo.toLowerCase().includes(texto);

                case "":
                default:
                    return (
                        auto.modelo.toLowerCase().includes(texto) ||
                        auto.marca.toLowerCase().includes(texto) ||
                        auto.color.toLowerCase().includes(texto) ||
                        auto.tipo.toLowerCase().includes(texto) ||
                        auto.anio.toString().includes(texto) ||
                        auto.precio.toString().includes(texto)
                    );
            }
        };
    });

    // GALERÍA
    $scope.autoLinkClick = (tipo = "Auto") => {
        $scope.autosGaleria = [];
        for (const vehiculo of $scope.autos) {
            if (vehiculo.tipo === tipo) {
                $scope.autosGaleria.push(vehiculo);
            }
        }
    };

}]);

})();
