<!-- FAVORIS -->

<!-- tag-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
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
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/favorite.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/button.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_error.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_form.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/font.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/pop_up_marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_multimedia.css">

        <!-- SCRIPTS -->
        <script src="Scripts/navigation.js"></script>
        <script src="Scripts/favorite.js"></script>
        <script src="Scripts/deconnect.js"></script>
        <script src="Scripts/modif_infos_perso.js"></script> 
        <script src="Scripts/display_favorite.js"></script> 
        <script src="Scripts/load_favorite_map.js"></script> 
        <script src="Scripts/mapbox_tracker.js"></script> 
        <script src="Scripts/sort_favorite.js"></script> 
        <script src="Scripts/delete_favorite.js"></script> 

    </head>
    <body onload="load();"><!-- Chargement des chaînes de caractères et de la carte-->

        <!-- CHARGEMENT DES DONNEES -->
        <div style="display:none;">
            <!-- Données personnelles-->
            <input type="hidden" id="person_id" value="<c:out value="${id}"/>"/>
            <input type="hidden" id="name" value="<c:out value="${nom}"/>"/> 
            <input type="hidden" id="firstname" value="<c:out value="${prenom}"/>"/> 
            <input type="hidden" id="email" value="<c:out value="${email}"/>"/> 
            <input type="hidden" id="idco" value="<c:out value="${idco}"/>"/>   
            <!-- Position-->
            <input type="hidden" id="nbLoc" value="<c:out value="${fn:length(locations)}"/>"/> 
            <c:forEach var="l" items="${locations}" varStatus="status">
                <input type="hidden" id="loc<c:out value="${status.index}"/>" value="<c:out value="${l['locationThegeom']}"/>"/>
            </c:forEach> 

            <!-- Favoris-->
            <c:forEach var="mu" items="${favorites}" varStatus="status">
                <input type="hidden" id="nbMulti<c:out value="${status.index}"/>" value="<c:out value="${fn:length(mu)}"/>"/> 
                <c:forEach var="m" items="${mu}" varStatus="status1">
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_id"/>" value="<c:out value="${m['multimediaId']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_title"/>" value="<c:out value="${m['multimediaTitle']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_publisher"/>" value="<c:out value="${m['publisher']['personFirstname']}"/> <c:out value="${m['publisher']['personName']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_descr"/>" value="<c:out value="${m['multimediaDescription']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_path"/>" value="<c:out value="${m['multimediaPath']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_uploaddate"/>" value="<c:out value="${m['multimediaUploadDate']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_format"/>" value="<c:out value="${m['multimediaFormat']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_type"/>" value="<c:out value="${m['multimediaType']}"/>"/>
                </c:forEach>
            </c:forEach>
        </div>

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
                        <a href="#" onclick="" onmouseover="favoriteOver();" onmouseout="favoriteOut();" style="padding-right:6px;padding-top:9px;">
                            <img id="star" style="padding-bottom:4px;" src="Ressources/star.png" width="30px" >
                            <p id="favorite_link"></p>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- CONTENU PRINCIPAL -->
        <div class="container"> 
            <div  class="row content">          
                <!-- Volet de gauche-->
                <div id="left_div" class="col-md-4"> 
                    <!-- Zone pour les fonctionnalités de tri-->
                    <div class="sort">
                        <!--TITRE-->
                        <div id="title_fav" class="title" style="font-size: 18pt;"></div>
                        <br>

                        <div class="form_fav">
                            <!-- Tri attributaire-->
                            <p class="text" id="sort_by"></p>

                            <!-- Tri par titre -->
                            <div class="input_checkbox">    
                                <input id="sort_title" class="checkbox_fav" type="checkbox" name="title" onclick="sort();"/>
                                <label class="input_label" id="title_label"> </label>
                            </div>

                            <!-- Tri par date -->
                            <div class="input_checkbox">
                                <input id="sort_date" class="checkbox_fav" type="checkbox" name="date" onclick="sort();"/>
                                <label class="input_label" id="date_label"> </label>
                            </div>
                        </div>
                        <div class="form_fav" style="margin-left: 20px;">
                            <!-- Tri par type de contenu -->
                            <p class="text" id="sort_type"></p>
                            <!-- Video -->
                            <div class="input_checkbox">                
                                <input id="sort_video" class="checkbox_fav" type="checkbox" name="video" onclick="sort();" checked="true"/>    
                                <label class="input_label" id="video_label"> </label>
                            </div>
                            <!-- Image -->
                            <div class="input_checkbox">                         
                                <input id="sort_image" class="checkbox_fav" type="checkbox" name="image" onclick="sort();" checked="true"/>   
                                <label class="input_label" id="image_label"> </label>
                            </div>
                            <!-- Son -->
                            <div class="input_checkbox">
                                <input id="sort_sound" class="checkbox_fav" type="checkbox" name="sound" onclick="sort();" checked="true"/>   
                                <label class="input_label" id="sound_label"> </label>
                            </div>
                        </div>
                    </div>

                    <center>
                        <div id="separator"> </div>
                    </center>
                    <!-- Zone pour afficher les favoris-->
                    <div id="favorite"></div>  
                </div>

                <!-- Map -->
                <div id="mapid" class="col-md-8"> </div>
            </div>
        </div>

        <!--POPUP : visualisation d'un multimédia-->
        <div class="modal fade" id="multimedia_pop" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content modal_form">
                    <!-- Croix de fermeture -->
                    <button class="close close1" data-dismiss="modal">&times;</button>
                    <!-- Champ caché pour l'id du multimédia ouvert -->
                    <input type="hidden" id="multi_open" value=""/>

                    <div class="modal-body"> 
                        <!-- Multimédia -->
                        <div id="multimedia_div"></div>

                        <!-- Informations-->
                        <div id="multimedia_info">
                            <p id="multi_title"></p>
                            <p id="multi_publisher_date"></p>
                            <p id="multi_descr"></p>
                        </div>

                        <div id="multimedia_action">
                            <!-- Ajout aux favoris-->
                            <div id="favorite_action" onmouseover="overFavorite()" onmouseout="outFavorite();" onclick="addToFavorite();">
                                <img id="button_favorite" src="Ressources/star.png"width="30px" height="30px" ></img>
                                <p class="p_favorite" id="add_favorite"></p>
                            </div>
                            <div id="favorite_action_locked" >
                                <p class="p_favorite" id="added_favorite" style="font-style:italic"></p>
                            </div>

                            <!-- Like / Dislike -->
                            <div id="like_action" >
                                <button class="like_button like" onclick="like('LIKE');"></button>
                                <p id="nlike"></p>
                                <div class="separator"></div>
                                <button class="like_button dislike" onclick="like('DISLIKE');"></button>
                                <p id="ndislike"></p>
                            </div>
                            <div id="like_action_locked" >
                                <button id="like_lock" class="like_button like_lock" ></button>
                                <p id="nlike1"></p>
                                <div class="separator"></div>
                                <button id="dislike_lock" class="like_button dislike_lock"></button>
                                <p id="ndislike1"></p>
                            </div>

                            <!-- Signalement mauvaise localisation -->
                            <div id="signalisation_action" >
                                <a id="signal" onclick="signal();"></a>
                                <p id="signal2"> </p>
                            </div>
                            <div id="signalisation_action_locked" >
                                <p id="signal_locked"> </p>
                            </div>
                        </div>
                    </div>
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
                    <!-- Zone pour les messages d'erreur -->
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
                        <!-- Bouton de soumission du formulaire de modification -->
                        <center>
                            <button id ="valid_modif" type="button" class="button small_button" onclick="modif();"></button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
