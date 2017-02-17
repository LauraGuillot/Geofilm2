/**
 * Méthode permettant d'afficher la pop-up d'inscription
 */
function pop_inscription() {
    $('#inscription_form').modal('show');
}

/**
 * Inscription d'un utilisateur 
 */
function inscription() {

    //On récupère les infos
    var name = document.getElementById("inscription_name").value;
    var firstname = document.getElementById("inscription_firstname").value;
    var email = document.getElementById("inscription_email").value;
    var mdp = document.getElementById("inscription_password").value;
    var mdp2 = document.getElementById("inscription_password2").value;

    //Si la saisie est valide
    if (valid_form(name, firstname, mdp, mdp2, email)) {

        //On envoie le mail à une servlet pour voir si celui-ci est déjà utilisé ou non
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;

                //Si l'adresse email n'est pas déjà prise, l'inscription a été effectuée. 
                //Reste à connecter la personne
                if (answer == "true") {

                    //Appel du controller pour effuectuer la connexion via un formulaire (en Post)

                    var form = document.createElement('form');
                    form.method = "POST";
                    form.action = "globalMap.htm";

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

                    //Si l'addresse email est déjà prise   
                } else {
                    //Message d'erreur
                    document.getElementById("inscription_error").innerHTML = error_email_already_taken_fr;
                }

            }
        };
        var data = "email=" + email + "&" + "mdp=" + mdp + "&" + "name=" + name + "&" + "firstname=" + firstname;
        xhttp.open("GET", "ControlInscriptionServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
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
        document.getElementById("inscription_error").innerHTML = error_email_fr;
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
        document.getElementById("inscription_error").innerHTML = error_name_fr;
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
        document.getElementById("inscription_error").innerHTML = error_firstname_fr;
        return false;
    } else {
        return true;
    }
}

/**
 * Vérification que le mot de passe contient plus de 6 caractères et que les 2 mdp sont égaux
 * @param {String} mdp1
 * @param {String} mdp2
 * @returns {Boolean}
 */
function valid_password(mdp1, mdp2) {
    if (mdp1.length < 6) {
        //Message d'erreur
        document.getElementById("inscription_error").innerHTML = error_password_fr;
        return false
    } else {
        if (mdp1 != mdp2) {
            //Message d'erreur
            document.getElementById("inscription_error").innerHTML = error_passwords_fr;
            return false;
        } else {
            return true;
        }
    }
}

/**
 * Validation du formulaire
 * @param {String} name
 * @param {String} firstname
 * @param {String} mdp
 * @param {String} mdp2
 * @param {String} email
 * @returns {Boolean}
 */
function valid_form(name, firstname, mdp, mdp2, email) {
    return valid_name(name) && valid_firstname(firstname) && valid_email(email) && valid_password(mdp, mdp2)
}
