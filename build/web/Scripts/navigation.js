/**
 * Affichage de la route map
 * @returns {void}
 */
function getRouteMap() {
    var form = document.createElement('form');
    form.method = "GET";
    form.action = "routeMap.htm";

    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);

    document.body.appendChild(form);
    form.submit();
}

/**
 * Affichage de la global map
 * @returns {void}
 */
function getGlobalMap() {
    var form = document.createElement('form');
    form.method = "GET";
    form.action = "globalMap.htm";

    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);

    document.body.appendChild(form);
    form.submit();
}


/**
 * Affichage des favoris
 * @returns {void}
 */
function getFavorite() {
    var form = document.createElement('form');
    form.method = "GET";
    form.action = "favorite.htm";

    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);

    document.body.appendChild(form);
    form.submit();
}

/**
 * Fonction d'affichage dynamique
 * Changement du style au passage de la souris sur l'onglet favoris dans la barre de navigation
 */
function favoriteOver() {
    document.getElementById("favorite_link").style.color = "#FFFF51";
    document.getElementById("star").src = "Ressources/star_over.png";
}

/**
 * Fonction d'affichage dynamique
 * Changement du style lorsqu'on retire de la souris de l'onglet favoris dans la barre de navigation
 */
function favoriteOut() {
    document.getElementById("favorite_link").style.color = "#fffe83";
    document.getElementById("star").src = "Ressources/star.png";
}