function load() {
    loadText();
    loadMap();
}

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


        //UPLOAD GENERAL INFORMATION
        document.getElementById("title1").innerHTML = upload_contents_title_fr;
        document.getElementById("subtitle1").innerHTML = upload_subtitle1_fr;
        document.getElementById("upload_type_multimedia").innerHTML = upload_type_fr;
        document.getElementById("upload_title_multimedia").innerHTML = upload_title_fr;
        document.getElementById("upload_description").innerHTML = upload_description_fr;
        document.getElementById("upload_source").innerHTML = upload_source_fr;
        document.getElementById("upload_source_search").innerHTML = upload_source_search_fr;
        document.getElementById("upload_source_unknown").innerHTML = upload_source_unknown_fr;
        document.getElementById("upload_source_title").innerHTML = upload_source_title_fr;
        document.getElementById("upload_film").innerHTML = upload_source_movie_fr;
        document.getElementById("upload_serie").innerHTML = upload_source_serie_fr;
        document.getElementById("upload_game").innerHTML = upload_source_game_fr;
        document.getElementById("next1").innerHTML = next_fr;
        document.getElementById("upload_time_code").innerHTML = upload_time_code_fr;
        document.getElementById("upload_time_begin").innerHTML = upload_time_begin_fr;
        document.getElementById("upload_time_end").innerHTML = upload_time_end_fr;
        document.getElementById("upload_language").innerHTML = upload_language_fr;


        //UPLOAD MEDIA 1 : LOCALISATION
        document.getElementById("title2").innerHTML = upload_contents_title_fr;
        document.getElementById("subtitle2").innerHTML = upload_subtitle2_fr;
        document.getElementById("address").innerHTML = address_fr;
        document.getElementById("numero").innerHTML = numero_fr;
        document.getElementById("street").innerHTML = street_fr;
        document.getElementById("address_complement").innerHTML = address_complement_fr;
        document.getElementById("postal_code").innerHTML = postal_code_fr;
        document.getElementById("city").innerHTML = city_fr;
        document.getElementById("country").innerHTML = country_fr;
        document.getElementById("next2").innerHTML = next_fr;
        document.getElementById("location").innerHTML = location_title_fr;
        document.getElementById("alternative").innerHTML = alternative_fr;

        //UPLOAD MEDIA 2 : UPLOAD
        document.getElementById("title3").innerHTML = upload_contents_title_fr;
        document.getElementById("subtitle3").innerHTML = upload_subtitle3_fr;
        document.getElementById("input_choice").innerHTML = upload_choice_input_fr;
        document.getElementById("validation3").innerHTML = validation_fr;
        
        //POP-UP UPLOAD SUCCEDEED :
        document.getElementById("title4").innerHTML = upload_contents_title_fr;
        document.getElementById("upload_confirmed_done").innerHTML = upload_confirmed_done_fr;
        document.getElementById("valid_upload").innerHTML = valid_upload_fr;

    }
}




