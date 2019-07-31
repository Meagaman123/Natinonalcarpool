angular.module("nccVehicle").controller("vehicleController", function ($scope, $http) {

    $scope.vehicles = []

    $scope.vehicleAPIUrl = "http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle"

    $scope.init = function () {
        $http.get($scope.vehicleAPIUrl)
            .success(function (response) {
                $scope.vehicles = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.addVehicle = function () {

        let vehicleDetails = {
            id: $scope.vehicles.length,
            Capacity: $scope.vehicleCapacity,
            Driver: $scope.vehicleDriver,
            Make: $scope.vehicleMake,
            Model: $scope.vehicleModel,
            Registration: $scope.vehicleRegistration
        }

        $http.post($scope.vehicleAPIUrl, vehicleDetails)
            .success(function (res) {
                $scope.isAdding = false;
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.showAddVehicle = function () {
        $scope.isAdding = !$scope.isAdding
        $scope.isUpdating = false
    }

    $scope.cancelAddVehicle = function () {
        $scope.isAdding = false
    }

    $scope.cancelEdit = function () {
        $scope.isUpdating = false
    }



    $scope.displayEditVehicle = function (Id) {

        $http.get(`${$scope.vehicleAPIUrl}/${Id}`)
            .success(function (res) {
                $scope.editVehicleId = Id
                $scope.editVehicleCapacity = res.Capacity
                $scope.editVehicleDriver = res.Driver
                $scope.editVehicleMake = res.Make
                $scope.editVehicleModel = res.Model
                $scope.editVehicleRegistration = res.Registration
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
        $scope.isAdding = false
        $scope.isUpdating = true

    }


    $scope.submitEdit = function () {
        let editedVehicle = {
                Id: $scope.editVehicleId,
                Capacity: $scope.editVehicleCapacity,
                Driver: $scope.editVehicleDriver,
                Make: $scope.editVehicleMake,
                Model: $scope.editVehicleModel,
                Registration: $scope.editVehicleRegistration,
        }

        $http.put($scope.vehicleAPIUrl, editedVehicle)
            .success(function () {
                $scope.isUpdating = false
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.delVehicle = function (Id) {
        let itemToDelete = $scope.vehicles.indexOf(Id)

        $scope.vehicles.splice(itemToDelete, 1)

        $http.delete(`${$scope.vehicleAPIUrl}/${Id}`)
            .success(function (res) {
                $scope.init()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    }

    $scope.init()
})