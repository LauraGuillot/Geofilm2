var key = "AIzaSyDOAkh5jpRroX29qMjb2hWKJCZHnY4zJDU";



/**
 * Convertir une série de données indiquant une adresse en adresse reconnaissable
 * pour la convertir en position géographique
 * @param {type} number
 * @param {type} street
 * @param {type} complement
 * @param {type} postal
 * @param {type} city
 * @param {type} country
 * @returns {String}
 */
function codeAddressJson(number, street, complement, city, country) {
    var address = complement + " " + number + " " + street + " " + city + " " + country;
    return address;
}

/**
 * Convertit une adresse en position géographique, à l'aide d'une fonction
 * asynchrone et d'un callback, et de l'api google maps
 * @param {type} addr
 * @param {type} callback
 * @returns {undefined}
 */
function geocodeAddress(addr, callback) {
    var geocoder = new google.maps.Geocoder();
    //Utilisation de la fonction geocode
    geocoder.geocode({address: addr}, function(results,status){
        //Si geocode fonctionne, et donc qu'une position est donnée à partir de l'adresse, on affiche cette position
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById("output").innerHTML = results[0].geometry.location;
            
            //Sinon, on affiche un message d'erreur
        } else {
            document.getElementById("error_mandatory").innerHTML = error_localisation_fr;
        }
        callback(results[0]);
    });
    var l =document.getElementById("output").value.toString();
    document.getElementById("output").innerHTML = l;
}