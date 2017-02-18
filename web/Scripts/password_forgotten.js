

/**
 * Méthode permettant d'afficher la pop-up d'oubli de mot de passe
 */
function pop_obtain_password() {
    $('#password_forgotten_form').modal('show');
}

/**
 * Inscription d'un utilisateur 
 */
function obtain_password() {

    //On récupère les infos
    var email = document.getElementById("password_forgotten_email").value;
    var mdp = document.getElementById("password_new").value;
    var mdp2 = document.getElementById("password_new_confirmed").value;

    //Si la saisie est valide
    if (valid_form_password(email, mdp, mdp2)) {

        //On envoie le mail à une servlet pour voir si celui-ci est déjà utilisé ou non
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;

                //Si l'adresse email est dans la base de données, on envoie les nouvelles infos à la servlet
                if (answer == "true") {

                    var form = document.createElement('form');
                    form.method = "POST";
                    form.action = "#password_modified_form";

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
                    $('#password_forgotten_form').modal('hide');
                    $('#password_modified_form').modal('show');



                    //Si l'addresse email n'est pas déjà dans la base de données :  
                } else {
                    //Message d'erreur
                    document.getElementById("password_forgotten_error").innerHTML = error_email_not_found_fr;
                }

            }
        };
        var data = "email=" + email;
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
function valid_email_mdp(email) {
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
 * Vérification que le mot de passe contient plus de 6 caractères et que les 2 mdp sont égaux
 * @param {String} mdp1
 * @param {String} mdp2
 * @returns {Boolean}
 */
function valid_new_password(mdp1, mdp2) {
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

function valid_form_password(email, mdp1, mdp2) {
    return valid_email_mdp(email) & valid_new_password(mdp1, mdp2);
}