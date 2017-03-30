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
    var language = document.getElementById("upload_language_entered").value;
    var time_begin = document.getElementById("time_begin_h").value + ":" + document.getElementById("time_begin_m").value + ":" + document.getElementById("time_begin_s").value;
    var time_end = document.getElementById("time_end_h").value + ":" + document.getElementById("time_end_m").value + ":" + document.getElementById("time_end_s").value;

    //Récupération de la date :
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    //Variable du jour :
    var date = day + "-" + month + "-" + year;
    //Path
    var path = date + "_" + hour + "-" + minute + "-" + second;
    //ADRESSE
    var location = document.getElementById("output").innerHTML;
    var the_geom = ("POINT" + location).toString();
    //FORMAT FICHIER
    var file = document.getElementById("file_entered").value;
    var file_entered = document.getElementById("file_entered");
    //Si le format du fichier entré est valide, on peut ajouter les informations à la base de données
    if (valid_form_upload3()) {

        var format = getFileExtension(file);
        //On récupère les coordonnées lat lng de la géomtrie
        //On choisit de ne garder que 6 chiffres pour vérifier qu'une géométrie proche n'existe pas déjà
        var x = getPointX(the_geom);
        var y = getPointY(the_geom);

        //on envoie à la servlet les informations
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet : true si toutes les requêtes sont bien exécutées dans la servlet
                var answer = xhttp.responseText;
                if (answer == "true") {

                    //Upload du fichier
                    uploadFile(file_entered, path, type_media, format);

                } else {
                    //Message d'erreur
                    document.getElementById("error_multimedia_already").innerHTML = error_multimedia_already_entered_fr;
                }
            }
        };
        var data = "idco=" + idco + "&" + "email=" + email + "&" + "title=" + title +
                "&" + "source_name=" + source_name + "&" + "choice_source=" + choice_source +
                "&" + "type_media=" + type_media + "&" + "date=" + date + "&" + "the_geom=" + the_geom +
                "&" + "format=" + format + "&" + "type=" + type_media + "&" + "description=" + description +
                "&" + "time_begin=" + time_begin + "&" + "time_end=" + time_end + "&" + "path=" + path +
                "&" + "language=" + language + "&" + "x=" + x + "&" + "y=" + y;

        xhttp.open("GET", "UploadServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}



/**
 * Enregistrement du fichier sur le serveur
 * @param {File} file_entered
 * @param {String} path
 * @param {String} type_media
 * @returns {void}
 */
function uploadFile(file_entered, path, type_media, ext) {

    /*if (answer == "true") {
     //Appel de la fonction suivante pour accéder à la globalMap
     $('#upload_confirmed_form').modal('show');
     } else {
     //Message d'erreur
     document.getElementById("error_multimedia_already").innerHTML = error_multimedia_already_entered_fr;
     }
     }*/

    var form = document.getElementById("form_file_upload");
    var s = path + "." + ext;
    switch (type_media) {
        case 'VIDEO' :
            s = "Videos" + "/" + s;
            break;
        case 'IMAGE' :
            s = "Images" + "/" + s;
            break;
        default :
            s = "Sons" + "/" + s;
            break;
    }
    document.cookie = "path=" + s;
    document.cookie = "idco=" + document.getElementById("idco").value;
    form.submit();
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
 * Retourne la valeur du langage du multimédia
 * @returns {Element}
 */
function getLanguage() {
    var lang = document.getElementById("upload_language_entered");
    return lang;
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
 * Retourne vrai si : une valeur est entrée pour langage ET (le multimédia est un son OU une vidéo)
 * @returns {Boolean}
 */
function validLanguage() {
    if ((document.getElementById("u_video").checked) || (document.getElementById("u_sound").checked)) {
        if (document.getElementById("upload_language_entered").value == "") {
            document.getElementById("error_upload").innerHTML = error_multimedia_language_fr;
            return false;
        } else {
            return true;
        }
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
 * Vérifie que le format du fichier entré correspond au type de multimédia indiqué par l'utilisateur
 * @returns {Boolean}7
 */
function valid_format() {
    var filename = document.getElementById("file_entered").value;
    if (document.getElementById("u_video").checked) {
        if (valid_video(filename)) {
            return true;
        } else {
            return false;
        }
    } else if (document.getElementById("u_image").checked) {
        if (valid_image(filename)) {
            return true;
        } else {
            return false;
        }
    } else if (document.getElementById("u_sound").checked) {
        if (valid_son(filename)) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Vérifie que le fichier filename a une extension correspondant à une vidéo
 * Si non, la fonction renvoie false
 * @param {type} video_filename
 * @returns {Boolean}
 */
function valid_video(video_filename) {
    //Array des extensions autorisées/lues
    extensionsValides = new Array('avi', 'wmv', 'mov', 'mp4', 'mkv', 'mka', 'mks', 'flv', 'Divx', 'Xvid', 'divx', 'xvid', 'm4v', 'mpg', 'mpeg');
    if (verifFileExtension(video_filename, extensionsValides)) {
        return true;
    } else {
        return false;
    }
}


/**
 * Vérifie que le fichier filename a une extension correspondant à une image
 * Si non, la fonction renvoie false
 * @param {type} video_filename
 * @returns {Boolean}
 */
function valid_image(image_filename) {
    //Array des extensions autorisées/lues
    extensionsValides = new Array('jpeg', 'dng', 'tiff', 'png', 'gif', 'jpg', 'psd', 'raw');
    if (verifFileExtension(image_filename, extensionsValides)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Vérifie que le fichier filename a une extension correspondant à un son
 * Si non, la fonction renvoie false
 * @param {type} video_filename
 * @returns {Boolean}
 */
function valid_son(son_filename) {
    //Array des extensions autorisées/lues
    extensionsValides = new Array('wav', 'm4v', 'wmv', 'mp3', 'm4a', 'aac');
    if (verifFileExtension(son_filename, extensionsValides)) {
        return true;
    } else {
        return false;
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
    if (valid_multimedia("") && validLanguage() && valid_titre(title) && valid_source(choice)) {
//Rendre visible le bloc d'upload suivant, et cacher l'actuel
        visibilite_element(elem1);
        visibilite_element(elem2);
        //On indique qu'aucune position géographique n'est sélectionnée
        document.getElementById("output").innerHTML = "";
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
    if ((geoloc == "")) {
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
 * Permet de vérifier que le fichier entré a un format valide. Cela ne vérifie cependant pas
 * la correspondance entre le type du fichier entré au div 1 et le format du fichier
 * @returns {Boolean}
 */
function valid_form_upload3() {
    var filename = document.getElementById("file_entered").value;
    //Array des extensions autorisées/lues
    extensionsValides = new Array('avi', 'wmv', 'mov', 'mp4', 'mkv', 'mka', 'mks', 'flv', 'Divx', 'Xvid', 'divx', 'xvid', 'raw', 'jpeg', 'dng', 'tiff', 'png', 'gif', 'jpg', 'psd', 'wav', 'm4v', 'wmv', 'mpg', 'mpeg', 'mp3', 'm4a', 'aac');
    if (verifFileExtension(filename, extensionsValides)) {
        //On vérifie ensuite que le format du fichier entré correspond bien à un format compatible avec le type de multimédia entré (info utilisateur : VIDEO
        // SON ou IMAGE)
        if (valid_format()) {
            //Calcul de la taille du fichier uploadé
            //fileSize est exprimé en Ko
            var fileSize = GetFileSize("file_entered");
            //Si la taille ne dépasse pas 300Mo, on accepte l'upload
            if (fileSize < 307200) {
                return true;
                //Sinon, on renvoie un message d'erreur
            } else {
                document.getElementById("error_upload_file").innerHTML = error_size_file_fr;
                return false
            }
            // Si le format du fichier n'est pas valide, on renvoie un message d'erreur
        } else {
            document.getElementById("error_upload_file").innerHTML = error_format_file_fr;
            return false;
        }
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

//Si un type est sélectionné, on charge les sources de ce type dans l'autocomplétion
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
 * @returns {boolean}
 */
function getFileExtension(filename) {
    filename = filename.toLowerCase();
    return getExtension(filename);
}

/**
 * Permet de déterminer la taille d'un fichier avant son upload
 * ATTENTION, ne fonctionne pas avec internet explorer !
 * @param {type} fileid id du fichier dont on veut déterminer la taille
 * @returns {Number} taille du fichier, en Kb
 */
function GetFileSize(fileid) {
    try {
        var fileSize = 0;

        fileSize = $("#" + fileid)[0].files[0].size //size in kb

        return fileSize;
    } catch (e) {
        alert("Error is :" + e);
    }
}




function distance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt(a * a + b * b);
    return c;
}

/**
 * Récupère la coordonnée latitude de la location entrée, avec 6 caractères de précision
 * @param {type} the_geom
 * @returns {unresolved}
 */
function getPointX(the_geom)
{
    var loc = the_geom;
   
    var parts = loc.substr(loc.lastIndexOf("(") + 1);
  
    parts = parts.substr(0,5);

    return (parts);
}



/**
 * Retourne la coordonnée longitude, avec 6 caractères pour précision 
 * @param {type} loc
 * @returns {unresolved}
 */
function getPointY(loc)
{
    var parts = loc.substr(loc.lastIndexOf(",") + 1);
    parts = parts.substr(0,5);
    return (parts);
}

/**
 * Calcule la distance entre deux localisations
 * @param {type} g1
 * @param {type} g2
 * @returns {Number}
 */
function getDistanceLoc(g1,g2){
    var d = distance(getPointX(g1),getPointY(g1),getPointX(g2),getPointY(g2));
    return d;
}


function displayFile(){
    var file = document.getElementById("file_entered").value;
    file = file.substr(file.lastIndexOf("\\") + 1);
    document.getElementById("return_file").innerHTML = file;
}