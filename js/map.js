
// NYC Center
var centerMap =[40.757790,-73.979015];
var zoomMap= 13;
var map = L.map('my-map').setView(centerMap, zoomMap);
var angle= Math.PI / 6;

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
  // var TotTripsArray = [500,        200,      100,      50,       10,      0];
	var TotTripsArray = [200,        100,      50,       20,       10,       0];
  var radiusArray   = [20,         15,       10,       5,        3,        3];
  var TotcolorArray = ['#8B008B','#C71585','#FF1493','#FF69B4','#FFB6C1','#C0C0C0'];
//                     0           1         2         3         4         5

// StartEnd
//                      0          1         2         3         4        5
  var SETripsArray  = [200,        100,      50,       20,       10,       0];
  var SEradiusArray = [20,         15,       10,       5,        3,        3];
	var ScolorArray   = ['#006400','#008000','#6B8E23','#32CD32','#9ACD32','#C0C0C0'];
	var EcolorArray   = ['#DC143C','#FF0000','#FF4500','#FFA500','#FFD700','#C0C0C0'];
//                     0           1         2         3         4         5

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

function getSERadius(r) {
  return r >SETripsArray[0] ? SEradiusArray[0] :
         r >SETripsArray[1] ? SEradiusArray[1] :
         r >SETripsArray[2] ? SEradiusArray[2] :
         r >SETripsArray[3] ? SEradiusArray[3] :
         r >SETripsArray[4] ? SEradiusArray[4] :
              SEradiusArray[5] ;
}

function getStartColor(c) {
  return c >SETripsArray[0] ? ScolorArray[0] :
         c >SETripsArray[1] ? ScolorArray[1] :
         c >SETripsArray[2] ? ScolorArray[2] :
         c >SETripsArray[3] ? ScolorArray[3] :
         c >SETripsArray[4] ? ScolorArray[4] :
              ScolorArray[5] ;
}

function getEndColor(c) {
  return c >SETripsArray[0] ? EcolorArray[0] :
         c >SETripsArray[1] ? EcolorArray[1] :
         c >SETripsArray[2] ? EcolorArray[2] :
         c >SETripsArray[3] ? EcolorArray[3] :
         c >SETripsArray[4] ? EcolorArray[4] :
              EcolorArray[5] ;
}

function StartStyle(feature) {
  return {
    weight: 0,
    opacity: 1,
    fillOpacity: 0.5,
    fillColor: getStartColor(feature.properties.start), //
    radius: getSERadius(feature.properties.start)
  };
}

function EndStyle(feature) {
  return {
    weight: 0,
    opacity: 1,
    fillOpacity: 0.5,
    fillColor: getEndColor(feature.properties.end), //
    radius: getSERadius(feature.properties.end)
  };
}

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

// layer control tutorial: http://leafletjs.com/examples/layers-control/

// TOTAL TRIPS FOR EACH STATION //
var TOTALgeojson = L.geoJson(NYstations, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng)
  },
  style: TotStyle, // TotStyle property calls "style" object defined above
  onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
}).addTo(map);;

// STARTING TRIPS FOR EACH STATION //
var STARTgeojson = L.geoJson(NYstations, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng)
  },
  style: StartStyle, // StartStyle property calls "style" object defined above
  onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
});

// ENDING TRIPS FOR EACH STATION //
var ENDgeojson = L.geoJson(NYstations, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng)
  },
  style: EndStyle, // EndStyle property calls "style" object defined above
  onEachFeature: onEachFeature // onEachFeature property calls "onEachFeature" function defined above
});

var overlay = {
	"All trips": TOTALgeojson,
	"Starting trips": STARTgeojson,
	"Ending trips": ENDgeojson,
};

L.control.layers(overlay,null,{collapsed:false}).addTo(map);
