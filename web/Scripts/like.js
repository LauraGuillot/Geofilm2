/**
 * Like / Dislike d'un multimédia 
 * @param {String} type - "LIKE" ou "DISLIKE"
 * @returns {void}
 */
function like(type) {
    //Paramètres
    var multiid = document.getElementById("multi_open").value;
    var idco = document.getElementById("idco").value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //Réponse de la servlet : changement de l'affichage
            document.getElementById("like_action_locked").style.display = "block";
            document.getElementById("like_action").style.display = "none";

            //Incrémentation nombre de likes
            if (type === 'LIKE') {
                document.getElementById("nlike").innerHTML = parseInt(document.getElementById("nlike").innerHTML) + 1;
                document.getElementById("nlike1").innerHTML = parseInt(document.getElementById("nlike1").innerHTML) + 1;
                document.getElementById("like_lock").style.backgroundImage = "url('Ressources/like_green.png')";
            } else {
                document.getElementById("ndislike").innerHTML = parseInt(document.getElementById("ndislike").innerHTML) + 1;
                document.getElementById("ndislike1").innerHTML = parseInt(document.getElementById("ndislike1").innerHTML) + 1;
                document.getElementById("dislike_lock").style.backgroundImage = "url('Ressources/dislike_red.png')";
            }

            incrLike(multiid, type);
        }
    };
    var data = "id=" + multiid + "&" + "idco=" + idco + "&" + "type=" + type;
    xhttp.open("GET", "LikeServlet?" + data, true);
    xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhttp.send();
}


