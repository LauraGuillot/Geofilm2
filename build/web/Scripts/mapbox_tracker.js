//Latitude et longitude de l'utilisateur
var lat = 48.862725;
var long = 2.287592000000018;

//Précédente position enregistrée
var prec;
var center = 0;

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
        prec.remove();
    }
    if (!(lat == 48.862725 && long == 2.287592000000018)) {
        //Centrage initial
        if (center == 0) {
            center = 1;
            map.flyTo({center: [long, lat]});
        }

        //Div pour le marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(Ressources/marker_blue.png)';
        el.style.width = '25px';
        el.style.height = '35px';

        //Ajout du marker
        prec = new mapboxgl.Marker(el, {offset: [0, 0]})
                .setLngLat([long, lat])
                .addTo(map);
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
