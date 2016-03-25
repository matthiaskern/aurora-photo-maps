const options = {
  lat: 45,
  lon: 73,
  search: "Aurora%20Borealis",
  G_API_KEY: "AIzaSyD8BSfd34T4yJr8JN8UBMQIe4Fbg_3x5BQ",
  F_API_KEY: "2738aab1da8491e2fce4f37a3a038c42",
  styles: [
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e5e8eb" }
      ]
    },{
      "featureType": "water",
      "stylers": [
        { "visibility": "on" },
        { "color": "#808080" },
        { "lightness": -41 }
      ]
    },{
      "featureType": "road",
      "stylers": [
        { "visibility": "on" },
        { "color": "#c88080" }
      ]
    },{
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "saturation": 22 },
        { "color": "#80997f" }
      ]
    },{
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    }
  ]
};

export default options;
