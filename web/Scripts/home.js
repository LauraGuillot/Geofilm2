function load() {
    loadText();
    loadMap();
}


function loadText() {
    if (language == "fr") {
        //HOME
        document.getElementById("welcome").innerHTML = welcome_fr;
        document.getElementById("description").innerHTML = welcome_description_fr;
        document.getElementById("description2").innerHTML = welcome_description2_fr;
        document.getElementById("connexion").innerHTML = connection_fr;
        document.getElementById("error_gps").innerHTML = error_gps_fr;
        document.getElementById("close_error_gps").innerHTML = close_fr;
        document.getElementById("info_gps").innerHTML = info_gps_fr;
        //CONNECTION
        document.getElementById("connection_id").innerHTML = email_fr;
        document.getElementById("connection_password").innerHTML = password_fr;
        document.getElementById("password_forgotten").innerHTML = password_forgotten_fr;
        document.getElementById("membership").innerHTML = membership_fr;
        document.getElementById("connexion2").innerHTML = connection_fr;
        document.getElementById("valid_connexion").innerHTML = validation_fr;
        document.getElementById("click_here").innerHTML = click_here_fr;
        document.getElementById("click_here2").innerHTML = click_here_fr;
        document.getElementById("membership2").innerHTML = membership2_fr;
        document.getElementById("mandatory").innerHTML = mandatory_fr;
        //INSCRIPTION
        document.getElementById("valid_inscription").innerHTML = validation_fr;
        document.getElementById("inscription_password_label").innerHTML = inscription_password_fr;
        document.getElementById("inscription_password2_label").innerHTML = password2_fr;
        document.getElementById("inscription_email_label").innerHTML = email_fr;
        document.getElementById("inscription_name_label").innerHTML = name_fr;
        document.getElementById("inscription_firstname_label").innerHTML = firstname_fr;
        document.getElementById("inscription").innerHTML = inscription_fr;
        document.getElementById("mandatory2").innerHTML = mandatory_fr;
        //PASSWORD FORGOTTEN
        document.getElementById("password_title").innerHTML = password_title_fr;
        document.getElementById("password_forgotten_email_label").innerHTML = email_fr;
        //document.getElementById("mandatory3").innerHTML = mandatory_fr;
        document.getElementById("valid_password_forgotten").innerHTML = validation_fr;
    }
}
