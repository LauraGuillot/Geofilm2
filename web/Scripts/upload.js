/**
 * Accès à la page d'upload
 * @returns {undefined}
 */
function open_upload() {
    var form = document.createElement('form');
    form.method = "GET";
    form.action = "uploading.htm";

    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);

    document.body.appendChild(form);
    form.submit();

}


/**
 * Saisie des informations d'upload d'un multimédia
 * On ne vérifie pas si le type de source du fichier entré correspond
 * au type de source entré par l'utilisateur, pour le moment
 */
function upload() {

//On récupère les infos
    var type_video = document.getElementById("upload_video").value;
    var type_image = document.getElementById("upload_image").value;
    var type_sound = document.getElementById("upload_sound").value;
    var title = document.getElementById("upload_title_entered").value;
    var source = document.getElementById("upload_source_entered").value;
    var type_media = "";
    //TODO : path ???
    //TODO : the_geom variable
    //TODO : personne variable

    //Récupération de la date :
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    //Variable du jour :
    var date = document.getElementById("day").value + "/" + document.getElementById("month").value + "/" + document.getElementById("year");
    // Pour l'instant, la reconnaissance d'adresse n'est pas effective.
    // On contrôle seulement si des caractères sont bien entrés dans les champs obligatoires pour une adresse
    var number = document.getElementById("numero_entered").value;
    var street = document.getElementById("street_entered").value;
    var postal_code = document.getElementById("postal_code_entered").value;
    var city = document.getElementById("city_entered").value;
    var country = document.getElementById("country_entered").value;
    var file = document.getElementById("file_entered").value;
    //Si la saisie est valide
    if (valid_form_upload1(type_video, type_sound, type_image, title, source)) {

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;
                if (answer == "true") {

                    //Appel du controller pour effuectuer l'ajout d'un multimédia via un formulaire (Post)

//                    var form = document.createElement('form');
//                    form.method = "POST";
//                    form.action = "uploading.htm";
//
//                    var c1 = document.createElement('input');
//                    c1.type = "hidden";
//                    c1.name = "email";
//                    c1.value = email;
//                    form.appendChild(c1);
//
//                    var c2 = document.createElement('input');
//                    c2.type = "hidden";
//                    c2.name = "mdp";
//                    c2.value = mdp;
//                    form.appendChild(c2);
//
//                    document.body.appendChild(form);
//                    form.submit();
//
//                    //Si l'addresse email est déjà prise   
//                } else {
//                    //Message d'erreur
//                    document.getElementById("inscription_error").innerHTML = error_email_already_taken_fr;
//                }
//
//            }
//        };
//        var data = "email=" + email + "&" + "mdp=" + mdp + "&" + "name=" + name + "&" + "firstname=" + firstname;
//        xhttp.open("GET", "ControlInscriptionServlet?" + data, true);
//        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
//        xhttp.send();
                    //TODO
                }
            }

        }
    }
}

/**
 * Vérifier qu'une valeur est entrée pour le type de multimédia (i.e. qu'une case est bien cochée)
 * et modifie la valuer de type_media en fonction du type de multimédia
 * @param {type} video
 * @param {type} sound
 * @param {type} image
 * @param {type} type_media
 * @returns {Boolean}
 */
function valid_multimedia(video, sound, image, type_media) {

    if (video == "v") {
        type_media = "VIDEO";
        return true;
    }
    if (image == "i") {
        type_media = "IMAGE";
        return true;
    }
    if (sound == "s") {
        type_media = "SOUND";
        return true;
    } else {
        document.getElementById("error_multimedia_type").innerHTML = error_multimedia_type_fr;
        return false;
    }
}


/**
 * Vérifier que le titre du multimédia n'est pas vide
 * @param {String} name
 * @returns {Boolean}
 */
function valid_titre(name) {
    if (name == "") {
//Message d'erreur
        document.getElementById("error_name").innerHTML = error_name_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérifier qu'un type de source a été entré
 * @param {type} value
 * @returns {Boolean}
 */
function valid_source(type) {
    if (type == upload_source_search_fr) {
//Message d'erreur
        document.getElementById("error_source_type").innerHTML = error_multimedia_type_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérifier si un champ n'est pas vide, avec renvoi d'un message général
 * demandant de remplir les champs obligatoires
 * @param {type} number
 * @returns {Boolean}
 */
function valid_number(number) {
    if (number == "") {
//Message d'erreur
        document.getElementById("error_mandatory").innerHTML = error_mandatory_fr;
        return false;
    } else {
        return true;
    }
}



/**
 * Validation du premier formulaire (infos générales)
 * @param {type} video
 * @param {type} image
 * @param {type} sound
 * @param {type} name
 * @param {type} source
 * @returns {Boolean}
 */
function valid_form_upload1(video, image, sound, name, source) {
    return valid_multimedia_type(video, sound, image) && valid_name(name) && valid_source(source);
}

/**Validation du second formulaire d'upload (localisation de la vidéo)
 * @param {type} number
 * @param {type} street
 * @param {type} postal_code
 * @param {type} city
 * @param {type} country
 * @returns {Boolean}
 */
function valid_form_upload2(number, street, postal_code, city, country) {
    return valid_number(number) && valid_number(street) && valid_number(postal_code) && valid_number(city) && valid_number(country);
}