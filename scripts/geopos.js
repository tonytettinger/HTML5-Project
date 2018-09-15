function createMap() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 500
        });
    } else {
        document.getElementById("map").innerHTML = "Sorry you don't have geolocation support";
    }
};

function OnError() {
    var mapDiv = document.getElementById("map");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mapDiv.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "An unknown error occurred."
            break;
    }
};

function OnSuccess(position) {
    showMap(
        position.coords.longitude,
        position.coords.latitude
    );
};

function showMap(lon, lat) {
    
mapboxgl.accessToken = 'pk.eyJ1IjoidG9uaXF1ZXoiLCJhIjoiY2pqaTR6aWFqMGk3bTNxczRodWdmbXcxayJ9.bEV6FwTuh4rfs-1rdmnweQ';
let map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [lon, lat], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

L.marker([lon, lat]).addTo(map);
}