//TODO : bouton précédent permettant de revenir en arrière ?


/**
 * Saisie dans la base de données des informations associées à l'upload d'un multimédia
 */
function upload() {

//RECUPERATION DES INFOS :
    var email = document.getElementById("email").value;
    var title = document.getElementById("upload_title_entered").value;
    var description = document.getElementById("upload_description_entered").value;
    var choice_source = getSourceChoice();
    var type_media = getMultiType();
    var idco = document.getElementById("idco").value;
    var source_name = document.getElementById("upload_source_title_entered").value;
    //TODO : path ???
    //TODO : variable du langage de l'objet ?
    var path = "";
    var language = "";
    var time_begin = document.getElementById("upload_time_begin").value;
    var time_end = document.getElementById("upload_time_end").value;
    //Récupération de la date :
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    //Variable du jour :
    var date = day + "/" + month + "/" + year;
    //ADRESSE

    var location = document.getElementById("output").innerHTML;
    var the_geom = ("POINT" + location).toString();
    //FORMAT FICHIER
    var file = document.getElementById("file_entered").value;
    //Si le format du fichier entré est valide, on peut ajouter les informations à la base de données
    if (valid_form_upload3()) {
        var format = getFileExtension(file);
        //on envoie à la servlet les informations
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet : true si toutes les requêtes sont bien exécutées dans la servlet
                var answer = xhttp.responseText;
                if (answer == "true") {

                    //Appel de la fonction suivante pour accéder à la globalMap
                    $('#upload_confirmed_form').modal('show');
                } else {
                    //Message d'erreur
                    document.getElementById("error_multimedia_already").innerHTML = error_multimedia_already_entered_fr;
                }

            }
        };
        var data = "idco=" + idco + "&" + "email=" + email + "&" + "title=" + title + "&" + "source_name=" + source_name + "&" + "choice_source=" + choice_source + "&" + "type_media=" + type_media + "&" + "date=" + date + "&" + "the_geom=" + the_geom + "&" + "format=" + format + "&" + "type=" + type_media + "&" + "description=" + description + "&" + "time_begin=" + time_begin + "&" + "time_end=" + time_end + "&" + "path=" + path + "&" + "language=" + language;
        xhttp.open("GET", "UploadServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}

/**
 * Vérifier qu'une valeur est entrée pour le type de multimédia (i.e. qu'une case est bien cochée)
 * et modifie la valeur de type_media placé en paramètre, en fonction du type de multimédia
 * @param {type} type_media
 * @returns {Boolean}
 */
function valid_multimedia(type_media) {
    //Test pour chaque case si elle a été cochée.
    //Si oui, on attribue à la vaiable type_media la valeur entrée par l'utilisateur
    if (document.getElementById("u_video").checked) {
        type_media = "VIDEO";
        return true;
    } else if (document.getElementById("u_image").checked) {
        type_media = "IMAGE";
        return true;
    } else if (document.getElementById("u_sound").checked) {
        type_media = "SON";
        return true;
        //Si aucune des cases n'est cochée, on renvoie un message d'erreur
    } else {
        document.getElementById("error_upload").innerHTML = error_multimedia_type_fr;
        return false;
    }
}

/**
 * Obtenir le type du multimédia entré
 * @returns {String}
 */
function getMultiType() {
    var type_media;
    if (document.getElementById("u_video").checked) {
        type_media = "VIDEO";
    } else if (document.getElementById("u_image").checked) {
        type_media = "IMAGE";
    } else if (document.getElementById("u_sound").checked) {
        type_media = "SON";
        //Si aucune des cases n'est cochée, on renvoie un message d'erreur
    }
    return type_media;
}

/**
 * Obtenir le choix de la source entrée par l'utilisateur (UNKNOWN, SERIE, GAME, FILM)
 * @returns {element@arr;options.value}
 */
function getSourceChoice() {
    var choice_source = document.getElementById("choice_source");
    var idx = choice_source.selectedIndex;
    var val = choice_source.options[idx].value;
    return val;
}





/**
 * Vérifier que le titre du multimédia n'est pas vide, sinon renvoyer une erreur
 * @param {String} name
 * @returns {Boolean}
 */
function valid_titre(name) {
    if (name.value == "") {
//Message d'erreur
        document.getElementById("error_upload").innerHTML = error_multimedia_name_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérifier qu'un type de source a été entré, sinon renvoyer une erreur
 * @param {type} value
 * @returns {Boolean}
 */
function valid_source(type) {
    if (type.value == "none") {
//Message d'erreur
        document.getElementById("error_upload").innerHTML = error_source_type_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérifier si un champ n'est pas vide, si non, renvoi d'un message général
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
 * Validation du premier formulaire : si la validation est ok, on passe au div suivant
 * permettant de proposer une localisation du multimédia
 * @param {type} title
 * @param {type} choice
 * @param {type} elem1
 * @param {type} elem2
 * @returns {Boolean}
 */
function valid_form_upload1(title, choice, elem1, elem2) {
    if (valid_multimedia("") && valid_titre(title) && valid_source(choice)) {
        //Rendre visible le bloc d'upload suivant, et cacher l'actuel
        visibilite_element(elem1);
        visibilite_element(elem2);
        return true;
        //Si la validation du formulaire est incorrecte, un message d'erreur s'affiche
    } else {
        return false;
    }
}


/**
 * Validation du second formulaire d'upload (localisation de la vidéo) : si la validation
 * est ok, on passe au div suivant d'upload du fichier
 * @param {type} elem1 Contenu à cacher
 * @param {type} elem2 Contenu à ouvrir
 * @returns {Boolean}
 */
function valid_form_upload2(elem1, elem2) {
    //Récupération des informations de localisation
    var number = document.getElementById("numero_entered").value;
    var street = document.getElementById("street_entered").value;
    var postal_code = document.getElementById("postal_code_entered").value;
    var city = document.getElementById("city_entered").value;
    var country = document.getElementById("country_entered").value;
    var complement = document.getElementById("address_complement_entered").value;
    //Lors de l'appel à cette fonction, l'élément d'id output contient la géolocalisation du lieu entré
    //par l'utilisateur si celui-ci a cliqué sur la map
    var geoloc = document.getElementById("output").innerHTML;
    //Si l'utilisateur n'a pas cliqué sur la carte, on vérifie qu'il a entré une adresse dans les champs
    if ((geoloc == "") || (geoloc == undefined)) {
        if ((valid_number(number) && valid_number(street) && valid_number(postal_code) && valid_number(city) && valid_number(country))) {
            geocodeAddress(codeAddressJson(number, street, complement, city, country), function (localisation) {
                if (localisation !== undefined) {
                    visibilite_element(elem1);
                    visibilite_element(elem2);
                }
            });
            return true;

        } else {
            return false;

        }
    } else {
        visibilite_element(elem1);
        visibilite_element(elem2);
        return true;

    }
}

/**
 * Peret de vérifier que le fichier entré a un format valide. Cela ne vérifie cependant pas
 * la correspondance entre le type du fichier entré au div 1 et le format du fichier
 * @returns {undefined}
 */
function valid_form_upload3() {
    var filename = document.getElementById("file_entered").value;
    //Array des extensions autorisées/lues
    extensionsValides = new Array('avi', 'wmv', 'mov', 'mp4', 'mkv', 'mka', 'mks', 'flv', 'Divx', 'Xvid', 'divx', 'xvid', 'raw', 'jpeg', 'dng', 'tiff', 'png', 'gif', 'jpg', 'psd', 'wav', 'm4v', 'wmv', 'mpg', 'mpeg', 'mp3', 'm4a', 'aac');
    if (verifFileExtension(filename, extensionsValides)) {
        return true;
    } else {
        return false;
    }

}

/**
 * Rendre visible ou invisible un élément de la page HTM
 * @param {type} thingId Element que l'on veut rendre visible ou non
 * @returns {undefined}
 */
function visibilite_element(thingId) {

    var targetElement;
    targetElement = document.getElementById(thingId);
    if (targetElement.style.display == "none")
    {
        targetElement.style.display = "";
    } else {
        targetElement.style.display = "none";
    }
}


/**
 * Mise en place de l'autocomplétion pour les titres de source
 * @returns {void}
 */
function loadAutoComplete() {
    //On récupère le type de source séectionné
    var type = "none";
    var op2 = document.getElementById("upload_source_unknown");
    if (op2.selected) {
        type = "UNKNOWN";
    }
    var op3 = document.getElementById("upload_film");
    if (op3.selected) {
        type = "FILM";
    }
    var op4 = document.getElementById("upload_serie");
    if (op4.selected) {
        type = "SERIE";
    }
    var op5 = document.getElementById("upload_game");
    if (op5.selected) {
        type = "GAME";
    }

    //Si un type est sélectionné, on charge les cources de ce type dans l'autocomplétion
    if (type != 'UNKNOWN' && type != 'none') {
        var input = document.getElementById("upload_source_title_entered");
        var awesomplete = new Awesomplete(input);
        //Liste des titres
        var list = [];
        var nbsrc = document.getElementById("nbSources").value;
        for (var i = 0; i < nbsrc; i++) {
            if (type == document.getElementById("src_" + i + "_type").value) {
                list.push(document.getElementById("src_" + i + "_title").value);
            }
        }
        awesomplete.list = list;
    }
}
/**
 * Obtention de l'extension (type) d'un fichier
 * @param {String} filename nom du fichier uploadé
 * @returns {String}
 */
function getExtension(filename)
{
    var parts = filename.substr(filename.lastIndexOf(".") + 1);
    return (parts);
}


/**
 * Vérifie l'extension d'un fichier uploadé
 * @param {String} filename type du fichier uploadé
 * @param {Array<String>} listeExt liste des extensions autorisées
 * @returns {Boolean}
 */
function verifFileExtension(filename, listeExt) {

    if (filename == "") {
        document.getElementById("error_upload_file").innerHTML = error_file_none_fr;
        return false;
    } else {
        filename = filename.toLowerCase();
        var fileExt = getExtension(filename);
        for (i = 0; i < listeExt.length; i++)
        {
            if (fileExt == listeExt[i])
            {
                return (true);
            }
        }
        document.getElementById("error_upload_file").innerHTML = error_upload_file_fr;
        return (false);
    }
}

/**
 * Vérifie l'extension d'un fichier uploadé
 * @param {String} filename type du fichier uploadé
 * @param {String} format
 * @returns {Boolean}
 */
function getFileExtension(filename) {
    filename = filename.toLowerCase();
    return getExtension(filename);
}
