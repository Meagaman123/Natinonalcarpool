angular
  .module("nccNavigation")
  .controller("navigationController", function($scope) {
    $scope.toggleMenuLink = function($event) {
      $scope.init = function() {
        $scope.bookingShow = true;
      };
      $scope.init();

      /* 
         Used to toggle the views between Booking/Vehicle and Routes. We get the route name from the name of the <a> tag
         */
      let clickedLink = $event.currentTarget.name;

      $scope.bookingShow = false;
      $scope.vehicleShow = false;
      $scope.routeShow = false;

      switch (clickedLink) {
        case "BOOKINGS":
          $scope.bookingShow = true;
          break;
        case "ROUTES":
          $scope.routeShow = true;
          break;
        case "VEHICLES":
          $scope.vehicleShow = true;
          break;
        case "LO":
          location.reload();
          break;
      }
    };
  });
