/**
 * Fonctions de recherche de source pour la route map
 */

//Stockage des marqueurs de la carte
var markers = [];

/**
 * Récupération des sources qui correspondent à un type donné et affichage
 * @returns {Liste de sources}
 */
function search_source_type() {
    //Nombre total de sources
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
    //Tri par type
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

    // Calcul des scores pour chaque source
    // Le score d'une source correspond au nombre de mots en commun entre le 
    // titre de la source et les mots de la recherche de l'utilisateur
    var key = document.getElementById("search_key_word").value;
    for (var i = 0; i < sources.length; i++) {
        var score = computeScore(sources[i].title, key);
        sources[i].score = score;
    }

    //Tri de la liste suivant les scores
    sources.sort(function (a, b) {
        return a.score < b.score;
    });

    if (key != "") {
        //Suppression des sources de score nul si une recherche par mot clé a été effectuée
        var sources1 = [];

        for (var k = 0; k < sources.length; k++) {
            if (sources[k].score > 0) {
                sources1.push(sources[k]);
            }
        }
        sources = sources1
    }

    //Affichage
    displaySource(sources);
}

/**
 * Affichage de la liste des sources trouvées
 * @param {type} sources
 * @returns {void}
 */
function displaySource(sources) {
    //Div dans laquelle on affiche la liste des sources
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
 * Ouverture de la source i : on efface les markers affichés et on affiche les 
 * marqueurs pour les multimédias de la nouvelle source
 * @param {int} i - Index de la source
 * @returns {void}
 */
function openSource(i) {
    
    //On stocke la source ouverte
    document.getElementById("opensource").value=i;
    
    //On efface les précédents markers
    removeMarkers();
    
    //On efface les liens précédents
    removeLinks();

    //On récupère toutes les positions de la source
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

    //Si la temporalité est cochée, on affiche les liens temporels et la barre de défilement
    var temp = document.getElementById("display_temp").checked;
    if (temp) {
        displayTemp();
    } else {
        //Si la temporalité n'est pas souhaitée, on masque la barre de défilement
        document.getElementById("scrollbar").style.display = "none";
        document.getElementById("scrollbar").innerHTML = "";
        document.getElementById("mapid").style.height="100%";
    }
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
    //Pour chaque position
    for (var j = 0; j < pos.length; j++) {
        //On récupère les coordonnées gps
        var point = pos[j].geom;
        point = point.substring(6, point.length - 1);
        var pt = point.split(",");
        var x = pt[0];
        var y = pt[1];
        //On prépare la popup dans laquelle seront affichés les multimédias
        var popup = preparePopUp(i, pos[j].index);
        //On affiche un marqueur
        markers.push(addMarker(x, y, popup));
    }
    //Centrage de la carte
    centerMap(pos);
}

/**
 * Ajout d'un marqueur sur la carte
 * @param {double} x longitude
 * @param {double} y latitude
 * @param {popup} Popup
 * @returns {marqueur}
 */
function addMarker(x, y, popup) {
    //Div pour le marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(Ressources/marker_red.png)';
    el.style.width = '25px';
    el.style.height = '35px';
    //Ajout du marker
    var marker = new mapboxgl.Marker(el, {offset: [-12, 0]})
            .setLngLat([y, x])
            .setPopup(popup)
            .addTo(map);
    return marker;
}

/**
 * Pour chaque marqueur préparation de la pop-up associée. Au clic sur le marqueur,
 *  la pop up affiche la liste des multimédias disponibles à cet endroit.
 * @param {type} i - Index de la source
 * @param {type} j - Index du marqueur (position)
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
    //On renvoie la popup créée à partir du contenu html construit
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
    //Variable pour le contenu html
    var html = '';
    //Récupération des paramètres
    var title = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_title").value;
    var id = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_id").value;
    var publisher = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_publisher").value;
    var date = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_uploaddate").value;
    var type = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_type").value;
    //Création du lien
    //Lien 
    html += '<a class="link_marker"  onclick="openMult(' + i + ',' + j + ',' + k + ',' + id + ')">';
    html += '<div class="p_group">';
    //Icone video/image/son
    switch (type) {
        case 'VIDEO':
            html += "<img class=\"icon_video\" src=\"Ressources/video.png\"/>";
            break;
        case 'IMAGE':
            html += "<img class=\"icon_image\" src=\"Ressources/image.png\"/>";
            break;
        case 'SON':
            html += "<img class=\"icon_sound\" src=\"Ressources/sound.png\"/>";
            break;
    }
    //Titre, date, auteur
    html += '<div class="p">';
    html += '<p class = "link_title" > ';
    html += title;
    html += '</p>';
    html += '<p class="link_info">';
    html += by_fr + publisher + the_fr + date;
    html += '</p></div></div>';
    html += '</a>';
    //Renvoi du lien
    return html;
}

/**
 * Création du header pour les pop-up.
 * Le header des pop-up contient des checkbox qui permettent de trier la liste 
 * des multimédias suivant différents critères : titre, date, like, type ...
 * @param {type} i - Index de la source
 * @param {type} j - Index du marqueur
 * @returns {String} Header de la pop-up
 */
function header(i, j) {
    //Contenu html
    var html = '';
    //Checkbox pour le tri par titre
    html += '<p class="text">' + sort_by_fr + '</p>';
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"title_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"title\" value=\"title\" onclick=\"sort(" + i + "," + j + ")\">";
    html += title_fr + "</label>";
    html += "</div>";
    //Checkbox pour le tri par date
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"date_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"date\" value=\"date\" onclick=\"sort(" + i + "," + j + ")\">";
    html += date_fr + "</label>";
    html += "</div>";
    //Checkbox pour le tri par likes
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"likes_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"likes\" value=\"likes\" onclick=\"sort(" + i + "," + j + ")\">";
    html += likes_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type vidéo
    html += "<br><p class=\"text\">" + source_type_fr + "</p>";
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input  id=\"video_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"video\" value=\"video\" onclick=\"sort(" + i + "," + j + ")\" checked>";
    html += video_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type image
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"image_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"image\" value=\"image\" onclick=\"sort(" + i + "," + j + ")\" checked>";
    html += image_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type son
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"sound_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"sound\" value=\"sound\" onclick=\"sort(" + i + "," + j + ")\"checked>";
    html += sound_fr + "</label>";
    html += "</div>";
    //Checkbox pour supprimer les multimédia signaler comme mal géolocalisés
    html += "<br><div class=\"checkbox_pop\">";
    html += "<label><input id=\"badloc_" + i + "_" + j + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"badloc\" value=\"badloc\" onclick=\"sort(" + i + "," + j + ")\">";
    html += remove_bad_location_fr + "</label>";
    html += "</div>";
    html += "<HR align=center size=5 width=\"90%\">";
    return html;
}

/**
 * Calcule de la similarité entre la recherche de l'utilisateur et le titre d'une source.
 * Ce score est basé sur le nombre de mots en commun.
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

/**
 * Centrage d'une carte sur un ensemble de positions
 * @param {array} pos - Liste de positions
 * @returns {void}
 */
function centerMap(pos) {
    //Liste de points
    var points = extractPoints(pos);

    //Bounding box
    var lat_min = points[0].lat;
    var long_min = points[0].long;
    var lat_max = points[0].lat;
    var long_max = points[0].long;

    //Obtention de la bounding box
    for (var i = 1; i < points.length; i++) {
        var lat = points[i].lat;
        var long = points[i].long;

        if (lat_min > lat) {
            lat_min = lat;
        }
        if (lat_max < lat) {
            lat_max = lat;
        }
        if (long_min > long) {
            long_min = long;
        }
        if (long_max < long) {
            long_max = long;
        }
    }

    //Centrage
    fitBounds([[long_min, lat_min], [long_max, lat_max]]);
}

/**
 * Obtenir une liste de points à partir d'une liste de géométries
 * @param {type} pos - Liste de position
 * @returns {Liste de points}
 */
function extractPoints(pos) {
    //Liste de points
    var points = [];
    //Pour chaque position
    for (var i = 0; i < pos.length; i++) {
        //Création du point correspondant
        var p = new Object();
        //Extraction de la géométrie de la position : on récupère longitude et latitude
        var geom = pos[i].geom;
        geom = geom.substring(6, geom.length - 1);
        var pt = geom.split(",");
        // Affectation des longitude/ latitude au point
        p.lat = pt[0];
        p.long = pt[1];
        //Ajout du point dans le tableau
        points.push(p);
    }
    return points;
}

/**
 * Centrage de la carte sur une bounding box
 * @param {Array} boundsArray Bounding box
 * @returns {void}
 */
function fitBounds(boundsArray) {
    var bounds = new mapboxgl.LngLatBounds();
    boundsArray.forEach(function (item) {
        bounds.extend(item);
    });
    map.fitBounds(bounds, {padding: 200});
}
