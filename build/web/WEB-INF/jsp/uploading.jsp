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

        <!-- MAP -->
        <script src="Scripts/mapbox_tracker.js"></script>

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


            <!--Premier bloc : informations générales-->

            <div id="content_general" class="row">
                <div id="head" class="col-md-6">
                    <p class="title" id="title1"></p>
                    <p class="title" id="subtitle1"></p>
                    <!--TODO : mettre image step-->
                </div>
                <div id ="content1" class="col-md-6">

                    <!--Saisie du type de multimédia-->
                    <p class="error_message" id="error_multimedia_type"></p>
                    <p class="label_form" id="upload_type_multimedia"></p>
                    <input type="radio" name="video" id="upload_video" value="v"> <!--changer v par video ?-->
                    <input type="radio" name="image" id="upload_image" value="i"> 
                    <input type="radio" name="sound" id="upload_sound" value="s"> 

                    <!--Saisie du titre de multimédia-->
                    <p class="error_message" id="error_name"></p>
                    <p class="label_form" id="upload_title_multimedia"></p>
                    <p class="label_form" id="star1"></p>
                    <br>
                    <input type="text" name="titre" id="upload_title_entered"><!--id = id à retenir pour le fichier upload.js-->

                    <!--Saisie d'une description du multimédia-->
                    <p class="label_form" id="upload_description"></p>
                    <input type="text" name ="description" id="upload_description_entered">

                    <!--Saisie des informations liées à la source (nom, type)-->
                    <p class="error_message" id="error_source_type"></p>
                    <p class="label_form" id="upload_source"></p>
                    <p class="label_form" id="star2"></p>
                    <br>
                    <input type="" name="source" id="upload_source_entered">
                    <select>
                        <option id="upload_source_search"></option>
                        <option id="upload_film"></option>
                        <option id="upload_serie"></option>
                        <option id="upload_game"></option>
                    </select>
                    <input type ="submit">
                    <br>
                    <p class="label_form" id="upload_source_title"></p>
                    <br>
                    <input type="text" name="title_source" id="upload_source_title_entered">
                </div>
                <!--TODO : renvoi du bouton validation-->
                <right><button id ="validation1" type="button" class="button small_button" onclick="" style="margin-bottom: 40px"></button></right>

            </div>

            <!--Deucième bloc de saisie des informations de localisation-->
            <div id="upload1" class="row" style="visibility:hidden;">
                <div id="title" class="head">
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
                    <p class=label_form" id="star3">    </p>
                    <p class="label_form" id="street"></p>
                    <p class=label_form" id="star4"></p>    
                    <br>
                    <input type="text" name="loc_numero" id="numero_entered">
                    <input type="text" name="loc_street" id="street_entered">
                    <br>
                    <p class="label_form" id="address_complement"></p>
                    <input type="text" id="address_complement_entered" name="loc_ad_complement">
                    <p class ="label_form" id="postal_code"></p>
                    <p class="label_form" id="star5"></p>
                    <input type="text" name="loc_code" id="postal_code_entered">
                    <p class="label_form" id="city"></p>
                    <p class="label_form" id="star6"></p>
                    <input type="text" name="loc_city" id="city_entered">
                    <p class="label_form" id="country"></p>
                    <p class="label_form" id="star7"></p>
                    <input type="text" name="loc_country" id="country_entered">
                </div>
                <div id="right_div" class="col-md-6">
                    <!--TODO : carte interactive -->
                </div>
                <right><button id ="validation2" type="button" class="button small_button" onclick="" style="margin-bottom: 40px"></button></right>

            </div>

            <!--3eme bloc : Upload du multimédia-->
            <div id="upload2" class="row" style="visibility:hidden">
                <div id="head" class="col-md-6">
                    <p class="title" id="title3"></p>
                    <p class="title" id="subtitle3"></p>
                    <!--TODO : mettre image step-->
                </div>
                <div id ="content1" class="col-md-6">
                    <!--Parcourir les fichiers de l'utilisateur pour uploader un multimédia-->
                    <p class="label_form" id="input_choice"></p>
                    <p class="label_form" id="star8"></p>
                    <input type="file" name="file" id="file_entered">
                </div>
                <right><button id ="validation3" type="button" class="button small_button" onclick="" style="margin-bottom: 40px"></button></right>


            </div>

        </div>


    </body>
</html>

