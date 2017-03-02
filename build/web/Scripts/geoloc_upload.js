

//function initialize_geocoder() {
//    geocoder = new google.maps.Geocoder();
//}

/**
 * 
 * @param {type} number
 * @param {type} street
 * @param {type} complement
 * @param {type} postal
 * @param {type} city
 * @param {type} country
 * @returns {String}
 */
function codeAddressJson(number, street, complement, postal, city, country) {
    var address = complement + " " + number + ", " + street + ", " + postal + ", " + city + ", " + country;
    return address;
}



function geocodeAddress(addr) {
//    mapboxgl.accessToken = 'pk.eyJ1IjoicHBhbG1hcyIsImEiOiJjaXpvYTNlNWcwMDJhMzJueTY0ajcyM2s1In0.P_bIPUxWHbVMmYaOenvFaA';
//    var mapG = L.mapbox.map('map', 'mapbox.streets');
//    map.addControl(new MapboxGeocoder({
//        accessToken: mapboxgl.accessToken
//    }));
//
//    var geocoder = L.mapbox.geocoder('mapbox.places-v1');
//    var mapG = mapboxgl.map('map-geocoding', 'mapbox.streets');
//    if (geocoder.query(addr, showMap)) {
//        return true;
//    } else {
//        return false;
//    }
//
//    function showMap(err, data) {
//        if (err)
//            throw err;
//        if (data.lbounds) {
//            var marker = [data.latlng[0], data.latlng[1]];
//        } else if (data.latlng) {
//            var marker = [data.latlng[0], data.latlng[1]];
//        }
//    }


//    geocoder.geocode({'address': addr}, function (results, status) {
//        /* Si la géolocalisation réussit */
//        L.mapbox.accessToken = '<your access token here>';
//
//        if (status == mapboxgl.Map.GeocoderStatus.OK) {
//            /* On récupère les coordonnées de l'adresse */
//            coords = results[0].geometry.location;
//            return true;
//
//        } else {
//            document.getElementById("error_mandatory").innerHTML = error_localisation_fr;
//            return false;
//        }
//    });
}
/**
 * Fonction permettant de convertir la position géographique en une adresse
 * @returns {undefined}
 */
function setAdress(){
    
}



