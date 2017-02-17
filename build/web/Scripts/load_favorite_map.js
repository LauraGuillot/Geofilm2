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
    displayMarkers(favorites);

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
var markers = [];
function displayMarkers(fav) {
//Suppression des markers existants
    removeMarkers();

    var indexTab = [];

    for (var i = 0; i < fav.length; i++) {

        //Si il y a déjà un marker pour cette position, on n'ajoute rien
        var index = fav[i].loc;
        var toAdd = true;
        for (var k = 0; k < indexTab.length; k++) {
            if (indexTab[k] == index) {
                toAdd = false;
            }
        }

        if (toAdd) {
            var point = document.getElementById("loc" + fav[i].loc).value;

            point = point.substring(6, point.length - 1);
            var pt = point.split(",");
            var x = pt[0];
            var y = pt[1];

            var popup = preparePopUp(fav, fav[i].loc);
            var m = addMarker(x, y, popup);
            markers.push(m);
        }
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
function preparePopUp(fav, i) {

    var html = '';
    //Pour chaque multimédia, on ajoute un lien
    html += '<div class="links" id="multis_' + i + '">';
    for (var j = 0; j < fav.length; j++) {
        if (fav[j].loc === i) {
            var li = getLinkMulti(i, fav[j].rank);
            html = html + li;
        }
    }
    html += '</div>';

    return new mapboxgl.Popup({offset: 25}).setHTML(html);
}

/**
 * Préparation d'un lien pour chaque multimédia
 * @param {type} i - indice de la popup
 * @param {type} j - indice du multimedia
 * @returns {String}
 */
function getLinkMulti(i, j) {
    var html = '';

    var title = document.getElementById("pos" + i + "_multi" + j + "_title").value;
    var id = document.getElementById("pos" + i + "_multi" + j + "_id").value;
    var publisher = document.getElementById("pos" + i + "_multi" + j + "_publisher").value;
    var date = document.getElementById("pos" + i + "_multi" + j + "_uploaddate").value;
    var type = document.getElementById("pos" + i + "_multi" + j + "_type").value;

    html += '<a class="link_marker"  onclick="openMulti(' + i + ',' + j + ')">';
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
 * Suppression de tous les marqueurs sur la carte
 * @returns {undefined}
 */
function removeMarkers() {
    for (var j = 0; j < markers.length; j++) {
        markers[j].remove();
    }
    markers = [];
}