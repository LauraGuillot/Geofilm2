/**
 * Ouverture d'un multimédia : on récupère les données, on prépare la pop-up et on l'affiche
 * @param {int} id Identifiant du multimédia
 * @param {int} i Index de la source
 * @param {int} j Index de la position du multimédia
 * @param {int} k Index du multimédia
 * @returns {void}
 */
function openMult(i, j, k, id) {
    var idco = document.getElementById("idco").value;

    //On appelle la servlet pour récupérer les infos sur le multimédia
    /* badloc:[est ce que la personne a signalé le multimédia ]
     *favoris:[est ce que la personne a ajouté ce multimédia à ses favoris]
     *like:[est ce que la personne a liké le multimédia]*/
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Réponse de la servlet
            var answer = xhttp.responseText;

            //On récupère les infos
            var answers = answer.split("*");
            var like = extractInfosLike(answers[2]);
            var favorite = extractInfosFavorite(answers[1]);
            var badloc = extractInfosBadLos(answers[0]);

            //Affichage du multimedia
            displayMultimedia(id, i, j, k, like, favorite, badloc);

        }
    };
    var data = "id=" + id + "&" + "idco=" + idco;
    xhttp.open("GET", "OpenMultimediaServlet?" + data, true);
    xhttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
    xhttp.send();
}

/**
 * Récupérer l'info : Est ce que l'utilisateur a liké le multimédia?
 * @param {String} answer - Chaîne de caractère de la forme : like:[boolean]
 * @returns {Booleen}
 */
function extractInfosLike(answer) {
    return answer.split(":")[1];
}

/**
 * Récupérer l'info : Est ce que l'utilisateur a ajouté le multimédia dans ses favoris?
 * @param {String} answer - Chaîne de caractère de la forme : favorite:[boolean]
 * @returns {Booleen}
 */
function extractInfosFavorite(answer) {
    return answer.split(":")[1];
}

/**
 * Récupérer l'info : Est ce que l'utilisateur a signalé le multimédia comme mal géolocalisé?
 * @param {String} answer - Chaîne de caractère de la forme : badloc:[boolean]
 * @returns {Booleen}
 */
function extractInfosBadLos(answer) {
    return answer.split(":")[1];
}

/**
 * Affichage du multimedia dans une pop-up
 * @param {Int} id - Identifiant du multimedia
 * @param {Int} i - Index de sa position 
 * @param {Int} j - Index du multimédia
 * @param {Booleen} like - Est ce que l'utilisateur a liké le multimédia?
 * @param {Booleen} favorite - Est ce que l'utilisateur a ajouté le multimédia dans ses favoris?
 * @param {Booleen} badloc - Est ce que l'utilisateur a signalé le multimédia comme mal géolocalisé?
 * @returns {void}
 */
function displayMultimedia(id, i, j, k, like, favorite, badloc) {

    //Id en champ caché 
    document.getElementById("multi_open").value = id;

    //Ouverture de la pop-up
    $('#multimedia_pop').modal('show');

    //Infos sur le multimedia
    document.getElementById("multi_title").innerHTML = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_title").value;
    document.getElementById("multi_publisher_date").innerHTML = by_fr + document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_publisher").value + the_fr + document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_uploaddate").value;
    document.getElementById("multi_descr").innerHTML = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_descr").value;

    //Ouverture du multimedia
    var path = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_path").value + "." + document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_format").value;
    var type = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_type").value;
    loadMulti(path, type);

    //Affichage de la fonctionnalité favoris
    displayFavoriteDiv(favorite);

    //Variable pour désigner si la personne est le publicateur du multimédia ou non.
    // En effet, si tel est le cas, il ne pourra pas liké ou signalé le contenu
    var isPublisher = (document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_publisherID").value == document.getElementById("person_id").value);

    //Affichage de la fonctionnalité like/dislike
    displayLikeDiv(like, isPublisher, document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_like").value, document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_dislike").value);

    //Affichage de la fonctionnalité de signalement
    displayBadLocDiv(badloc || isPublisher);
}

/**
 * Chargement du multimedia dans la pop-up
 * @param {String} path - Chemin d'accès vers le mulimédia
 * @param {String} type - Type du multimédia
 * @returns {void}
 */
function loadMulti(path, type) {
    var div = document.getElementById("multimedia_div");
    div.innerHTML = "";
    switch (type) {
        case "IMAGE" :
            path = "Multimedias/Images/" + path;
            var img = document.createElement("img");
            img.className = "img_multi";
            img.src = path;
            div.appendChild(img);
            break;
        case "VIDEO" :
            path = "Multimedias/Videos/" + path;
            var vi = document.createElement("video");
            vi.className = "video_multi";
            vi.src = path;
            vi.controls = "controls";
            div.appendChild(vi);
            break;
        default :
            path = "Multimedias/Sons/" + path;
            var au = document.createElement("audio");
            au.className = "audio_multi";
            au.controls = "controls";
            var source = document.createElement("source");
            source.src = path;
            source.type = "audio/mpeg";
            au.appendChild(source)
            div.appendChild(au);
            break;
    }
}

/**
 * Affichage de la fonctionnalité "favoris"
 * @param {booleen} favorite - True si la fonctionnalité est bloquée
 * @returns {void}
 */
function  displayFavoriteDiv(favorite) {

    if (favorite === 'true') {
        document.getElementById("favorite_action_locked").style.display = "block";
        document.getElementById("favorite_action").style.display = "none";
    } else {
        document.getElementById("favorite_action").style.display = "block";
        document.getElementById("favorite_action_locked").style.display = "none";
    }
}
/**
 * Affichage de la fonctionnalité "like/dislike"
 * @param {string} like - Vaut like, dislike ou no suivant si la personne a liké, disliké ou non le multimédia
 * @param {booléen} publisher - True si la personne est le publisher de la vidéo
 * @param {int} nlike - Nombre de likes
 * @param {int} ndislike - Nombre de dislike
 * @returns {void}
 */
function displayLikeDiv(like, publisher, nlike, ndislike) {

    // Affichage du nombre de likes
    document.getElementById("nlike").innerHTML = nlike;
    document.getElementById("nlike1").innerHTML = nlike;
    document.getElementById("ndislike").innerHTML = ndislike;
    document.getElementById("ndislike1").innerHTML = ndislike;

    if (publisher === 'true') {
        document.getElementById("like_action_locked").style.display = "block";
        document.getElementById("like_action").style.display = "none";
    } else {
        if (like === 'LIKE') {
 
            document.getElementById("like_action_locked").style.display = "block";
            document.getElementById("like_action").style.display = "none";
            document.getElementById("like_lock").style.backgroundImage = "url('Ressources/like_green.png')";
            document.getElementById("dislike_lock").style.backgroundImage = "url('Ressources/dislike.png')";
            
        }
        if (like === 'DISLIKE') {
    
            document.getElementById("like_action_locked").style.display = "block";
            document.getElementById("like_action").style.display = "none";
            document.getElementById("dislike_lock").style.backgroundImage = "url('Ressources/dislike_red.png')";
            document.getElementById("like_lock").style.backgroundImage = "url('Ressources/like.png')";
        }
        if (like === 'no') {
            document.getElementById("like_action").style.display = "block";
            document.getElementById("like_action_locked").style.display = "none";
        }
    }
}

/**
 * Affichage de la fonctionnalité "signaler mauvaise géolocalisation"
 * @param {booleen} badloc - True si la fonctionnalité est bloquée
 * @returns {void}
 */
function displayBadLocDiv(badloc) {
    if (badloc === 'true') {
        document.getElementById("signalisation_action_locked").style.display = "block";
        document.getElementById("signalisation_action").style.display = "none";
    } else {
        document.getElementById("signalisation_action_locked").style.display = "none";
        document.getElementById("signalisation_action").style.display = "block";
    }
}

/**
 * Incrémentation du nombre de likes au like par un utilisateur 
 * @param {type} id - Id du multimedia
 * @param {type} type - Type du like 
 * @returns {void}
 */
function incrLike(id, type) {
    var cptSrc = document.getElementById("nbSources").value;
    var i;
    var j;
    var k;

    for (var m = 0; m < cptSrc; m++) {
        var cptPos = document.getElementById("nbPos" + m).value;
        for (var n = 0; n < cptPos; n++) {
            var cptMult = document.getElementById("nbMulti" + m + "_" + n).value;
            for (var p = 0; p < cptMult; p++) {
                if (document.getElementById("src" + m + "_pos" + n + "_multi" + p + "_id").value == id) {
                    i = m;
                    j = n;
                    k = p;
                }
            }
        }
    }
    if (type === 'LIKE') {
        document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_like").value = parseInt(document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_like").value) + 1;
    } else {
        document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_dislike").value = parseInt(document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_dislike").value) + 1;
    }
}