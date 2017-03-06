var key = "AIzaSyDOAkh5jpRroX29qMjb2hWKJCZHnY4zJDU";


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
function codeAddressJson(number, street, complement, city, country) {
    var address = complement + " " + number + " " + street + " " + city + " " + country;
    return address;
}

/**
 * 
 * @param {type} addr
 * @param {type} callback
 * @returns {undefined}
 */
function geocodeAddress(addr, callback) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: addr}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById("output").innerHTML = results[0].geometry.location;
            

        } else {
            document.getElementById("error_mandatory").innerHTML = error_localisation_fr;
            
            
        }
        callback(results[0]);
    });
}


function geocode(adresse) {


}




