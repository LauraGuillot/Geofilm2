/**
 * Fonctionnalités de la barre de navigation
 */

/**
 * Onglet route map
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
 * Onglet global map
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
    
    var c2 = document.createElement('input');
    c2.type = "hidden";
    c2.name = "up";
    c2.value = "0";
    form.appendChild(c2);

    document.body.appendChild(form);
    form.submit();
}

/**
 * Accès à la page d'upload
 * @returns {void}
 */
function getUpload() {
    var form = document.createElement('form');
    form.method = "GET";
    form.action = "uploading.htm";
    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);
    document.body.appendChild(form);
    form.submit();
}

/**
 * Onglet favoris
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

/**
 * Affichage du menu vertical au clic sur l'icone
 * @returns {void}
 */
function displayVerticalMenu() {
    if (document.getElementById("vmenu").style.display == 'none' || document.getElementById("vmenu").style.display == '') {
        document.getElementById("vmenu").style.display = 'block';
    } else {
        document.getElementById("vmenu").style.display = 'none';
    }
}

/**
 * Lorsqu'on agrandit la fenètre, on rend le menu vertical invisible 
 * @returns {void}
 */
window.onresize = function () {
    var larg = (document.body.clientWidth);
    if (larg > 770) {
        document.getElementById("vmenu").style.display = 'none';
    }
}