/**
 * Méthode permettant d'afficher la pop-up de connexion
 */
function pop_connexion() {
    $('#connection_form').modal('show');
}

/**
 * Connexion de l'utilisateur 
 */
function connect() {
    //On récupère les données saisies
    var email = document.getElementById("email").value;
    var mdp = document.getElementById("password").value;

    //Si la saisie est valide : appel à la servlet de connexion
    if (verif_saisie(email, mdp)) {

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //Réponse de la servlet
                var answer = xhttp.responseText;
                //Si la connexion est valide
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

                    //Si il y a une erreur d'identification    
                } else {
                    //Message d'erreur
                    document.getElementById("error_connect").innerHTML = error_authentification_fr;
                }

            }
        };
        var data = "email=" + email + "&" + "mdp=" + mdp;
        xhttp.open("GET", "ControlConnexionServlet?" + data, true);
        xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
        xhttp.send();
    }
}

/**
 * Validation formulaire de connexion
 * @param {String} email
 * @param {String} mdp
 * @returns {True si les champs sont correctement remplis}
 */
function verif_saisie(email, mdp) {
    var v_email = valid_email(email);
    var v_mdp = (mdp != "");

    if (!v_email) {
        //Erreur email 
        document.getElementById("error_connect").innerHTML = error_email_fr;
    } else if (!v_mdp) {
        //Erreur mot de passe vide
        document.getElementById("error_connect").innerHTML = error_empty_password_fr;
    }
    return v_email && v_mdp;

}

/**
 * Vérifier qu'une adresse email est syntaxiquement valide
 * @param {String} email
 * @returns {Boolean} 
 */
function valid_email(email) {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    return reg.test(email);
}