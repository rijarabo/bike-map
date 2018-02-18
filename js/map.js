
// NYC Center
var centerMap =[40.743225,-74.003735];
var zoomMap= 12;
var map = L.map('my-map').setView(centerMap, zoomMap);

// map //

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// ad points to map with some styling //

// define options //
// var NYOptions = {
//   fillColor: "#00BFFF",
//   color: "white",
//   weight: 1,
//   opacity: 1,
//   fillOpacity: 0.5,
//   radius: NYstations.feature.tot_in
// };

L.geoJSON(NYstations, {
  pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,
          {
            fillColor: "#00BFFF",
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5,
            radius: 3
          })
        forEach.bindPopup('hello' + NYstations.feature.properties.station); // hello is placeholder for actual info
  }
}).addTo(map);
