/**
 * Fonctions pour trier la liste des favoris
 */

/**
 * Tri de la liste des favoris selon les critères de l'utilisateur
 * @returns {void}
 */
function sort() {

    // Copie profonde du tableau de favoris
    var fav = [];
    for (var i = 0; i < favorites.length; i++) {
        fav.push(favorites[i]);
    }

    // **********************************************************
    // 1- Tri par type de multimédia
    // **********************************************************

    //Booléen valant vrai si l'utilisateur souhaite afficher les multimédia de type video
    var video = document.getElementById("sort_video").checked;
    //Booléen valant vrai si l'utilisateur souhaite afficher les multimédia de type image
    var image = document.getElementById("sort_image").checked;
    //Booléen valant vrai si l'utilisateur souhaite afficher les multimédia de type son
    var son = document.getElementById("sort_sound").checked;

    //Tableau contenant les indices multimédias à ne pas afficher
    var todelete = [];

    //Pour chaque multimédia, on regarde si son type est souhaité par l'utilisateur 
    //et si non, on l'ajoute dans le tableau des multimédias
    for (var j = 0; j < fav.length; j++) {
        if (fav[j].type === "VIDEO" && !video) {
            todelete.push(j);
        }
        if (fav[j].type === "IMAGE" && !image) {
            todelete.push(j);
        }
        if (fav[j].type === "SOUND" && !son) {
            todelete.push(j);
        }
    }
    //On supprime les multimédias qui sont dans le tableau todelete
    for (var k = 0; k < todelete.length; k++) {
        fav.splice(todelete[k], 1);

        for (var l = 0; l < todelete.length; l++) {
            todelete[l] = todelete[l] - 1;
        }
    }

    // **********************************************************
    // 2- Tri selon les titres
    // **********************************************************

    //Booléen vrai si l'utilisateur veut trier la liste par titre
    var title_sort = document.getElementById("sort_title").checked;
    //Tri selon les titres
    if (title_sort) {
        fav.sort(function (a, b) {
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        });
    }

    // **********************************************************
    // 3- Tri selon les dates
    // **********************************************************

    //Booléen vrai si l'utilisateur veut tirer la liste selon les dates d'upload
    var date_sort = document.getElementById("sort_date").checked;
    //Tri selon les dates
    if (date_sort) {
        fav.sort(function (a, b) {
            var aa = a.date.split("/");
            var bb = b.date.split("/");

            var annee1 = aa[0];
            var mois1 = aa[1];
            var jour1 = aa[2];
            var annee2 = bb[0];
            var mois2 = bb[1];
            var jour2 = bb[2];

            var dateA = new Date(annee1, mois1, jour1);
            var dateB = new Date(annee2, mois2, jour2)
            return dateA < dateB;
        });
    }

    //Affichage de la liste des favoris
    displayFavorite(fav);
    //Affichage des markers correspondants
    displayMarkers(fav);
}
