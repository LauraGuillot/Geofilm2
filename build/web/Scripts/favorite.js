function load() {
    loadText();
    initFavorite();
    loadMap();
}


function loadText() {
    if (language == "fr") {
        //NAVIGATION
        document.getElementById("global_map").innerHTML = global_map_fr;
        document.getElementById("route_map").innerHTML = route_map_fr;
        document.getElementById("modification_link").innerHTML = modification_fr;
        document.getElementById("favorite_link").innerHTML = favorite_fr;

        //MODIFICATION DES INFORMATIONS PERSONNELLES
        document.getElementById("name_label").innerHTML = name_fr;
        document.getElementById("firstname_label").innerHTML = firstname_fr;
        document.getElementById("email_label").innerHTML = email_fr;
        document.getElementById("modification_title").innerHTML = modif_infos_fr;
        document.getElementById("valid_modif").innerHTML = validation_fr;

        //FAVORIS
        document.getElementById("title_fav").innerHTML = favorite2_fr;
        document.getElementById("sort_by").innerHTML = sort_by_fr;
        document.getElementById("title_label").innerHTML = title_fr;
        document.getElementById("date_label").innerHTML = date_fr;
        document.getElementById("sort_type").innerHTML = source_type_fr;
        document.getElementById("video_label").innerHTML = video_fr;
        document.getElementById("image_label").innerHTML = image_fr;
        document.getElementById("sound_label").innerHTML = sound_fr;
    }
}


