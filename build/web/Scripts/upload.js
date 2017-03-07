//TODO : bouton précédent permettant de revenir en arrière ?

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
    var type_video = document.getElementById("u_video").value;
    var type_image = document.getElementById("u_image").value;
    var type_sound = document.getElementById("u_sound").value;
    var title = document.getElementById("upload_title_entered").value;
    var choice_source = document.getElementById("choice_source").value;
    var type_media = "";
    var multiid = document.getElementById("multi_open").value;
    var idco = document.getElementById("idco").value;
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
    //ADRESSE
    var number = document.getElementById("numero_entered").value;
    var street = document.getElementById("street_entered").value;
    var complement = document.getElementById("address_complement_entered").value;
    var postal_code = document.getElementById("postal_code_entered").value;
    var city = document.getElementById("city_entered").value;
    var country = document.getElementById("country_entered").value;
    var location = document.getElementById("output").value;
    if (location == undefined){
        
    } else {
        
    }
    geocodeAddress(codeAddressJson(number, street, complement, city, country), function (localisation) {
            if (localisation !== undefined) {
                

            }
        });
    //FORMAT FICHIER
    var file = document.getElementById("file_entered").value;
    var format = document.getElementById("file_format").value;
    //Si le format du fichier entré est valide, on peut ajouter les informations à la base de données
    if (valid_form_upload3()) {

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;
                if (answer == "true") {

                    //Appel du controller pour effuectuer l'ajout d'un multimédia via un formulaire (Post)

                    var form = document.createElement('form');
                    form.method = "POST";
                    form.action = "global_map.htm";
                    var c1 = document.createElement('input');
                    c1.type = "hidden";
                    c1.name = "email";
                    c1.value = email;
                    form.appendChild(c1);
                    var c2 = document.createElement('input');
                    c2.type = "hidden";
                    c2.name = "mdp";
                    c2.value = mdp;
                    form.appendChild(c2);
                    document.body.appendChild(form);
                    form.submit();
                } else {
                    //Message d'erreur
                    document.getElementById("error_multimedia_already").innerHTML = error_multimedia_already_entered_fr;
                }

            }
        };
        var data = "id=" + multiid + "&" + "idco=" + idco + "&" + "type=" + type_media;
        xhttp.open("GET", "UploadServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}

/**
 * Vérifier qu'une valeur est entrée pour le type de multimédia (i.e. qu'une case est bien cochée)
 * et modifie la valeur de type_media en fonction du type de multimédia
 * @param {type} type_media
 * @returns {Boolean}
 */
function valid_multimedia(type_media) {

    if (document.getElementById("u_video").checked) {
        type_media = "Video";
        return true;
    } else if (document.getElementById("u_image").checked) {
        type_media = "Image";
        return true;
    } else if (document.getElementById("u_sound").checked) {
        type_media = "Sound";
        return true;
    } else {
        document.getElementById("error_upload").innerHTML = error_multimedia_type_fr;
        return false;
    }
}




/**
 * Vérifier que le titre du multimédia n'est pas vide
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
 * Vérifier qu'un type de source a été entré
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
 * Validation du premier formulaire
 * @param {type} title
 * @param {type} choice
 * @param {type} elem1
 * @param {type} elem2
 * @returns {Boolean}
 */
function valid_form_upload1(title, choice, elem1, elem2) {
    if (valid_multimedia("") && valid_titre(title) && valid_source(choice)) {
        visibilite_element(elem1);
        visibilite_element(elem2);
        return true;
    } else {
        return false;
    }
}


/**Validation du second formulaire d'upload (localisation de la vidéo)
 * @param {type} elem1 Contenu à cacher
 * @param {type} elem2 Contenu à ouvrir
 * @returns {Boolean}
 */
function valid_form_upload2(elem1, elem2) {

    var number = document.getElementById("numero_entered").value;
    var street = document.getElementById("street_entered").value;
    var postal_code = document.getElementById("postal_code_entered").value;
    var city = document.getElementById("city_entered").value;
    var country = document.getElementById("country_entered").value;
    var complement = document.getElementById("address_complement_entered").value;

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
}

/**
 * Peret de vérifier que le fichier entré a un foraat valide
 * @returns {undefined}
 */
function valid_form_upload3() {
    var filename = document.getElementById("file_entered").value;
    document.getElementById("file_format").innerHTML = getExtension(filename);
    extensionsValides = new Array('avi', 'wmv', 'mov', 'mp4', 'mkv', 'mka', 'mks', 'flv', 'Divx', 'Xvid', 'divx', 'xvid', 'raw', 'jpeg', 'dng', 'tiff', 'png', 'gif', 'jpg', 'psd', 'wav', 'm4v', 'wmv', 'mpg', 'mpeg', 'mp3', 'm4a', 'aac');
    if (verifFileExtension(filename, extensionsValides)) {
        return true;
    } else{
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
 * Obtention de l'extension (type) d'un fichier
 * @param {String} filename
 * @returns {String}
 */
function getExtension(filename)
{
    var parts = filename.substr(filename.lastIndexOf(".")+1);
    return (parts);
}


/**
 * Vérifie l'extension d'un fichier uploadé
 * @param {String} filename type du fichier uploadé
 * @param {Array<String>} listeExt liste des extensions autorisées
 * @returns {Boolean}
 */
function verifFileExtension(filename, listeExt){

    if (filename==""){
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
