angular.module("nccRoutes").controller("routesController", function ($scope, $http) {

    $scope.routes = []

    $scope.routesAPIUrl = "http://webteach_net.hallam.shu.ac.uk/acesjas/api/route"

    $scope.init = function () {
        $http.get($scope.routesAPIUrl)
            .success(function (response) {
                $scope.routes = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }
    $scope.init()

    $scope.addRoute = function () {

        let routeDetails = {
            id: $scope.routes.length,
            RouteStartPoint: $scope.routeStart,
            RouteEndPoint: $scope.routeEnd,

        }

        $http.post($scope.routesAPIUrl, routeDetails)
            .success(function (res) {
                console.log(res)
                $scope.isAdding = false;
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.showAddRoutes = function () {
        $scope.isAdding = !$scope.isAdding
        $scope.isUpdating = false
    }

    $scope.cancelAddRoute = function () {
        $scope.isAdding = false
    }

    $scope.cancelEdit = function () {
        $scope.isUpdating = false
    }

    $scope.displayEditRoute = function (Id) {
        console.log(`Edit route: ${Id}`)

        $http.get(`${$scope.routesAPIUrl}/${Id}`)
            .success(function (res) {
                $scope.editRouteId = Id
                $scope.editRouteStart = res.RouteStartPoint
                $scope.editRouteEnd = res.RouteEndPoint
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
        $scope.isAdding = false
        $scope.isUpdating = true
    }

    $scope.delRoute = function (Id) {
        console.log(`Del route ${Id}`)
    }


    $scope.submitEdit = function () {
        let editedRoute = {
            Id: $scope.editRouteId,
            RouteStartPoint: $scope.editRouteStart,
            RouteEndPoint: $scope.editRouteEnd,
        }

        $http.put($scope.routesAPIUrl, editedRoute)
            .success(function () {
                $scope.isUpdating = false
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.delRoute = function (Id) {
        let itemToDelete = $scope.routes.indexOf(Id)

        $scope.routes.splice(itemToDelete, 1)

        $http.delete(`${$scope.routesAPIUrl}/${Id}`)
            .success(function (res) {
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }


})