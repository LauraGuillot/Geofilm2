/**
 * Suppression d'un favoris
 * @param {type} id - Identifiant du favoris
 * @returns {void}
 */
function  deleteFavorite(id) {
    //Suppression dans le tableau javascript
    var index = -1;
    for (var i = 0; i < favorites.length; i++) {

        if (favorites[i].id == id) {
            index = i;
        }
    }
    favorites.splice(index, 1);
    sort();

    //Suppression dans la base de données
    var idco = document.getElementById("idco").value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        }
    };
    var data = "id=" + id + "&" + "idco=" + idco;
    xhttp.open("GET", "DeleteFavoriteServlet?" + data, true);
    xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhttp.send();
}