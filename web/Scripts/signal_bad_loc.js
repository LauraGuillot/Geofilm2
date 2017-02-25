/**
 * Signalement d'un multimédia mal géolocalisé
 * @returns {void}
 */
function signal() {
    
    //Paramètres
    var multiid = document.getElementById("multi_open").value;
    var idco = document.getElementById("idco").value;

    //Appel de la servlet avec en paramètres l'identifiant du multimédia et l'identifiant de connexion de l'utilisateur qui effectue le signalement
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Réponse de la servlet : changement de l'affichage
            document.getElementById("signalisation_action_locked").style.display = "block";
            document.getElementById("signalisation_action").style.display = "none";
        }
    };
    var data = "id=" + multiid + "&" + "idco=" + idco;
    xhttp.open("GET", "SignalServlet?" + data, true);
    xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhttp.send();
}

