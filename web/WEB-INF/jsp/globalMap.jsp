<!-- CARTE INTERACTIVE 1 -->

<!-- Tags -->
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
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/global_map.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/button.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_error.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_form.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/font.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/pop_up_marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/marker.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_multimedia.css">

        <!-- MAP -->
        <script src="Scripts/mapbox_tracker.js"></script>
        <script src="Scripts/load_global_map.js"></script>

        <!-- SCRIPTS -->
        <script src="Scripts/navigation.js"></script>
        <script src="Scripts/global_map.js"></script>
        <script src="Scripts/deconnect.js"></script>
        <script src="Scripts/modif_infos_perso.js"></script>
        <script src="Scripts/sort_globalMap.js"></script>
        <script src="Scripts/play_multimedia_globalMap.js"></script>
        <script src="Scripts/upload.js"></script>
        <script src="Scripts/add_favorite.js"></script>
        <script src="Scripts/signal_bad_loc.js"></script>
        <script src="Scripts/like.js"></script>
        <script src="Scripts/delete_like.js"></script>

    </head>
    <body onload="load();">

        <!-- CHARGEMENT DES DONNEES -->
        <div style="display:none;">
            <!-- Données personnelles-->
            <input type="hidden" id="person_id" value="<c:out value="${id}"/>"/>
            <input type="hidden" id="name" value="<c:out value="${nom}"/>"/> 
            <input type="hidden" id="firstname" value="<c:out value="${prenom}"/>"/> 
            <input type="hidden" id="email" value="<c:out value="${email}"/>"/> 
            <input type="hidden" id="idco" value="<c:out value="${idco}"/>"/> 

            <!-- Markers (positions) -->
            <input type="hidden" id="nbMarkers" value="<c:out value="${fn:length(markers)}"/>"/> 
            <c:forEach var="p" items="${markers}" varStatus="status">
                <input type="hidden" id="p<c:out value="${status.index}"/>" value="<c:out value="${p['locationThegeom']}"/>"/>
            </c:forEach>

            <!--Multimedias-->
            <c:forEach var="mu" items="${multis}" varStatus="status">
                <input type="hidden" id="nbMulti<c:out value="${status.index}"/>" value="<c:out value="${fn:length(mu)}"/>"/> 
                <c:forEach var="m" items="${mu}" varStatus="status1">
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_id"/>" value="<c:out value="${m['multimediaId']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_title"/>" value="<c:out value="${m['multimediaTitle']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_publisher"/>" value="<c:out value="${m['publisher']['personFirstname']}"/> <c:out value="${m['publisher']['personName']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_publisherID"/>" value="<c:out value="${m['publisher']['personId']}"/>"/> 
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_descr"/>" value="<c:out value="${m['multimediaDescription']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_path"/>" value="<c:out value="${m['multimediaPath']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_uploaddate"/>" value="<c:out value="${m['multimediaUploadDate']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_format"/>" value="<c:out value="${m['multimediaFormat']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_type"/>" value="<c:out value="${m['multimediaType']}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_like"/>" value="<c:out value="${likes[status.index][status1.index]}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_dislike"/>" value="<c:out value="${dislikes[status.index][status1.index]}"/>"/>
                    <input type="hidden" id="pos<c:out value="${status.index}"/>_multi<c:out value="${status1.index}_badloc"/>" value="<c:out value="${badloc[status.index][status1.index]}"/>"/>
                </c:forEach>
            </c:forEach>

            <input type="hidden" id="up" value="<c:out value="${up}"/>"/>
        </div>

        <!-- NAVIGATION GRANDS ECRANS-->
        <nav id="navbar_large_screen" class="navbar-default navbar " role="navigation">
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="navbar-left" ><a href="#" id="logo"><img src="Ressources/logo1.png" width="100px" ></a></li> <!-- LOGO-->
                    <li class="navbar-left onglet" ><a href="#" class=" onglet onglet_actif" id="global_map"></a></li> <!-- ONGLET GLOBAL MAP -->
                    <li class="navbar-left onglet" ><a onclick="getRouteMap();" class="onglet" id="route_map"></a></li> <!-- ONGLET ROUTE MAP -->
                    <li class="navbar-right"><a href="#"><img id="connection" src="Ressources/connection.png" onMouseOver="this.src = 'Ressources/connection_over.png'" onMouseOut="this.src = 'Ressources/connection.png'" width="25px" onclick="deconnect();"></a></li><!-- Connexion-->
                    <!-- INFORMATION PERSONNELLES-->
                    <li class="navbar-right" style="margin-right:20px; border-left: solid white 1px; padding-left:6px;">
                        <!-- nom prénom-->
                        <p class="info_perso" id="info_name" style="margin-top:10px;font-weight:bold;"><c:out value="${prenom}"/> <c:out value="${nom}"/></p>
                        <!-- email-->
                        <p class="info_perso"id="info_email" ><c:out value="${email}"/></p>
                        <!-- lien de modification -->
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
        <!-- NAVIGATION PETITS ECRANS-->
        <nav id="navbar_small_screen" class="navbar-default navbar " role="navigation">
            <div>
                <ul class="nav navbar-nav">
                    <!-- LOGO-->
                    <li class="navbar-left" style="padding-left:15px;"><a href="#" id="logo1" style="padding-top:0px!important;"><img src="Ressources/logo2.png" width="35px" ></a></li> 
                    <!-- ICONE MENU-->
                    <li class="navbar-right">
                        <a href="javascript:void(0);" style="font-size:25px;" onclick="displayVerticalMenu();">☰</a>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- MENU VERTICAL POUR LES PETITS ECRANS-->
        <div class="vertical-menu" id='vmenu' style="padding-top:12px;padding-bottom:12px;">
            <!-- INFORMATIONS PERSONNELLES-->	
            <div style="padding:12px;">
                <!-- nom prénom-->
                <p class="info_perso1" id="info_name1" style="margin-top:10px;font-weight:bold;"><c:out value="${prenom}"/> <c:out value="${nom}"/></p>
                <!-- email-->
                <p class="info_perso1"id="info_email1" ><c:out value="${email}"/></p>
                <!-- lien de modification -->
                <a id="modification_link1" href="#" onclick="pop_info();"></a>
            </div>
            <center><div class="onglet_separator"></div></center>
            <!-- GLOBAL MAP-->	
            <li class="v_onglet"><a href="#" class=" v_onglet v_onglet_actif" id="global_map1" style="padding:10px!important;"></a></li>
            <!-- ROUTE MAP-->
            <li class="v_onglet"><a href="#" onclick="getRouteMap();" class=" v_onglet " id="route_map1" style="padding:10px!important;"></a></li>
            <!-- FAVORIS-->	
            <li class="v_onglet">
                <a class="v_onglet" href="#" style="padding:10px!important;" onclick="getFavorite();">
                    <img style="display:inline-block;" src="Ressources/star.png" width="12px" >
                    <p style="display:inline-block;margin:0;" id="favorite_link1"></p>
                </a>
            </li>
            <!-- DECONNEXION-->		
            <li class="v_onglet">
                <a class="v_onglet" href="#" style="padding:10px!important;" onclick="deconnect();">
                    <img style="display:inline-block;" src="Ressources/connection.png" width="9px" >
                    <p style="display:inline-block;margin:0;" id="deconnect"></p>
                </a>
            </li>
        </div>

        <!-- CONTENU PRINCIPAL -->
        <div class="container">   
            <!-- Map -->
            <div id="mapid" class="col-md-8"> </div>
            <!-- Bouton upload -->
            <button id="upload" onmouseover="overUpload();" onmouseout="outUpload();" onclick="getUpload()">
                <p id="upload_text" style="display:none"></p>
                <img id="upload_img" src="Ressources/upload.png" width="30px" height="30px"/>
            </button>
        </div>

        <!--POPUP : visualisation d'un multimédia-->
        <div class="modal fade" id="multimedia_pop" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content modal_form">
                    <!-- Croix de fermeture -->
                    <button class="close" data-dismiss="modal">&times;</button>
                    <input type="hidden" id="multi_open" value=""/>
                    <div class="modal-body">     
                        <!-- Multimédia -->
                        <div id="multimedia_div"></div>
                        <!-- Information-->
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
                                <button id="like_lock" class="like_button like_lock" onclick="deleteLike('LIKE')"></button>
                                <p id="nlike1"></p>
                                <div class="separator"></div>
                                <button id="dislike_lock" class="like_button dislike_lock" onclick="deleteLike('DISLIKE')"></button>
                                <p id="ndislike1"></p>
                            </div>
                            <!-- Signalement d'un mauvaise localisation -->
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
            <center>
                <div id ="small_modal" class="modal-dialog modal-sm">
                    <div class="modal-content modal_form">
                        <!-- Croix de fermeture -->
                        <button class="close" data-dismiss="modal">&times;</button>
                        <!-- Titre -->
                        <center><p id="modification_title" class= "title"  style="margin-top: 40px"</p> </center>
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
            </center>
        </div>



        <!--POPUP : indication que l'upload a réussi-->
        <div class="modal fade" id="upload_confirmed_form" role="dialog">
            <center>
                <div id ="small_modal" class="modal-dialog modal-sm">
                    <div class="modal-content modal_form">
                        <!-- Zone pour les messages d'erreurs -->
                        <p id="upload_confirmed_error" class="error_message" style="display:none"></p>
                        <!--Confirmation de l'upload-->
                       <p id ="upload_confirmed_done" class="label_form" style="text-align:center;" style="display:none"></p>
                       <br><br>

                        <!-- Bouton pour fermer la pop-up et revenir à la globalMap -->
                        <center>
                            <button id ="valid_upload" type="button" class="button small_button" data-dismiss="modal"></button>
                        </center>
                    </div>
                </div>
            </center>
        </div>
    </body>
</html>
