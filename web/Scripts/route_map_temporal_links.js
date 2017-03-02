//Id min et max des lignes déssinées sur la carte
var line_min = 0;
var line_max = 0;

//Variable qui vaut 0 si aucune ligne n'est déssinée sur la carte et 1 sinon
var clear = 0;

/**
 * Fonction pour rafraîchir l'affichage des marqueurs et 
 * de la temporalité sur la carte
 * @returns {void}
 */
function refreshMap() {
    var i = document.getElementById("opensource").value;
    if (i != "") {
        openSource(i);
    }
}

/**
 * Affichage de la temporalité
 * @returns {void}
 */
function displayTemp() {
    //On affiche la barre de défilement
    document.getElementById("scrollbar").style.display = "block";
    document.getElementById("mapid").style.height = "80%";
    //Récupération des multimédias de la source ouverte
    //Index de la source ouverte
    var i = document.getElementById("opensource").value;
    //Multimédias de cette source qui ont une temporalité
    var mult = getTemporalMulti(i);
    //Tri du tableau selon de timestamp de début
    mult.sort(function (a, b) {
        if (a.start < b.start)
            return -1;
        if (a.end > b.end)
            return 1;
        return 0;
    });
    //Affichage des liens sur la carte
    displayLines(mult);

    //Affichage de la barre de défilement
    displayScrollbar(mult);
}

/**
 * Suppression de tous les liens temporels visibles sur la carte
 * @returns {void}
 */
function removeLinks() {
    if (clear == 1) { // si il y a des lignes, on les supprime
        for (var j = line_min; j <= line_max; j++) {
            map.removeLayer("line_" + j);
        }
        clear = 0;
    }
}

/**
 * Récupération de tous les multimédias qui ont un timestamp pour la source i
 * @param {int} i - Index de la source
 * @returns {array} Tableau de multimedias
 */
function getTemporalMulti(i) {
    var multis = [];
    //Pour  chaque position de la source
    var cpt = document.getElementById("nbPos" + i).value;
    for (var j = 0; j < cpt; j++) {
        var position = document.getElementById("src" + i + "_pos" + j).value;
        //Pour chaque multimédia de cette position
        var cpt1 = document.getElementById("nbMulti" + i + "_" + j).value;
        for (var k = 0; k < cpt1; k++) {
            //Timestamps
            var start = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_start").value;
            var end = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_end").value;

            if (start != "") {

                //Récupération des paramètres
                var title = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_title").value;
                var id = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_id").value;
                var publisher = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_publisher").value;
                var date = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_uploaddate").value;
                var type = document.getElementById("src" + i + "_pos" + j + "_multi" + k + "_type").value;
                //Création de l'objet
                var m = new Object();
                m.title = title;
                m.id = id;
                m.publisher = publisher;
                m.date = date;
                m.type = type;
                m.start = start;
                m.end = end;
                m.pos = position;
                //Ajout au tableau
                multis.push(m);
            }
        }
    }
    return multis;
}

/**
 * Affichage des liens temporels sur la carte
 * @param {array} mult - Tableau de multimédias trié de manière temporelle
 * @returns {void}
 */
function displayLines(mult) {

    line_min = line_max + 1;

    for (var i = 0; i < mult.length - 1; i++) {

        //Point de départ
        var geo1 = mult[i].pos;
        geo1 = geo1.substring(6, geo1.length - 1);
        var pt1 = geo1.split(",");
        var x1 = pt1[0];
        var y1 = pt1[1];
        var origin = [y1, x1];

        //Point d'arrivée
        var geo2 = mult[i + 1].pos;
        geo2 = geo2.substring(6, geo2.length - 1);
        var pt2 = geo2.split(",");
        var x2 = pt2[0];
        var y2 = pt2[1];
        var dest = [y2, x2];

        //Ligne
        var line = {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        origin,
                        dest
                    ]
                }
            }
        }

        //Dessin
        var layout = {
            "line-join": "round",
            "line-cap": "round"
        };
        var paint = {
            "line-color": "red",
            "line-width": 3,
            "line-dasharray": [1, 2]
        };
        var id = line_min + i;
        map.addLayer({"id": "line_" + id, "type": "line", "source": line, "layout": layout, "paint": paint});
    }
    line_max = line_min + mult.length - 2;
    
    //Clear passe à 1 car des lignes ont été dessinées
    clear = 1;
}

/**
 * Fonction pour afficher une barre de défilement sous la carte avec les multimédias
 * ordonnés
 * @param {array} mult - Tableau de multimédias à afficher dans lla barre de défilement
 * @returns {void}
 */
function displayScrollbar(mult) {
    //TODO
}