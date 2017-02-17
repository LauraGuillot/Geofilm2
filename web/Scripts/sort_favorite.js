/**
 * Tri de la liste des favoris selon les critères de l'utilisateur
 * @returns {undefined}
 */
function sort() {

    // Copie profonde du tableau de favoris
    var fav = [];
    for (var i = 0; i < favorites.length; i++) {
        fav.push(favorites[i]);
    }

    //Tri par type 
    var video = document.getElementById("sort_video").checked;
    var image = document.getElementById("sort_image").checked;
    var son = document.getElementById("sort_sound").checked;

    var todelete = [];

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

    for (var k = 0; k < todelete.length; k++) {
        fav.splice(todelete[k], 1);

        for (var l = 0; l < todelete.length; l++) {
            todelete[l] = todelete[l] - 1;
        }
    }

//Tri par titre
    var title_sort = document.getElementById("sort_title").checked;
    if (title_sort) {
        fav.sort(function (a, b) {
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        });
    }

//Tri par date
    var date_sort = document.getElementById("sort_date").checked;
    if (date_sort) {
        // dateSort(multis);
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

    //Affichage
    displayFavorite(fav);
    displayMarkers(fav);
}
