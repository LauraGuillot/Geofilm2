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
function upload1() {

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

                    var form = document.createElement('form');
                    form.method = "POST";
                    form.action = "uploading.htm";
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
        xhttp.open("GET", "UploadingServlet?" + data, true);
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

//TODO : dans le valid_form2 ; vérifier que l'adresse entrée existe en la convertissant en position

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
    if ((valid_number(number) && valid_number(street) && valid_number(postal_code) && valid_number(city) && valid_number(country)) && (geocodeAddress(codeAddressJson(number, street, complement, postal_code, city, country)))) {
        visibilite_element(elem1);
        visibilite_element(elem2);
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
    var type ="none";
    var op2 = document.getElementById("upload_source_unknown");
    if(op2.selected){
        type="UNKNOWN";
    }
    var op3 = document.getElementById("upload_film");
    if(op3.selected){
        type="FILM";
    }
    var op4 = document.getElementById("upload_serie");
    if(op4.selected){
        type="SERIE";
    }
    var op5 = document.getElementById("upload_game");
    if(op5.selected){
        type="GAME";
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