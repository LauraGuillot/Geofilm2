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
<<<<<<< HEAD
=======

import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
>>>>>>> origin/master
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
<<<<<<< HEAD

=======
>>>>>>> origin/master

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

<<<<<<< HEAD

=======
    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        String type_media = request.getParameter("type_media");

        String path = request.getParameter("path");

        String chemin = "";
        //Suivant le type du multimédia entré, on écrit le fichier dans les dossiers
        // Videos, Images, ou Sons
        if (type_media == "VIDEO") {
            chemin = this.getServletConfig().getInitParameter("C:\\Users\\Paola\\Documents\\NetBeansProjects\\Geofilm2\\web\\Multimedias\\Videos");
        } else if (type_media == "IMAGE") {
            chemin = this.getServletConfig().getInitParameter("C:\\Users\\Paola\\Documents\\NetBeansProjects\\Geofilm2\\web\\Multimedias\\Images");
        } else {
            chemin = this.getServletConfig().getInitParameter("C:\\Users\\Paola\\Documents\\NetBeansProjects\\Geofilm2\\web\\Multimedias\\Sons");
        }
        /*
     * Les données reçues sont multipart, on doit donc utiliser la méthode
     * getPart() pour traiter le champ d'envoi de fichiers.
         */

        Collection<Part> Cpart = request.getParts();//RENVOIE NULL POINTER EXCEPTION
        for (Part part : request.getParts()) {
            String fileName = getNomFichier(part);
            // part.write( chemin + File.separator + path );
            if (fileName != null) {
                ecrireFichier(part, path, chemin);
                response.setContentType("text/html; charset=UTF-8");
                response.getWriter().write(true + "");
            } else {
                response.setContentType("text/html; charset=UTF-8");
                response.getWriter().write(false + "");
            }

        }
//        Part part = (Part) request.getAttribute("file_input");

//        String nomChamp = part.getName();
//String nomChamp = getNomFichier(part);
//        /* Écriture du fichier sur le disque */
//        ecrireFichier(part, path, chemin);
//
//        request.setAttribute(nomChamp, path);
//        this.getServletContext().getRequestDispatcher(VUE).forward(request, response);
        
    }

    /*
 * Méthode utilitaire qui a pour but d'écrire le fichier passé en paramètre
 * sur le disque, dans le répertoire donné et avec le nom donné.
     */
    private void ecrireFichier(Part part, String nomFichier, String chemin) throws IOException {
        /* Prépare les flux. */
        BufferedInputStream entree = null;
        BufferedOutputStream sortie = null;
        try {
            /* Ouvre les flux. */
            entree = new BufferedInputStream(part.getInputStream(), TAILLE_TAMPON);
            sortie = new BufferedOutputStream(new FileOutputStream(new File(chemin + nomFichier)),
                    TAILLE_TAMPON);

            /*
         * Lit le fichier reçu et écrit son contenu dans un fichier sur le
         * disque.
             */
            byte[] tampon = new byte[TAILLE_TAMPON];
            int longueur;
            while ((longueur = entree.read(tampon)) > 0) {
                sortie.write(tampon, 0, longueur);
            }
        } finally {
            try {
                sortie.close();
            } catch (IOException ignore) {
            }
            try {
                entree.close();
            } catch (IOException ignore) {
            }
        }
    }

    /*

 * Méthode utilitaire qui a pour unique but d'analyser l'en-tête

 * "content-disposition", et de vérifier si le paramètre "filename" y est

 * présent. Si oui, alors le champ traité est de type File et la méthode

 * retourne son nom, sinon il s'agit d'un champ de formulaire classique et

 * la méthode retourne null.

     */
    private static String getNomFichier(Part part) {

        /* Boucle sur chacun des paramètres de l'en-tête "content-disposition". */
        for (String contentDisposition : part.getHeader("content-disposition").split(";")) {

            /* Recherche de l'éventuelle présence du paramètre "filename". */
            if (contentDisposition.trim().startsWith("filename")) {

                /*
             * Si "filename" est présent, alors renvoi de sa valeur,
             * c'est-à-dire du nom de fichier sans guillemets.
                 */
                return contentDisposition.substring(contentDisposition.indexOf('=') + 1).trim().replace("\"", "");

            }

        }

        /* Et pour terminer, si rien n'a été trouvé... */
        return null;

    }
>>>>>>> origin/master
}
