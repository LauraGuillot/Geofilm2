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
        zoom: 6
    });
    //Ajout du géocoder : barre de recherche par adresse
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        "client": "api"
    });
    map.addControl(geocoder);
    // Zoom 
    map.addControl(new mapboxgl.NavigationControl());
    //Obtention (si possible) de la position de l'utilisateur
    getLocation();
    // Affichage de la position de l'utilisateur
    displayPosition();
    //Début du tracking de la position de l'utilisateur
    startTracker();
    //Au clic, on affiche les coordonnées
    map.on('click', getPos);

//    map.on('click', function (e, callback) {
//        var location = JSON.stringify(e.lngLat);
//
//        var wrapped = e.lngLat.wrap();
//        addMarker(wrapped.lng, wrapped.lat);
//        var point = "(" + wrapped.lat + "," + wrapped.lng + ")";
//        document.getElementById('output').innerHTML = point;

//        mapboxgl.geocodeReverse(
//                {latitude: wrapped.lat, longitude: wrapped.lng},
//                {types: 'country', limit: 1},
//                function (err, res) {
//                    // res is a GeoJSON document with up to 1 geocoding match
//                });


    document.getElementById("output").innerHTML = document.getElementById("output").value.toString();
    
}

/**
 * Permet de récupérer une position de la map box sous forme de string
 * @param {type} e
 * @returns {String}
 */
function getPos(e) {
    var location = JSON.stringify(e.lngLat);
    var wrapped = e.lngLat.wrap();
    var point = "(" + wrapped.lat + "," + wrapped.lng + ")";
    document.getElementById("output").innerHTML = point;
    position = point;
    return point;
}






/**
 * Affichage des marqueurs pour les multimédias
 */
function displayMarkers() {
    //Pour chaque marqueur
    var cpt = document.getElementById("nbMarkers").value;
    for (var i = 0; i < cpt; i++) {
        //On récupère longitude et latitude
        var point = document.getElementById("p" + i).value;
        point = point.substring(6, point.length - 1);
        var pt = point.split(",");
        var x = pt[0];
        var y = pt[1];
        //On affiche le marqueur
        addMarker(x, y);
    }
}

/**
 * Ajout d'un marker sur la carte
 * @param {double} x longitude
 * @param {double} y latitude
 * @returns {marker}
 */
function addMarker(x, y) {

    //Div pour le marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(Ressources/marker_red.png)';
    el.style.width = '25px';
    el.style.height = '35px';
    //Ajout du marker
    var marker = new mapboxgl.Marker(el, {offset: [0, 0]})
            .setLngLat([y, x])

            .addTo(map);
    return marker;
}

/**
 * Permet d'ajouter un marker à une carte, en fusionnant sa localisation avec une localisation proche à moins de 0,0001°
 * afin de ne pas surcharger la map
 * @param {type} x
 * @param {type} y
 * @returns {unresolved}
 */
//Voir fichier Multimedia pour fonction
function addMarker_onclick(x, y) {
    L = getMultibyPos();
    var i = 0;
    var bool = true;
    while (i < L.size() && bool) {

    }
    //Div pour le marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(Ressources/marker_red.png)';
    el.style.width = '25px';
    el.style.height = '35px';
    //Ajout du marker
    var marker = new mapboxgl.Marker(el, {offset: [0, 0]})
            .setLngLat([y, x])

            .addTo(map);
    return marker;
}

/**
 * Fonction permettant de calculer la distance entre 2 points
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @returns {Number}
 */
function distance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt(a * a + b * b);
    return c;
}


