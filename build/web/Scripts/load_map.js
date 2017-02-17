//Carte
var mymap;

/**
 * Chargement de la carte avec tous les marqueurs
 */
function loadMap() {

    //Affichage de la carte, centrée sur Paris
    mymap = L.map('mapid').setView([48.862725, 2.287592000000018], 14);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZ2VvZmlsbSIsImEiOiJjaXlqd2d1NGUwMDA5MnFrMXUyaHdtYmt5In0.zaWf5uM65g8RiAj9LACvHw'
    }).addTo(mymap);

    //Affichage des marqueurs pour les multimédias
    displayMarkers();

    //Obtention (si possible) de la position de l'utilisateur
    getLocation();

    // Affichage de la position de l'utilisateur
    displayPosition();

    //Début du tracking de la position de l'utilisateur
    startTracker();
}

/**
 * Affichage des marqueurs pour les multimédias
 */
function displayMarkers() {
    var cpt = document.getElementById("nbMarkers").value;

    for (var i = 0; i < cpt; i++) {
        var point = document.getElementById("p" + i).value;

        point = point.substring(6, point.length - 1);
        var pt = point.split(",");
        var x = pt[0];
        var y = pt[1];
        L.marker([x, y], {icon: redIcon}).addTo(mymap);
    }
}
