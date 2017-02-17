//Variable globale : tableau de favoris
var favorites = [];

/**
 * Initialisation des favoris
 * @returns {void}
 */
function initFavorite() {
//Initialisation du tableau
    var cpt = document.getElementById('nbLoc').value;
    for (var i = 0; i < cpt; i++) {
        var cpt1 = document.getElementById('nbMulti' + i).value;

        for (var j = 0; j < cpt1; j++) {

            var title = document.getElementById("pos" + i + "_multi" + j + "_title").value;
            var id = document.getElementById("pos" + i + "_multi" + j + "_id").value;
            var publisher = document.getElementById("pos" + i + "_multi" + j + "_publisher").value;
            var date = document.getElementById("pos" + i + "_multi" + j + "_uploaddate").value;
            var type = document.getElementById("pos" + i + "_multi" + j + "_type").value;
            var format = document.getElementById("pos" + i + "_multi" + j + "_format").value;
            var path = document.getElementById("pos" + i + "_multi" + j + "_path").value;
            var descr = document.getElementById("pos" + i + "_multi" + j + "_descr").value;

            var m = new Object();
            m.title = title;
            m.id = id;
            m.publisher = publisher;
            m.date = date;
            m.type = type;
            m.descr = descr;
            m.format = format;
            m.path = path;
            m.loc = i;
            m.rank = j;
            favorites.push(m);
        }
    }

    //Affichage 
    displayFavorite(favorites);
}

/**
 * Affichage de la liste des favoris
 * @returns {void}
 */
function displayFavorite(favorites) {
    var div = document.getElementById("favorite");
    div.innerHTML = "";

    for (var i = 0; i < favorites.length; i++) {

        var a = document.createElement('a');
        a.className = "link_marker";
        var multi = favorites[i];
        a.addEventListener("click", delegate(multi.loc, multi.rank), false);

        var p_group = document.createElement("div");
        p_group.className = "p_group";

        var img = document.createElement('img');
        switch (favorites[i].type) {
            case 'VIDEO':
                img.src = "./Ressources/video.png";
                img.className = "icon_video";
                break;
            case 'IMAGE':
                img.src = "./Ressources/image.png";
                img.className = "icon_image";
                break;
            case 'SON':
                img.src = "./Ressources/sound.png";
                img.className = "icon_sound";
                break;
        }

        var p = document.createElement("div");
        p.className = "info_p";

        var p1 = document.createElement("p");
        p1.className = "link_title";
        p1.innerHTML = favorites[i].title;

        var p2 = document.createElement("p");
        p2.className = "link_info";
        p2.innerHTML = by_fr + favorites[i].publisher + the_fr + favorites[i].date;

        var button = document.createElement("a");
        button.className = "del_button";
        button.innerHTML = delete_fr;
        button.addEventListener("click", delegate1(multi.id), false);

        p_group.appendChild(img);
        p.appendChild(p1);
        p.appendChild(p2);
        p.appendChild(button);
        p_group.appendChild(p);

        a.appendChild(p_group);

        div.appendChild(a);
    }
}

/**
 * Fonction de délégation pour ouvrir un multimédia
 * @param {int} i Index de la position du multimédia
 * * @param {int} j Index du multimedia
 * @returns {Function}
 */
function delegate(i, j) {
    return function () {
        openMulti(i, j);
    }
}

/**
 * Fonction de délégation pour supprimer un multimédia favoris
 * @param {type} id Id du multimedia
 * @returns {Function}
 */
function delegate1(id) {
    return function () {
        deleteFavorite(id);
    }
}

/**
 * Ouverture du multimedia i
 * @param {int} i - Index de la position du multimedia
 * @param {int} j - Index du multimédia
 * @returns {void}
 */
function openMulti(i, j) {

    //Ouverture de la pop-up
    $('#multimedia_pop').modal('show');

    //Chargement des données
    var title = document.getElementById("pos" + i + "_multi" + j + "_title").value;
    var publisher = document.getElementById("pos" + i + "_multi" + j + "_publisher").value;
    var date = document.getElementById("pos" + i + "_multi" + j + "_uploaddate").value;
    var descr = document.getElementById("pos" + i + "_multi" + j + "_descr").value;

    document.getElementById("multi_title").innerHTML = title;
    document.getElementById("multi_publisher_date").innerHTML = by_fr + publisher + the_fr + date;
    document.getElementById("multi_descr").innerHTML = descr;

    //Chargement du multimedia
    var type = document.getElementById("pos" + i + "_multi" + j + "_type").value;
    var path = document.getElementById("pos" + i + "_multi" + j + "_path").value + "." + document.getElementById("pos" + i + "_multi" + j + "_format").value;
    loadMulti(path, type);
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


