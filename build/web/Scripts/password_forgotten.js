

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

    //Si la saisie est valide
    if (valid_amil_mdp(email)) {

        //On envoie le mail à une servlet pour voir si celui-ci est déjà utilisé ou non
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;

                //Si l'adresse email est dans la base de données, on envoie un mail noreply à l'utilisateur
                if (answer == "true") {

                    //TODO : envoyer un mail en noreply à l'adresse mail entrée



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
