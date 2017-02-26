/**
 * Fonctions pour charger la global map
 */

//Carte
var map;
/**
 * Chargement de la carte avec tous les marqueurs
 */
function loadMap() {
    //Création de la carte, centrage initial sur Paris
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZmlsbSIsImEiOiJjaXlqd2d1NGUwMDA5MnFrMXUyaHdtYmt5In0.zaWf5uM65g8RiAj9LACvHw';
    map = new mapboxgl.Map({
        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [2.287592000000018, 48.862725],
        zoom: 13
    });
    //Ajout du géocoder : barre de recherche par adresse
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    //Ajout d'un layer "building 3D" qui s'affiche au zoom
    map.on('load', function () {
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': {
                    'type': 'identity',
                    'property': 'height'
                },
                'fill-extrusion-base': {
                    'type': 'identity',
                    'property': 'min_height'
                },
                'fill-extrusion-opacity': .6
            }
        });
    });
    // Zoom 
    map.addControl(new mapboxgl.NavigationControl());
    //Affichage des marqueurs pour les multimédias
    displayMarkers();
    //Obtention (si possible) de la position de l'utilisateur
    getLocation();
    // Affichage de la position de l'utilisateur
    displayPosition();
    //Début du tracking de la position de l'utilisateur
    startTracker();
}

/**
 * Affichage des marqueurs pour les multimédias
 */
function displayMarkers() {
    //Pour chaque marqueur
    var cpt = document.getElementById("nbMarkers").value;
    for (var i = 0; i < cpt; i++) {
        //On récupère longitude et latitude
        var point = document.getElementById("p" + i).value;
        point = point.substring(6, point.length - 1);
        var pt = point.split(",");
        var x = pt[0];
        var y = pt[1];
        //On créer la popup qui s'affichera au clic sur le marqueur
        var popup = preparePopUp(i);
        //On affiche le marqueur
        addMarker(x, y, popup);
    }
}

/**
 * Ajout d'un marker sur la carte
 * @param {double} x longitude
 * @param {double} y latitude
 * @param {popup} popup
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
 * @param {type} i
 * @returns {popup}
 */
function preparePopUp(i) {
    //Mise en place du header
    var html = header(i);
    //Pour chaque multimédia, on ajoute un lien
    html += '<div class="links" id="multis_' + i + '">';
    var cpt = document.getElementById("nbMulti" + i).value;
    for (var j = 0; j < cpt; j++) {
        var li = getLinkMulti(i, j);
        html = html + li;
    }
    html += '</div>';
    //On renvoie la popup créée à partir du html construit
    return new mapboxgl.Popup({offset: 25}).setHTML(html);
}

/**
 * Préparation d'un lien pour chaque multimédia
 * @param {type} i - indice de la popup
 * @param {type} j - indice du multimedia
 * @returns {String}
 */
function getLinkMulti(i, j) {
    //Variable pour le contenu html
    var html = '';
    //Récupération des paramètres
    var title = document.getElementById("pos" + i + "_multi" + j + "_title").value;
    var id = document.getElementById("pos" + i + "_multi" + j + "_id").value;
    var publisher = document.getElementById("pos" + i + "_multi" + j + "_publisher").value;
    var date = document.getElementById("pos" + i + "_multi" + j + "_uploaddate").value;
    var type = document.getElementById("pos" + i + "_multi" + j + "_type").value;
    //Création du lien
    //Lien 
    html += '<a class="link_marker"  onclick="openMult(' + i + ',' + id + ',' + j + ')">';
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
 * @param {type} i - Index de la pop-up
 * @returns {String} Header de la pop-up
 */
function header(i) {
    //Contenu html
    var html = '';
    //Checkbox pour le tri par titre
    html += '<p class="text">' + sort_by_fr + '</p>';
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"title_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"title\" value=\"title\" onclick=\"sort(" + i + ")\">";
    html += title_fr + "</label>";
    html += "</div>";
    //Checkbox pour le tri par date
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"date_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"date\" value=\"date\" onclick=\"sort(" + i + ")\">";
    html += date_fr + "</label>";
    html += "</div>";
    //Checkbox pour le tri par likes
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"likes_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"likes\" value=\"likes\" onclick=\"sort(" + i + ")\">";
    html += likes_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type vidéo
    html += "<br><p class=\"text\">" + source_type_fr + "</p>";
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input  id=\"video_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"video\" value=\"video\" onclick=\"sort(" + i + ")\" checked>";
    html += video_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type image
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"image_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"image\" value=\"image\" onclick=\"sort(" + i + ")\" checked>";
    html += image_fr + "</label>";
    html += "</div>";
    //Checkbox pour afficher les multimédias de type son
    html += "<div class=\"checkbox_pop\">";
    html += "<label><input id=\"sound_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"sound\" value=\"sound\" onclick=\"sort(" + i + ")\"checked>";
    html += sound_fr + "</label>";
    html += "</div>";
    //Checkbox pour supprimer les multimédia signaler comme mal géolocalisés
    html += "<br><div class=\"checkbox_pop\">";
    html += "<label><input id=\"badloc_" + i + "\" class=\"checkbox_marker\" type=\"checkbox\" name=\"badloc\" value=\"badloc\" onclick=\"sort(" + i + ")\">";
    html += remove_bad_location_fr + "</label>";
    html += "</div>";
    html += "<HR align=center size=5 width=\"90%\">";
    return html;
}


