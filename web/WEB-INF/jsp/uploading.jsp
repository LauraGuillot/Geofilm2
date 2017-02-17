<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!--DOCTYPE html-->
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Geofilm</title>
        <link rel="shortcut icon" href="Ressources/logo2.png" >

        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <!--MAP BOX -->
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.css' rel='stylesheet' />
        <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.0.1/mapbox-gl-geocoder.js'></script>
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.0.1/mapbox-gl-geocoder.css' type='text/css' />

        <!-- CHAINES DE CARACTERES -->
        <script src="Scripts/language.js"></script>
        <script src="Scripts/strings.js"></script>

        <!-- STYLES -->
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/navigation.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/button.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_error.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_form.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/font.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/pop_up_marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/uploading.css">

        <!-- MAP -->
        <script src="Scripts/mapbox_tracker.js"></script>
        <script src="Scripts/load_map_2.js"></script> <!--TODO : load map 3 (petite map sur le côté ?-->

        <!-- SCRIPTS -->
           <script src="Scripts/navigation.js"></script>
        <script src="Scripts/deconnect.js"></script>
        <script src="Scripts/modif_infos_perso.js"></script>
        <script src="Scripts/uploading.js"></script>
        <script src="Scripts/upload.js"></script>

    </head>
    <body onload="load();">

        <!-- CHARGEMENT DES DONNEES -->

        <!-- Données personnelles-->
        <input type="hidden" id="name" value="<c:out value="${nom}"/>"/> 
        <input type="hidden" id="firstname" value="<c:out value="${prenom}"/>"/> 
        <input type="hidden" id="email" value="<c:out value="${email}"/>"/> 
        <input type="hidden" id="idco" value="<c:out value="${idco}"/>"/> 

        <!-- NAVIGATION -->
        <nav class="navbar-default navbar " role="navigation">
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="navbar-left" ><a href="#" id="logo"><img src="Ressources/logo1.png" width="100px" ></a></li> <!-- LOGO-->
                    <li class="navbar-left onglet" ><a onclick="getGlobalMap();" class=" onglet " id="global_map"></a></li> <!-- ONGLET GLOBAL MAP-->
                    <li class="navbar-left onglet" ><a onclick="getRouteMap();" class="onglet " id="route_map"></a></li> <!-- ONGLET ROUTE MAP-->
                    <li class="navbar-right"><a href="#"><img id="connection" src="Ressources/connection.png" onMouseOver="this.src = 'Ressources/connection_over.png'" onMouseOut="this.src = 'Ressources/connection.png'" width="25px" onclick="deconnect();"></a></li><!-- Connexion-->
                    <!-- INFORMATION PERSONNELLES-->
                    <li class="navbar-right" style="margin-right:20px; border-left: solid white 1px; padding-left:6px;">
                        <!-- nom prénom-->
                        <p class="info_perso" id="info_name" style="margin-top:10px;font-weight:bold;"><c:out value="${prenom}"/> <c:out value="${nom}"/></p>
                        <!-- email-->
                        <p class="info_perso"id="info_email" ><c:out value="${email}"/></p>
                        <!-- lien de modificatio -->
                        <a id="modification_link" href="#" onclick="pop_info();"></a>
                    </li>
                    <!-- ONGLET FAVORIS-->
                    <li class="navbar-right">
                        <a href="#" onclick="getFavorite();" onmouseover="favoriteOver();" onmouseout="favoriteOut();" style="padding-right:6px;padding-top:9px;">
                            <img id="star" style="padding-bottom:4px;" src="Ressources/star.png" width="30px" >
                            <p id="favorite_link"></p>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- CONTENU PRINCIPAL -->
        <div class="container"> 
            <!--Trois blocs pour l'upload-->

            <div class="row">
                <!--Premier bloc : informations générales-->

                <div class="uploading" id="content_general">
                    <div  id="head">
                        <p class="title" style="padding-bottom: 0px!important" id="title1" > </p> 
                        <p class="title" style="font-style:italic" id="subtitle1"> </p>
                        <!--TODO : mettre image step-->
                    </div>
                    <div id="content_general1" class="col-md-6">

                        <!--Saisie du type de multimédia-->
                        <br>
                        <p class="error_message" id="error_multimedia_type"> </p>
                        <br>
                        <p class="label_form" style="display:inline-block!important;" id="upload_type_multimedia"></p>

                        <div style="display:inline-block!important" class="input_upload">
                            <label for="u_video" style="display:inline-block!important;"> </label>
                            <input class="radio_marker" style="display:inline-block!important; margin-right:3px; margin-bottom:12px!important; width:30px;" type="radio" name="choix_type" id="u_video" value="v"><p style="display:inline-block!important; color:white;">Video</p>
                        </div>
                        <div style="display:inline-block!important" class="input_upload">
                            <label for="u_sound" style="display:inline-block!important; color:white;"></label>
                            <input class="radio_marker" style="display:inline-block!important; margin-right:5px; margin-bottom:12px!important; width:30px;" type="radio" name="choix_type" id="u_sound" value="s"><p style="display:inline-block!important; color:white;">Son</p>
                        </div>
                        <div style="display:inline-block!important" class="input_upload">
                            <label for="u_image" style="display:inline-block!important; color:white;"></label>
                            <input class="radio_marker" style="display:inline-block!important; margin-right:5px; margin-bottom:12px!important; width:30px;" type="radio" name="choix_type" id="u_image" value="i"><p style="display:inline-block!important; color:white;">Image</p>
                        </div>
                        <br>

                        <!--Saisie du titre de multimédia-->
                        <div class="input_upload">
                            <p class="error_message" id="error_name"></p>
                            <p class="label_form" id="upload_title_multimedia"></p>
                            <input style="width:500px!important;" type="text" name="titre" id="upload_title_entered"><!--id = id à retenir pour le fichier upload.js-->
                        </div>


                        <!--Saisie d'une description du multimédia-->
                        <div class="input_upload">
                            <p class="label_form" id="upload_description"></p>
                            <input style="width:500px!important;" type="text" name ="description" id="upload_description_entered">
                        </div>
                        
                        <!--Saisie du time code (surtout s'il s'agit d'une séquence video)-->
                        <div class="input_upload">
                            <p class="label_form" id="upload_time_code"></p>
                            <p class="label_form" style="display:inline-block!important" id="upload_time_begin"></p>
                            <input style="display:inline-block!important; width:100px!important;" id="time_begin" type="time" name="begin">
                            <p class="label_form" style="display:inline-block!important" id="upload_time_end"></p>
                            <input style="display:inline-block!important; width:100px!important;" id="time_end" type="time" name="end"> <!--A récupérer sous la forme d'une chaine de caracatères-->
                            
                        </div>


                        <!--Saisie des informations liées à la source (nom, type)-->
                        <div class="input_upload">
                            <p class="error_message" id="error_source_type"></p>
                            <p class="label_form" id="upload_source"></p>
                            <select id="choice_source" name="choice" onchange="">
                                <option selected id="upload_source_search">
                                <option style="color:black!important" id="upload_source_unknown"></option>
                                <option style="color:blacl!important" id="upload_film"></option>
                                <option style="color:black!important" id="upload_serie"></option>
                                <option style="color:black!important" id="upload_game"></option>
                            </select>
                            
                        </div>
                        <br>
                        <div class="input_upload">
                            <p class="label_form" id="upload_source_title"></p>
                            <input style="width:500px!important;" type="text" name="title_source" id="upload_source_title_entered">
                        </div>
                    </div>
                    <div id="content_general2" class="col-md-6">
                        <!--TODO : renvoi du bouton suivant-->
                        <right><button id ="next1" type="button" class="button small_button" href="#" onclick="valid_form_upload1();" style="margin-left:300px; margin-top: 500px"></button></right>
                    </div>
                </div>

                <!--Deucième bloc de saisie des informations de localisation-->
                <div id="content_upload1" class="col-md-8" style="visibility:hidden;">
                    <div class="head">
                        <p class="title" id="title2"></p>
                        <p class="title" id="subtitle2"></p>
                        <!--TODO : mettre image step-->
                    </div>
                    <div id="left_div" class="col-md-6">
                        <!--Saisie du numéro, de la rue, d'un complément d'adresse si nécessaire,
                        du code postal, puis de la ville, et du pays-->
                        <p class="title" id="address"></p>
                        <p class="error_message" id="error_mandatory"></p>
                        <p class="label_form" id="numero"></p>
                        <p class="label_form" id="street"></p> 
                        <br>
                        <input type="text" name="loc_numero" id="numero_entered">
                        <input type="text" name="loc_street" id="street_entered">
                        <br>
                        <p class="label_form" id="address_complement"></p>
                        <input type="text" id="address_complement_entered" name="loc_ad_complement">
                        <p class ="label_form" id="postal_code"></p>
                        <input type="text" name="loc_code" id="postal_code_entered">
                        <p class="label_form" id="city"></p>
                        <input type="text" name="loc_city" id="city_entered">
                        <p class="label_form" id="country"></p>
                        <input type="text" name="loc_country" id="country_entered">
                    </div>
                    <div id="right_div" class="col-md-6">
                        <!--TODO : carte interactive -->
                    </div>
                    <right><button id ="next2" type="button" class="button small_button" onclick="" style="margin-bottom: 40px"></button></right>

                </div>

                <!--3eme bloc : Upload du multimédia-->
                <div class="content_upload2" style="visibility:hidden">
                    <div class="head">
                        <p class="title" id="title3"></p>
                        <p class="title" id="subtitle3"></p>
                        <!--TODO : mettre image step-->
                    </div>
                    <div class="col-md-6">
                        <!--Parcourir les fichiers de l'utilisateur pour uploader un multimédia-->
                        <p class="label_form" id="input_choice"></p>
                        <input type="file" name="file" id="file_entered">
                    </div>
                    <right><button id ="validation3" type="button" class="button small_button" onclick="" style="margin-bottom: 40px"></button></right>


                </div>
            </div>
        </div>

        <!--POPUP : modification des informations personnelles-->
        <div class="modal fade" id="modification_form" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content modal_form">
                    <!-- Croix de fermeture -->
                    <button class="close" data-dismiss="modal">&times;</button>
                    <!-- Titre -->
                    <center>
                        <p id="modification_title" class= "title"  style="margin-top: 40px"</p> 
                    </center>
                    <!-- Zone pour les messages d'erreurs -->
                    <p id="modification_error" class="error_message"></p>

                    <!-- Formulaire de modification -->
                    <div class="modal-body">  
                        <!-- Champ pour le nom -->
                        <p class="label_form" id="name_label"></p>
                        <input type="text" name ="name" id="name_input"> 
                        <!-- Champ pour le prénom -->
                        <p  class="label_form" id="firstname_label"></p>
                        <input  type="text" name="firstname" id="firstname_input">
                        <!-- Champ pour l'email -->
                        <p  class="label_form" id="email_label"></p>
                        <input  type="text" name="email" id="email_input">
                        <!-- Bouton pour soumettre le formulaire de modification -->
                        <center>
                            <button id ="valid_modif" type="button" class="button small_button" onclick="modif();"></button>
                        </center>
                    </div>
                </div>
            </div>
        </div>


    </body>
</html>

                      