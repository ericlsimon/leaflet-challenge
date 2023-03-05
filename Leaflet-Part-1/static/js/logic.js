// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//   var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// Create a baseMaps object to hold the streetmap layer.
var baseMaps = {
    "Street Map": streetmap
};

// Create an overlayMaps object to hold the bikeStations layer.
//   var overlayMaps = {
//     "Bike Stations": bikeStations
//   };

// Create the map object with options.
var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 3,
    layers: [streetmap]
});


// create a layer grouop for control function
//overlays are checkboxes
//1. layer group for earthquakes
//2. layer for tectonic plates
let earthquake = new L.LayerGroup();
var overlays = {
    "Earthquake": earthquake
};

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.(Applied the base maps argument)
L.control.layers(baseMaps, overlays).addTo(map);

// use D3.json to load the JSON file
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function (data) {
    console.log(data);
//read a feature and display obj/dict
    function styleInfo(feature){
        return {
            opacity:1,
            fillOpacity:1,
            fillColor:"#000000",
            color:"#000000",
            radius:(feature.properties.mag * 6),
            weight:0.75
        };
    }


    //replace #00000 with a function that will read a property from the file
    //if the var = 0 else
    //if mag >5 return this color
    //(return quotes #000)
    //define a function for the radius START HERE

    
    //stay inside function or var gets released
    L.geoJson(data,{

        pointToLayer:function(feature,latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
        style:styleInfo
        //add the popup
    

    }).addTo(earthquake);

    //add the earthquake layer 
    earthquake.addTo(map);

});
// get circle markers to show up