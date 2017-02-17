/**
 * Ajout d'un multimédia aux favoris de l'utilisateur
 * @returns {void}
 */
function addToFavorite() {
    
    //Paramètres
    var multiid = document.getElementById("multi_open").value;
    var idco = document.getElementById("idco").value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Réponse de la servlet : changement de l'affichage
            document.getElementById("favorite_action_locked").style.display = "block";
            document.getElementById("favorite_action").style.display = "none";
        }
    };
    var data = "id=" + multiid + "&" + "idco=" + idco;
    xhttp.open("GET", "AddFavoriteServlet?" + data, true);
    xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhttp.send();
}

