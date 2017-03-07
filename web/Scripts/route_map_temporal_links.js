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

    var table = document.getElementById("scrollbar");

    //Affichage des multimedias
    for (var i = 0; i < mult.length; i++) {

        var div = document.createElement("div");
        div.className = "div_mult";

        //Méthode pour ouvrir le multimédia
        div.addEventListener("click", delegateLaunchMult(mult[i].id), false);

        //Numéro du multimédia
        var num = document.createElement("num");
        num.className = "number";
        num.innerHTML = i + 1;

        //Titre
        var p = document.createElement("p");
        p.innerHTML = mult[i].title;
        p.className = "title_scrollbar";

        //Icone
        var img = document.createElement("img");
        switch (mult[i].type) {
            case 'VIDEO':
                img.className = "icon_video1";
                img.src = "./Ressources/video.png";
                break;
            case 'IMAGE':
                img.className = "icon_image1";
                img.src = "./Ressources/image.png";
                break;
            case 'SON':
                img.className = "icon_sound1";
                img.src = "./Ressources/sound.png";
                break;
        }
        div.appendChild(num);
        div.appendChild(img);
        div.appendChild(p);
        table.appendChild(div);
    }
}

/**
 * Fonction pour lancer un multimédia à partir de la frise temporelle
 * @param {int} id - Identifiant du multimédia
 * @returns {void}
 */
function launchMulti(id) {
    //On cherche les indices du multimédia
    var cptSrc = document.getElementById("nbSources").value;
    var i; //Indice de la source
    var j; // Indice de la position
    var k; //Indice du multimédia

    //On recherche le multimédia qui a le bon id
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

    //Zoom sur la position
    var geo = document.getElementById("src" + i + "_pos" + j).value;
    geo = geo.substring(6, geo.length - 1);
    var pt1 = geo.split(",");
    var x1 = pt1[0];
    var y1 = pt1[1];
    map.flyTo({center: [y1, x1], zoom : 18});

    //Ouverture
    setTimeout(function(){ openMult(i, j, k, id); }, 4000);

}

/**
 * Fonction de délégation : ouverture multimédia
 * @param {int} id - Identifiant du multimédia
 * @returns {Function}
 */
function delegateLaunchMult(id) {
    return function () {
        launchMulti(id);
    };
}