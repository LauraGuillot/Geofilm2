mapboxgl.accessToken = '<your access token here>';
var geocoder;

function initialize_geocoder() {
    geocoder = new google.maps.Geocoder();
}

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

function codeAddress() {
//on parse les adresses saisies (une par ligne)
    var address_raw = document.getElementById("address_complement_entered").value + " " + document.getElementById("number_entered").value + ", " + document.getElementById("street_entered");
    var address = address_raw.split('\n');
    var seuil = 5;
    document.getElementById('infos').innerHTML = "";
    document.getElementById('résultats').innerHTML = "";
    document.getElementById('infos').innerHTML += address.length + " requêtes saisies : ";
    for (var i = 0; i < address.length; i++)
    {

//ce bout là limite le nombre de requêtes envoyées simultanément pour éviter une erreur du type OVER QUERY LIMIT
        if (i % seuil == 0 && i > seuil) {
            alert(i + " requêtes passées sur " + address.length);
        }
//on demande les coordonnées à google
        geocoder.geocode({'address': address[i]},
                function (results, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        document.getElementById('résultats').innerHTML += results[0].geometry.location;
                    } else {
                        alert("Ça marche pas parce que " + status);
                    }
                });
    }
}

function geocodeAddress(addr) {

    L.mapbox.accessToken = '<your access token here>';
    var geocoder = L.mapbox.geocoder(addr);

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




