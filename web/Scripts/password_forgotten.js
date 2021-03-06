

/**
 * Méthode permettant d'afficher la pop-up d'oubli de mot de passe
 */
function pop_obtain_password() {
    $('#password_forgotten_form').modal('show');
}

/**
 * Modification du mot de passe d'un utilisateur, à partir de son adresse mail
 */
function obtain_password() {

    //On récupère les infos
    var email = document.getElementById("password_forgotten_email").value;
    var mdp = document.getElementById("password_new").value;
    var mdp2 = document.getElementById("password_new_confirmed").value;

    //Si la saisie est valide
    if (valid_form_password(email, mdp, mdp2)) {

        //Vérification du mail par la servlet
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;
                //Si l'adresse mail est reconnue par la servlet, le mot de passe associé est modifié
                if (answer == "true") {

                    
//                    $('#password_forgotten_form').modal('hide');
                    $('#password_forgotten_confirmed_form').modal('show');
                    
                // Sinon, on affiche un message d'erreur   
                } else {
                    document.getElementById("password_forgotten_error").innerHTML = error_email_not_found_fr;
                }

            }
        };
        var data = "email=" + email + "&" + "mdp=" + mdp;
        xhttp.open("GET", "ModifPasswordServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}




/**
 * Vérifier qu'une adresse email est syntaxiquement valide
 * @param {String} email
 * @returns {Boolean} 
 */
function valid_email_mdp(email) {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

    if (reg.test(email)) {
        return true;
    } else {
        //Message d'erreur
        document.getElementById("password_forgotten_error").innerHTML = error_email_fr;
        return false;
    }
}

/**
 * Vérification que le mot de passe contient plus de 6 caractères et que les 2 mdp sont égaux
 * @param {String} mdp1
 * @param {String} mdp2
 * @returns {Boolean}
 */
function valid_new_password(mdp1, mdp2) {
    //le mot de passe doit avoir une longueur minimale de 6 caractères
    if (mdp1.length < 6) {
        //Message d'erreur
        document.getElementById("password_forgotten_error").innerHTML = error_password_fr;
        return false
    } else {
        if (mdp1 != mdp2) {
            //Message d'erreur
            document.getElementById("password_forgotten_error").innerHTML = error_passwords_fr;
            return false;
        } else {
            return true;
        }
    }
}

/**
 * Vérification de la validité de l'email et du mot de passe
 * @param {String} email
 * @param {String} mdp1
 * @param {String} mdp2
 * @returns {Boolean}
 */
function valid_form_password(email, mdp1, mdp2) {
    return valid_email_mdp(email) && valid_new_password(mdp1, mdp2);
}