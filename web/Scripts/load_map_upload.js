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
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    
    // Zoom 
    map.addControl(new mapboxgl.NavigationControl());
    //Obtention (si possible) de la position de l'utilisateur
    getLocation();
    // Affichage de la position de l'utilisateur
    displayPosition();
    //Affichage des marqueurs pour les multimédias
    displayMarkers();
    //Début du tracking de la position de l'utilisateur
    startTracker();
    
    //Au clic, on affiche les coordonnées et on affiche un marqueur
    map.on('click', function (e) {
        var location = JSON.stringify(e.lngLat);
        document.getElementById('output').innerHTML =
                // e.lngLat is the longitude, latitude geographical position of the event
                location;
                
        var wrapped = e.lngLat.wrap();
        //On créé la popup qui s'affichera au clic sur le marqueur
        
//        addMarker(wrapped.lng, wrapped.lat);
    });
    
    
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
