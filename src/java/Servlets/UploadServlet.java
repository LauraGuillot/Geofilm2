/**
 * Servlet appelée lors de l'upload d'un multimédia
 */
package Servlets;

import Managers.LocationManager;
import Managers.LocationManagerImpl;
import Managers.MultimediaManager;
import Managers.MultimediaManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Managers.SourceManager;
import Managers.SourceManagerImpl;
import Objects.Location;
import Objects.Person;
import Objects.Source;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UploadServlet", urlPatterns = {"/UploadServlet"})
public class UploadServlet extends HttpServlet {

    public static final int TAILLE_TAMPON = 1073741824; // 1 Go
    public static final String VUE = "/WEB-INF/jsp/globalMap.jsp";
    public static final String CHAMP_FICHIER = "file_entered";


    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

//Récupération des informations
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String date = request.getParameter("date");
        String time_begin = request.getParameter("time_begin");
        String time_end = request.getParameter("time_end");
        String format = request.getParameter("format");
        String language = request.getParameter("language");
        String type_media = request.getParameter("type_media");
        String path = request.getParameter("path");
        String source_name = request.getParameter("source_name");
        String idco = request.getParameter("idco");
        String thegeom = request.getParameter("the_geom");
        String choice_source = request.getParameter("choice_source");

        //Récupération de la personne qui a uploadé, de la position, puis de la source
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);

        //Ajout de la localisation du multimédia à la base de données, si elle n'est pas déjà entrée
        LocationManager lm = LocationManagerImpl.getInstance();
        Location l = lm.findLocation(thegeom);
        Boolean b = (l == null); //Booléen qui vaut vrai si aucune location à la position the_geom
        //S'il la location n'existe pas, on l'ajoute à la base de données et l'on conserve la location dans la variable l
        if (b) {
            l = lm.insertLocation(thegeom);
        }

        //Ajout de la source du multimédia dans la base de données, si elle n'est pas déjà entrée
        SourceManager sm = SourceManagerImpl.getInstance();
        Source s = sm.findSource(source_name);
        Boolean b2 = (s == null);
        //Si b2 vaut vrai, la source entrée n'existe pas encore, elle est donc ajoutée à la base de données
        if (b2) {
            s = sm.insertSource(source_name, choice_source);
        }

        //Ajout du multimédia dans la base de données
        MultimediaManager mm = MultimediaManagerImpl.getInstance();
        mm.insertMultimedia(title, description, path, date, format, language, type_media, l, p, s, time_begin, time_end);

        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(true + "");
    }


}
