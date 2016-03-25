import angular from "angular";
import options from "./options";
require("./index.css");

let app = angular.module("app", []);

app.factory("flickr", ["$http", $http => {

  let object = {};
  object.getPhotos = string => {
    return $http.get(string);
  }
  return object;
}]);

app.controller("appController", ["$scope", "flickr", ($scope, flickr) => {
  $scope.modalShown = true;
  $scope.toggleModal = () => {
    $scope.modalShown = !$scope.modalShown;
  };

  $scope.photos = [];
  let page = 1;
  const callApi = () => {
    // just some arbitrary value for now
    if (page < 20) {
      const string = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        options.F_API_KEY + "&tags=" + options.search + "&page=" + page + "&has_geo=1&extras=geo&format=json&nojsoncallback=1";

      flickr.getPhotos(string).then(response => {
        if (response.data.photos.photo.length > 0) {
          $scope.photos.push(...response.data.photos.photo);
          page++;
          callApi();
        }
      }, function(error) {
        console.log(error);
      });
    }
  };

  callApi();
}]);

app.directive("map", () => {
  // directive link function
  const link = function(scope, element, attrs) {
    let map, infoWindow;

    const mapOptions = {
      center: new google.maps.LatLng(60, 0),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: options.styles
    };

    const initMap = () => {
      if (map === undefined) {
        map = new google.maps.Map(element[0], mapOptions);
      }
    }

    // place a marker
    const setMarker = (map, position, title, content) => {
      const markerOptions = {
        position: position,
        map: map,
        title: title,
        icon: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png"
      };

      const marker = new google.maps.Marker(markerOptions);

      google.maps.event.addListener(marker, "click", () => {
        if (infoWindow !== undefined) {
          infoWindow.close();
        }

        const infoWindowOptions = {
          content: content
        };
        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        infoWindow.open(map, marker);
      });
    }

    scope.$watchCollection("photos", (newPhotos, oldPhotos) => {
      newPhotos.forEach(el => {
        const content = "<figure><a href=\"https://www.flickr.com/photos/" + el.owner + "/" + el.id +
          "\"><img src=\"http://farm" + el.farm + ".static.flickr.com/" + el.server + "/" +
          el.id + "_" + el.secret + ".jpg\"></img></a><figcaption><a href=\"https://www.flickr.com/photos/" +
          el.owner + "/" + el.id + "\">" + el.title + "</a></figcaption></figure>";

        setMarker(map, new google.maps.LatLng(el.latitude, el.longitude), el.title, content);
      });
    });

    // init
    initMap();
  };

  return {
    restrict: "A",
    template: "<div class=\"map\"></div>",
    replace: true,
    link: link
  };
});

app.directive('modal', () => {
  const link = (scope, element, attrs) => {
    scope.hideModal = function() {
      scope.show = false;
    };
  };
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true, // we want to insert custom content inside the directive
    template: "<div class='ng-modal' ng-show='show'><div class='modal-overlay' ng-click='hideModal()'></div><div class='modal-dialog' ng-style='dialogStyle'><div class='modal-close' ng-click='hideModal()'>X</div><div class='modal-dialog-content' ng-transclude></div></div></div>",
    link: link
  };
});
