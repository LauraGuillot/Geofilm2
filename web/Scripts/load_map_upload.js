//Carte
var map;
/**
 * Chargement de la carte avec tous les marqueurs
 */
function loadMap() {
    //Création de la carte, centrage initial sur Paris
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZmlsbSIsImEiOiJjaXlqd2d1NGUwMDA5MnFrMXUyaHdtYmt5In0.zaWf5uM65g8RiAj9LACvHw';
    map = new mapboxgl.Map({
        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [2.287592000000018, 48.862725],
        zoom: 10
    });
    //Ajout du géocoder : barre de recherche par adresse
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
   
    // Zoom 
    map.addControl(new mapboxgl.NavigationControl());
    
    //Obtention (si possible) de la position de l'utilisateur
    getLocation();
    // Affichage de la position de l'utilisateur
    displayPosition();
    //Début du tracking de la position de l'utilisateur
    startTracker();
}



/**
 * Ajout d'un marker sur la carte
 * @param {double} x longitude
 * @param {double} y latitude
 * @param {popup} popup
 * @returns {marker}
 */
function addMarker(x, y, popup) {

    //Div pour le marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(Ressources/marker_red.png)';
    el.style.width = '25px';
    el.style.height = '35px';
    //Ajout du marker
    var marker = new mapboxgl.Marker(el, {offset: [0, 0]})
            .setLngLat([y, x])
            .setPopup(popup)
            .addTo(map);
    return marker;
}




L.mapbox.accessToken = '<your access token here>';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([0, 0], 2);

var coordinates = document.getElementById('coordinates');

var marker = L.marker([0, 0], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#f86767'
    }),
    draggable: true
}).addTo(map);

// every time the marker is dragged, update the coordinates container
marker.on('dragend', ondragend);

// Set the initial marker coordinate on load.
ondragend();

function ondragend() {
    var m = marker.getLatLng();
    coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
}




