function load() {
    loadText();
}


function loadText() {
    if (language == "fr") {
      
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
       

        //UPLOAD MEDIA 1 : LOCALISATION
        document.getElementById("title2").innerHTML = upload_title_fr;
        document.getElementById("subtitle2").innerHTML = upload_subtitle2_fr;
        document.getElementById("address").innerHTML = address_fr;
        document.getElementById("numero").innerHTML = numero_fr;
        document.getElementById("street").innerHTML = street_fr;
        document.getElementById("address_complement").innerHTML = address_complement_fr;
        document.getElementById("postal_code").innerHTML = postal_code_fr;
        document.getElementById("city").innerHTML = city_fr;
        document.getElementById("country").innerHTML = country_fr;
        document.getElementById("next2").innerHTML = next_fr;
        document.getElementById("title2").innerHTML = upload_title_fr;

        //UPLOAD MEDIA 2 : UPLOAD
        document.getElementById("title3").innerHTML = upload_title_fr;
        document.getElementById("subtitle3").innerHTML = upload_subtitle3_fr;
        document.getElementById("input_choice").innerHTML = upload_choice_input_fr;
        document.getElementById("validation3").innerHTML = validation_fr;

    }
}


