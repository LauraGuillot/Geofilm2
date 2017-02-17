//Latitude et longitude de l'utilisateur
var lat = 48.862725;
var long = 2.287592000000018;

//Précédente position enregistrée
var prec;
var center = 0;

/*
 * ****************************************************************************
 * Définition des marqueurs
 * *****************************************************************************
 */

//Marqueur bleu pour la position de l'utilisateur
var blueIcon = L.icon({
    iconUrl: 'Ressources/marker_blue.png',
    shadowUrl: 'Ressources/marker_shadow.png',
    iconSize: [24, 35], // size of the icon
    shadowSize: [24, 24], // size of the shadow
    iconAnchor: [12, 17], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 17], // the same for the shadow
    popupAnchor: [0, -12] // point from which the popup should open relative to the iconAnchor
});

//Marquer rouge pour les multimédias
var redIcon = L.icon({
    iconUrl: 'Ressources/marker_red.png',
    shadowUrl: 'Ressources/marker_shadow.png',
    iconSize: [24, 35], // size of the icon
    shadowSize: [24, 24], // size of the shadow
    iconAnchor: [12, 17], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 17], // the same for the shadow
    popupAnchor: [0, -12] // point from which the popup should open relative to the iconAnchor
});


/*
 * ****************************************************************************
 * Géolocalisation
 * ****************************************************************************
 */

/**
 * Obtention de la position de l'utilisateur
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(recordPosition);
    } else {
        //Afficher message d'erreur si pas de géolocalisation 
        console.log("error");
        $('#gps_error_modal').modal('show');
    }
}

/**
 * Enregistrement de la position de l'utilisateur 
 * @param {type} position
 */
function recordPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

/**
 * Affichage d'un marqueur de position pour l'utilisateur
 */
function displayPosition() {
    if (prec != null) {
        mymap.removeLayer(prec);
    }

    if (!(lat == 48.862725 && long == 2.287592000000018)) {
        //Centrage initial
        if (center == 0) {
            center = 1;
            mymap.panTo(new L.LatLng(lat, long));
        }
        prec = L.marker([lat, long], {icon: blueIcon}).addTo(mymap);
    }
}

/*
 * ****************************************************************************
 * Tracking
 * ****************************************************************************
 */

/**
 * Tracking de la position de l'utilisateur : à chaque nouvelle position, 
 * enregistrement et affichage de celle-ci
 * @param {type} position
 */
function trackPosition(position) {
    recordPosition(position);
    displayPosition();
}

/**
 * Lancement du tracking
 */
function startTracker() {
    navigator.geolocation.watchPosition(trackPosition);
}


