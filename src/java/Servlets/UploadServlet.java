/**
 * Servlet appelée lors de l'upload d'un multimédia
 */
package Servlets;

import Managers.MultimediaManager;
import Managers.MultimediaManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Managers.LocationManager;
import Managers.LocationManagerImpl;
import Managers.SourceManager;
import Managers.SourceManagerImpl;
import Objects.Person;
import Objects.Location;
import Objects.Source;
import Objects.Multimedia;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UploadServlet", urlPatterns = {"/UploadServlet"})
public class UploadServlet extends HttpServlet {

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String date = request.getParameter("date");
        String format = request.getParameter("format");
        String language = request.getParameter("language");
        String type_media = request.getParameter("type_media");
        String path = request.getParameter("path");//TODO variable path
        String source_name = request.getParameter("source");
        String idco = request.getParameter("idco");
        
        //Récupération de la personne qui a uploadé, de sa position, puis de la source
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);
        
        //TODO : Chercher comment récupérer une localisation (carte ou adresse, à convertir en géométrie)
        String thegeom = request.getParameter("theGeom"); //TODO variable theGeom)
        LocationManager lm = LocationManagerImpl.getInstance();
        Location l = lm.insertLocation(thegeom);

        SourceManager sm = SourceManagerImpl.getInstance();
        Source s = sm.findSource(source_name);

        //TODO? : vérifier qu'un multimédia n'est pas déjà entrée ? (Comment ? Par la source, le nom, la localisation, la durée... )
        MultimediaManager mm = MultimediaManagerImpl.getInstance();
        mm.insertMultimedia(title, description, path, date, format, language, type_media, l, p, s);

        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(true + "");
    }

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
        //TODO ?

    }

}
