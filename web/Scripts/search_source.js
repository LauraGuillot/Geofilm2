//Stockage des marqueurs de la carte
var markers = [];

/**
 * Récupération des sources qui correspondent à un type donné et affichage
 * @returns {Liste de sources}
 */

function search_source_type() {
    //Nombre total de source
    var cpt = document.getElementById("nbSources").value;

    //Type désiré
    var type = document.getElementById("select_source").value;

    //On récupère toutes les sources de ce type
    var sources = [];
    if (language == "fr" && type != chose_source_fr) {
        for (var i = 0; i < cpt; i++) {
            var s_type = document.getElementById("src_" + i + "_type").value;
            if (s_type == type) {
                var s = new Object();
                s.title = document.getElementById("src_" + i + "_title").value;
                s.index = i;
                s.score = 0;
                sources.push(s);
            }
        }
    }

    //Affichage
    displaySource(sources);

    return sources;
}

/**
 * Recherche de sources par mots-clés
 * @returns {undefined}
 */
function search_key_word() {

    //TRI PAR TYPE
    var type = document.getElementById("select_source").value;
    var sources = search_source_type();

    //Si aucun type n'a été choisi, on prend toutes les sources
    if (sources.length == 0 && type === chose_source_fr) {
        var cpt = document.getElementById("nbSources").value;
        for (var i = 0; i < cpt; i++) {
            var s = new Object();
            s.title = document.getElementById("src_" + i + "_title").value;
            s.index = i;
            s.score = 0;
            sources.push(s);
        }
    }

    //CALCUL DES SCORES POUR CHAQUE SOURCE
    var key = document.getElementById("search_key_word").value;
    for (var i = 0; i < sources.length; i++) {
        var score = computeScore(sources[i].title, key);
        sources[i].score = score;
    }

    //TRI DE LA LISTE
    sources.sort(function (a, b) {
        return a.score < b.score;
    });

    //Affichage
    displaySource(sources);
}



/**
 * Affichage de la liste des sources trouvées
 * @param {type} sources
 * @returns {void}
 */
function displaySource(sources) {

    var div = document.getElementById("result");
    div.innerHTML = "";

    //Si pas de source : message
    if (sources.length === 0) {
        div.innerHTML = no_source_fr;
        div.className = "no_source";
        //Sinon on affiche chaque source sous la forme d'un lien    
    } else {
        for (var i = 0; i < sources.length; i++) {
            //LIEN
            var a = document.createElement("li");
            a.className = "source_link";
            a.innerHTML = (sources[i]).title;
            a.addEventListener("click", delegateOpenSource((sources[i]).index), false);
            div.appendChild(a);
            //SEPARATEUR
            if (i != (sources.length - 1)) {
                var div_sep = document.createElement("div");
                div_sep.className = "separator_link";
                div.appendChild(div_sep);
            }
        }
    }
}

/**
 * Fonction de délégation
 * @param {int} i - Index de la source
 * @returns {Function}
 */
function delegateOpenSource(i) {
    return function () {
        openSource(i);
    }
}

/**
 * Ouverture de la source i
 * @param {int} i - Index de la source
 * @returns {undefined}
 */
function openSource(i) {
    //On efface les précédents markers
    removeMarkers();

    //On récupère toutes les positions 
    var pos = [];
    var cpt = document.getElementById("nbPos" + i).value;
    for (var j = 0; j < cpt; j++) {
        var geom = document.getElementById("src" + i + "_pos" + j).value;

        var p = new Object();
        p.geom = geom;
        p.index = j;
        
        pos.push(p);
    }

    //On affiche les marqueurs
    displayMarkers(i, pos);
}

/**
 * Suppression de tous les marqueurs sur la carte
 * @returns {undefined}
 */
function removeMarkers() {
    for (var j = 0; j < markers.length; j++) {
        markers[j].remove();
    }
    markers = [];
}

/**
 * Affichage d'un ensemble de positions
 * @param {int} i - Index de la source
 * @param {list} pos - Liste de positions
 * @returns {void}
 */
function displayMarkers(i, pos) {
    for (var j = 0; j < pos.length; j++) {
        var point = pos[j].geom;
        point = point.substring(6, point.length - 1);
        var pt = point.split(",");
        var x = pt[0];
        var y = pt[1];
        var popup = preparePopUp(i, pos[j].index);
        markers.push(addMarker(x, y, popup));

        if (j == 0) {
            //Centrage
            map.flyTo({center: [y, x], zoom: 7});
        }
    }
}

/**
 * Ajout d'un marker sur la carte
 * @param {double} x longitude
 * @param {double} y latitude
 * @param {popup} Popup
 * @returns {marker}
 */
function addMarker(x, y, popup) {
    //Div pour le marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(Ressources/marker_red.png)';
    el.style.width = '25px';
    el.style.height = '35px';

    //Ajout du marker
    var marker = new mapboxgl.Marker(el, {offset: [0, 0]})
            .setLngLat([y, x])
            .setPopup(popup)
            .addTo(map);
    return marker;
}

/**
 * Pour chaque marqueur préparation de la pop-up
 * @param {type} i - Index de la source
 * @param {type} j - Index du marqueur
 * @returns {popup}
 */
function preparePopUp(i, j) {

    //Mise en place du header
    var html = header(i, j);

    //Pour chaque multimédia, on ajoute un lien
    html += '<div class="links" id="multis' + i + '_' + j + '">';
    var cpt = document.getElementById("nbMulti" + i + "_" + j).value;
    for (var k = 0; k < cpt; k++) {
        var li = getLinkMulti(i, j, k);
        html = html + li;
    }
    html += '</div>';

    return new mapboxgl.Popup({offset: 25}).setHTML(html);
}

/**
 * Préparation d'un lien pour chaque multimédia
 * @param {type} i - Index de la source
 * @param {type} j - Index du marqueur
 * @param {type} k - Index du multimédia
 * @returns {String}
 */
function getLinkMulti(i, j, k) {
    var html = '';

    var title = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_title").value;
    var id = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_id").value;
    var publisher = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_publisher").value;
    var date = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_uploaddate").value;
    var type = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_type").value;

    html += '<a class="link_marker"  onclick="openMult(' + i + ',' + j + ',' + k + ',' + id + ')">';
    html += '<div class="p_group"><p class="link_title">';
    html += title;
    html += '</p>';
    html += '<p class="link_info">';
    html += by_fr + publisher + the_fr + date;
    html += '</p></div>';
    html += '</a>';

    return html;
}

/**
 * Création du header pour les pop-up
 * @param {type} i - Index de la source
 * @param {type} j - Index du marqueur
 * @returns {String} Header de la pop-up
 */
function header(i, j) {
    var html = '';

    html += '<p class="text">' + sort_by_fr + '</p>';

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"title_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"title\" value=\"title\" onclick=\"sort(" + i + "," + j + ")\">";
    html += title_fr + "</label>";
    html += "</div>";

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"date_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"date\" value=\"date\" onclick=\"sort(" + i + "," + j + ")\">";
    html += date_fr + "</label>";
    html += "</div>";

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"likes_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"likes\" value=\"likes\" onclick=\"sort(" + i + "," + j + ")\">";
    html += likes_fr + "</label>";
    html += "</div>";

    html += "<br><p class=\"text\">" + source_type_fr + "</p>";

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input  id=\"video_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"video\" value=\"video\" onclick=\"sort(" + i + "," + j + ")\" checked>";
    html += video_fr + "</label>";
    html += "</div>";

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"image_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"image\" value=\"image\" onclick=\"sort(" + i + "," + j + ")\" checked>";
    html += image_fr + "</label>";
    html += "</div>";

    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"sound_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"sound\" value=\"sound\" onclick=\"sort(" + i + "," + j + ")\"checked>";
    html += sound_fr + "</label>";
    html += "</div>";

    html += "<br><div class=\"checkbox_pop\">";
    html += "<label><input id=\"badloc_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"badloc\" value=\"badloc\" onclick=\"sort(" + i + "," + j + ")\">";
    html += remove_bad_location_fr + "</label>";
    html += "</div>";

    html += "<HR align=center size=5 width=\"90%\">";

    return html;
}

/**
 * Calcule de la similarité entre la recherche de l'utilisateur et le titre d'une source.
 * Ce score est basé sur le nombre de mots en commun
 * @param {type} title - Titre de la source
 * @param {type} key - Recherche de l'utilisateur 
 * @returns {int} score
 */
function computeScore(title, key) {
    var t1 = title.split(" ");
    var t2 = key.split(" ");
    var score = 0;
    for (var i = 0; i < t1.length; i++) {
        for (var j = 0; j < t2.length; j++) {
            if (t1[i].toLowerCase() == t2[j].toLowerCase()) {
                score += 1;
            }
        }
    }
    return score;
}

