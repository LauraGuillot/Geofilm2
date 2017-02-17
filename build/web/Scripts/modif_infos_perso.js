/**
 * Affichage de la pop-up pour modifier les informations personnelles
 */
function pop_info() {
    document.getElementById("email_input").value = document.getElementById("email").value;
    document.getElementById("name_input").value = document.getElementById("name").value;
    document.getElementById("firstname_input").value = document.getElementById("firstname").value;
    $('#modification_form').modal('show');
}

/**
 * Envoi des modification des informations personnelles à une servlet 
 * pour validation
 */
function modif() {
    //Récupération des informations
    var email = document.getElementById("email_input").value;
    var nom = document.getElementById("name_input").value;
    var prenom = document.getElementById("firstname_input").value;

    //Si la saisie est correcte 
    if (valid_form(nom, prenom, email)) {

        //Envoi des modifications à la servlet
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;

                //Si le nouvel email n'est pas utilisé par qqn d'autre, la mise à jour s'est effectuée
                //On met à jout l'affichage et on ferme la pop-up
                if (answer == "true") {

                    document.getElementById("email").value = email;
                    document.getElementById("name").value = nom;
                    document.getElementById("firstname").value = prenom;
                    document.getElementById("info_name").innerHTML = prenom + " " + nom;
                    document.getElementById("info_email").innerHTML = email;
                    
                    document.getElementById("modification_error").innerHTML = "";
                    $('#modification_form').modal('hide');

                } else {
                    //Message d'erreur
                    document.getElementById("modification_error").innerHTML = error_email_already_taken_fr;
                }
            }
        };
        var data = "email=" + email + "&" + "idco=" + document.getElementById("idco").value + "&" + "name=" + nom + "&" + "firstname=" + prenom;
        xhttp.open("GET", "ModifInfoServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}

/**
 * Validation du formulaire
 * @param {String} name
 * @param {String} firstname
 * @param {String} email
 * @returns {Boolean}
 */
function valid_form(name, firstname, email) {
    return valid_name(name) && valid_firstname(firstname) && valid_email(email);
}

/**
 * Vérifier qu'une adresse email est syntaxiquement valide
 * @param {String} email
 * @returns {Boolean} 
 */
function valid_email(email) {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

    if (reg.test(email)) {
        return true;
    } else {
        //Message d'erreur
        document.getElementById("modification_error").innerHTML = error_email_fr;
        return false;
    }
}

/**
 * Vérifier que le nom n'est pas vide
 * @param {String} name
 * @returns {Boolean}
 */
function valid_name(name) {
    if (name == "") {
        //Message d'erreur
        document.getElementById("modification_error").innerHTML = error_name_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérifier que le prénom n'est pas vide
 * @param {String} firstname
 * @returns {Boolean}
 */
function valid_firstname(firstname) {
    if (firstname == "") {
        //Message d'erreur
        document.getElementById("modification_error").innerHTML = error_firstname_fr;
        return false;
    } else {
        return true;
    }
}

