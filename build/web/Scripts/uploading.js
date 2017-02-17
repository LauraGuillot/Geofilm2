function load() {
    loadText();
}


function loadText() {
    if (language == "fr") {
        document.getElementById("star1").innerHTML = star_fr;
        document.getElementById("star2").innerHTML = star_fr;
        document.getElementById("star3").innerHTML = star_fr;
        document.getElementById("star4").innerHTML = star_fr;
        document.getElementById("star5").innerHTML = star_fr;
        document.getElementById("star6").innerHTML = star_fr;
        document.getElementById("star7").innerHTML = star_fr;
        document.getElementById("star8").innerHTML = star_fr;


        //UPLOAD GENERAL INFORMATION
        document.getElementById("title1").innerHTML = upload_title_fr;
        document.getElementById("subtitle1").innerHTML = upload_subtitle1_fr;
        document.getElementById("upload_type_multimedia").innerHTML = upload_type_fr;
        document.getElementById("upload_video").innerHTML = upload_video_fr;
        document.getElementById("upload_sound").innerHTML = upload_sound_fr;
        document.getElementById("upload_image").innerHTML = upload_image_fr;
        document.getElementById("upload_title_multimedia").innerHTML = title_fr;
        document.getElementById("upload_description").innerHTML = upload_description_fr;
        document.getElementById("upload_source").innerHTML = upload_source_fr;
        document.getElementById("upload_source_search").innerHTML = upload_source_search_fr;
        document.getElementById("upload_source_unknown").innerHTML = upload_source_unknown_fr;
        document.getElementById("upload_source_title").innerHTML = upload_source_title_fr;
        document.getElementById("upload_film").innerHTML = upload_source_movie_fr;
        document.getElementById("upload_serie").innerHTML = upload_source_serie_fr;
        document.getElementById("upload_game").innerHTML = upload_source_game_fr;
        document.getElementById("validation1").innerHTML = validation_fr;

        

        //UPLOAD MERDIA 1 : LOCALISATION
        document.getElementById("title2").innerHTML = upload_title_fr;
        document.getElementById("subtitle2").innerHTML = upload_subtitle2_fr;
        document.getElementById("address").innerHTML = address_fr;
        document.getElementById("numero").innerHTML = numero_fr;
        document.getElementById("street").innerHTML = street_fr;
        document.getElementById("address_complement").innerHTML = address_complement_fr;
        document.getElementById("postal_code").innerHTML = postal_code_fr;
        document.getElementById("city").innerHTML = city_fr;
        document.getElementById("country").innerHTML = country_fr;
        document.getElementById("next").innerHTML = next_fr;
        document.getElementById("title2").innerHTML = upload_title_fr;
        document.getElementById("validation2").innerHTML = validation_fr;

        //UPLOAD MERDIA 2 : UPLOAD
        document.getElementById("title3").innerHTML = upload_title_fr;
        document.getElementById("subtitle3").innerHTML = upload_subtitle3_fr;
        document.getElementById("input_choice").innerHTML = upload_choice_input_fr;
        document.getElementById("validation3").innerHTML = validation_fr;

    }
}


