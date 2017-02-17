<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Geofilm</title>
        <link rel="shortcut icon" href="Ressources/logo2.png" >

        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <!-- LEAFLET LIBRARY -->
        <script src="leaflet/leaflet-src.js"></script>
        <script src="leaflet/leaflet.js"></script>
        <link rel="stylesheet" type="text/css" media="screen" href="leaflet/leaflet.css">

        <!-- CHAINES DE CARACTERES -->
        <script src="Scripts/language.js"></script>
        <script src="Scripts/strings.js"></script>

        <!-- STYLES -->
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/navigation.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/home.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/button.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_error.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/modal_form.css">
        <link rel="stylesheet" type="text/css" media="screen" href="Stylesheets/font.css">

        <!-- MAP -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
        <script src="Scripts/position_tracker.js"></script>
        <script src="Scripts/load_map.js"></script>

        <!-- SCRIPTS -->
        <script src="Scripts/home.js"></script>
        <script src="Scripts/connect.js"></script>
        <script src="Scripts/inscription.js"></script>
        <script src="Scripts/password_forgotten.js"></script>
        

    </head>

    <body onload="load();">

        <!-- Chargement des markers en caché -->
        <input type="hidden" id="nbMarkers" value="<c:out value="${fn:length(markers)}"/>"/> 
        <c:forEach var="p" items="${markers}" varStatus="status">
            <input type="hidden" id="p<c:out value="${status.index}"/>" value="<c:out value="${p['locationThegeom']}"/>"/>
        </c:forEach>

        <!-- NAVIGATION -->
    <nav class="navbar-default navbar " role="navigation">
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="navbar-left" ><a href="#" id="logo"><img src="Ressources/logo1.png" width="100px" ></a></li> <!-- LOGO-->
                <li class="navbar-right"><a href="#"><img id="connection" src="Ressources/connection.png" onMouseOver="this.src = 'Ressources/connection_over.png'" onMouseOut="this.src = 'Ressources/connection.png'" width="25px" onclick="pop_connexion()"></a></li><!-- Connexion-->
            </ul>
        </div>
    </nav>

    <!-- CONTENU PRINCIPAL -->
    <div class="container">    
        <div  class="row content">          
            <!-- Volet de gauche -->
            <div id="left_div" class="col-md-4">
                <p id="welcome"> </p>
                <p id="title"> Geofilm </p>
                <br><br><br>
                <p class="description" id="description"> </p>
                <p class="description" id="description2"> </p>
                <br><br><br><br>
                <center> <button href="#" class="button large_button" id="connexion" onclick="pop_connexion()"></button></center>
                <br><br><br><br>
                <p id="info_gps" class="info"> </p>
            </div>
            <!-- Map -->
            <div id="mapid" class="col-md-8"> </div>
        </div>
    </div>

    <!--POPUP : boîte de connexion-->
    <div class="modal fade" id="connection_form" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal_form">

                <button class="close" data-dismiss="modal">&times;</button>
                
                <p id="connexion2" class= "title"  style="margin-top: 40px"</p> 
                <p id="error_connect" class="error_message"></p>

                <div class="modal-body">         
                    <p class="label_form" id="connection_id"></p>
                    <input type="text" name ="email" id="email">               
                    <p  class="label_form" id="connection_password"></p>
                    <input  type="password" name="password" id="password"  style="margin-bottom:7px">
                    <p class="label_form_small" id="mandatory"></p>

                    <center><div class="info_link" style="margin-bottom: 20px">
                        <div class="info_link" id="password_forgotten"></div>
                        <a id="click_here" class="click_here" href="#" onclick="pop_obtain_password()"></a>
                        <div class="info_link">.</div>
                        </div></center>

                    <center><button id ="valid_connexion" type="button" class="button small_button" onclick="connect()" style="margin-bottom: 40px"></button></center>

                    <center><div class="info_link">
                        <div class="info_link" id="membership"></div>
                        <a id="click_here2" class="click_here" href="#" onclick="pop_inscription();"></a>
                         <div class="info_link" id="membership2"></div>
                        </div><center>
                </div>
            </div>
        </div>
    </div>

    
    <!--POPUP : inscription-->
    <div class="modal fade" id="inscription_form" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal_form">

                <button class="close" data-dismiss="modal">&times;</button>
                
                <p id="inscription" class= "title"  style="margin-top: 40px"</p> 
                <p id="inscription_error" class="error_message"></p>

                <div class="modal-body">  
                     <p  class="label_form" id="inscription_name_label"></p>
                    <input  type="text" name="name" id="inscription_name">
                     <p  class="label_form" id="inscription_firstname_label"></p>
                    <input  type="text" name="firstname" id="inscription_firstname">
                    <p class="label_form" id="inscription_email_label"></p>
                    <input type="text" name ="email" id="inscription_email">               
                    <p  class="label_form" id="inscription_password_label"></p>
                    <input  type="password" name="password" id="inscription_password">
                    <p  class="label_form" id="inscription_password2_label"></p>
                    <input  type="password" name="password" id="inscription_password2" style="margin-bottom:7px">
                    <p class="label_form_small" id="mandatory2"></p>

                    <center><button id ="valid_inscription" type="button" class="button small_button" onclick="inscription()" style="margin-top: 20px"></button></center>

                </div>
            </div>
        </div>
    </div>
    
    
    <!--POPUP : password forgotten-->
    <div class="modal fade" id="password_forgotten_form" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal_form">

                <button class="close" data-dismiss="modal">&times;</button>
                
                <p id="password_title" class= "title"  style="margin-top: 40px"</p> 
                <p id="password_forgotten_error" class="error_message"></p>

                <div class="modal-body">  
                     <p  class="label_form" id="password_forgotten_email_label"></p>
                    <input  type="text" name="email" id="password_forgotten_email">
                    
                    <p class="label_form_small" id="mandatory3"></p>

                    <center><button id ="valid_password_forgotten" type="button" class="button small_button" onclick="obtain_password()" style="margin-top: 20px"></button></center>

                </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    <!-- POPUP : message d'erreur si pas de gps -->
    <div class="modal fade" id="gps_error_modal" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                    <p id="error_gps"></p>
                </div>
                <div class="modal-footer">
                    <center>  <button id ="close_error_gps" type="button" class="button small_button" data-dismiss="modal"></button></center>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
