/**
 * Fonction de chargement appelée à l'ouverture de la carte principale:
 * chargement du texte et chargement de la carte
 */
function load() {
    //Chargement des chaînes de caractère
    loadText();
    //Chargement de la carte
    loadMap();
}

/**
 * Chargement du texte dans la carte principale
 */
function loadText() {
    if (language == "fr") {

        //NAVIGATION GRANDS ECRANS 
        document.getElementById("global_map").innerHTML = global_map_fr;
        document.getElementById("route_map").innerHTML = route_map_fr;
        document.getElementById("modification_link").innerHTML = modification_fr;
        document.getElementById("favorite_link").innerHTML = favorite_fr;
        
        //NAVIGATION PETITS ECRANS
        document.getElementById("global_map1").innerHTML = global_map_fr;
        document.getElementById("route_map1").innerHTML = route_map_fr;
        document.getElementById("modification_link1").innerHTML = modification_fr;
        document.getElementById("favorite_link1").innerHTML = favorite1_fr;
         document.getElementById("deconnect").innerHTML = deconnect_fr;

        //MODIFICATION DES INFORMATIONS PERSONNELLES
        document.getElementById("name_label").innerHTML = name_fr;
        document.getElementById("firstname_label").innerHTML = firstname_fr;
        document.getElementById("email_label").innerHTML = email_fr;
        document.getElementById("modification_title").innerHTML = modif_infos_fr;
        document.getElementById("valid_modif").innerHTML = validation_fr;

        //POP-UP MULTIMEDIA
        document.getElementById("add_favorite").innerHTML = add_favorite_fr;
        document.getElementById("added_favorite").innerHTML = favorite_added_fr;
        document.getElementById("signal").innerHTML = signal_fr;
        document.getElementById("signal2").innerHTML = signal2_fr;
        document.getElementById("signal_locked").innerHTML = signal_lock_fr;

        //VOLET DE GAUCHE
        document.getElementById("select_default").innerHTML = chose_source_fr;
        document.getElementById("select_film").innerHTML = film_fr;
        document.getElementById("select_serie").innerHTML = serie_fr;
        document.getElementById("select_game").innerHTML = game_fr;
        document.getElementById("or").innerHTML = or_fr;
        document.getElementById("search_key_word").placeholder = search_key_word_fr;
        document.getElementById("temp_label").innerHTML = temp_fr;
    }
}

/**
 * Fonction d'affichage dynamique pour le bouton d'ajout aux favoris
 */
function overFavorite() {
    document.getElementById("button_favorite").src = "Ressources/star_over.png";
    document.getElementById("add_favorite").style.color = "#FFFF51";
    document.getElementById("add_favorite").style.textDecoration = "underline";
}
/**
 * Fonction d'affichage dynamique pour le bouton d'ajout aux favoris
 */
function outFavorite() {
    document.getElementById("button_favorite").src = "Ressources/star.png";
    document.getElementById("add_favorite").style.color = "#fffe83";
    document.getElementById("add_favorite").style.textDecoration = "none";
}
