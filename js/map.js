
// NYC Center
var centerMap =[40.743225,-74.003735];
var zoomMap= 12;
var map = L.map('my-map').setView(centerMap, zoomMap);

// map //

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

// **********************************
// define arrays of style options //
// **********************************
var classArray=['A','B','C','D'];

// Total
//                      0          1         2         3         4         5
  var TotTripsArray = [500,        300,      200,      100,      0,       0];
  var radiusArray   = [20,         15,       10,       5,        3,       3];
  var TotcolorArray = ['#8B008B','#C71585','#FF1493','#FF69B4','#FFB6C1'];
//                     0           1         2         3         4         5

// // StartEnd
// //                      0          1         2         3         4         5
//   var SETripsArray = [200,        100,      50,       20,      10,       0];
//   var radiusArray  = [20,         15,       10,       5,        3,       3];
//   var ScolorArray = ['#9ACD32','#32CD32','#6B8E23','#008000','#006400'];
//   var EcolorArray = ['#FEB24C','#FF6347','#FF4500','#BD0026','#800026'];
// //                     0           1         2         3         4         5

// **********************************
// define functions for start / end //
// **********************************

//  RADIUS COLOR AND STTYLE FOR TOTAL TRIPS

function getTotRadius(r) {
  return r >TotTripsArray[0] ? radiusArray[0] :
         r >TotTripsArray[1] ? radiusArray[1] :
         r >TotTripsArray[2] ? radiusArray[2] :
         r >TotTripsArray[3] ? radiusArray[3] :
         r >TotTripsArray[4] ? radiusArray[4] :
              radiusArray[5] ;
}

function getTotColor(c) {
  return c >TotTripsArray[0] ? TotcolorArray[0] :
         c >TotTripsArray[1] ? TotcolorArray[1] :
         c >TotTripsArray[2] ? TotcolorArray[2] :
         c >TotTripsArray[3] ? TotcolorArray[3] :
         c >TotTripsArray[4] ? TotcolorArray[4] :
              TotcolorArray[5] ;
}


function TotStyle(feature) {
  return {
    weight: 0,
    opacity: 1,
    fillOpacity: 0.5,
    fillColor: getTotColor(feature.properties.total), //
    radius: getTotRadius(feature.properties.total)
  };
}

//  RADIUS COLOR AND STTYLE FOR START END TRIPS
// function getStartEndRadius(d) {
//   return d >StartEndTripsArray[0] ? radiusArray[0] :
//          d >StartEndTripsArray[1] ? radiusArray[1] :
//          d >StartEndTripsArray[2] ? radiusArray[2] :
//          d >StartEndTripsArray[3] ? radiusArray[3] :
//               radiusArray[5] ;
// }
//
// function getEndColor(c) {
//   return c >StartEndTripsArray[0] ? EndcolorArray[0] :
//          c >StartEndTripsArray[1] ? EndcolorArray[1] :
//          c >StartEndTripsArray[2] ? EndcolorArray[2] :
//          c >StartEndTripsArray[3] ? EndcolorArray[3] :
//               StartEndTripsArray[5] ;
// }
//
// function getStartColor(c) {
//   return c >StartEndTripsArray[0] ? StartcolorArray[0] :
//          c >StartEndTripsArray[1] ? StartcolorArray[1] :
//          c >StartEndTripsArray[2] ? StartcolorArray[2] :
//          c >StartEndTripsArray[3] ? StartcolorArray[3] :
//               StartEndTripsArray[5] ;
// }
//
// function StartStyle(feature) {
//   return {
//     weight: 2,
//     opacity: 1,
//     color: 'white',
//     fillOpacity: 0.7,
//     fillColor: getStartColor(feature.properties.start), //
//     radius: getDiameter(feature.properties.start)
//   };
// }
//
// function EndStyle(feature) {
//   return {
//     weight: 2,
//     opacity: 1,
//     dashArray: '3',
//     fillOpacity: 0.7,
//     fillColor: getEndColor(feature.properties.end), //
//     radius: getDiameter(feature.properties.end)
//   };
// }
//

function onEachFeature (feature,layer) {
  var popup=layer.bindPopup(`
    <b style='font-size: 120%'>Total trips:</b> ${feature.properties.total}  <br/>
    <b style='font-size: 120%'>Total trips staring:</b> ${feature.properties.start}  <br/>
    <b style='font-size: 120%'>Total trips ending:</b> ${feature.properties.end}
  `)
}
// **********************************
// ADD LAYERS                      //
// **********************************

// TOTAL TRIPS FOR EACH STATION //
TOTALgeojson = L.geoJson(NYstations, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng)
  },
  style: TotStyle, // TotStyle property calls "style" object defined above
  onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
}).addTo(map);

// // STARTING TRIPS FOR EACH STATION //
// STARTgeojson = L.geoJson(NYstations, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng)
//   },
//   style: StartStyle, // StartStyle property calls "style" object defined above
//   onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
// }).addTo(map);
//
// // ENDING TRIPS FOR EACH STATION //
// ENDgeojson = L.geoJson(NYstations, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng)
//   },
//   style: EndStyle, // EndStyle property calls "style" object defined above
//   onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
// }).addTo(map);
