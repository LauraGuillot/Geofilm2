/**
 * Servlet appelée lors de l'upload d'un multimédia
 */
package Servlets;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(name = "UploadFileServlet", urlPatterns = {"/UploadFileServlet"})
public class UploadFileServlet extends HttpServlet {

    public static final int TAILLE_TAMPON = 1073741824; // 1 Go
    public static final String VUE = "/WEB-INF/jsp/globalMap.jsp";
    public static final String CHAMP_FICHIER = "file_entered";

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
        //On récupère les paramètres en cookies
        Cookie[] cookies = request.getCookies();
        String path = "";
        String idco = "";
        for (int i = 0; i < cookies.length; i++) {
            String name = cookies[i].getName();
            if (name.equals("path")) {
                path = cookies[i].getValue();
            }
            if (name.equals("idco")) {
                idco = cookies[i].getValue();
            }
        }

        //Suivant le type du multimédia entré, on écrit le fichier dans les dossiers
        // Videos, Images, ou Sons
        String chemin = "/Users/Laura/Desktop/Geofilm2/web/Multimedias/" + path;
        // Les données reçues sont multipart, on doit donc utiliser la méthode
        Part part = request.getPart("file_entered");
        /* Écriture du fichier sur le disque */
        int up = ecrireFichier(part, chemin);

        //Rediriger vers la global Map
        response.sendRedirect("/Geofilm2/globalMap.htm?idco="+idco+"&up="+up);
    }

    /*
    * Méthode utilitaire qui a pour but d'écrire le fichier passé en paramètre
    * sur le disque, dans le répertoire donné et avec le nom donné.
     */
    private int ecrireFichier(Part part, String chemin) throws IOException {
        int up = 2;
        File f = new File(chemin);
        f.createNewFile();

        OutputStream out = null;
        InputStream filecontent = null;

        try {
            out = new FileOutputStream(f);
            filecontent = part.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }

        } catch (FileNotFoundException fne) {
            up = 1;
        } finally {
            if (out != null) {
                out.close();
            }
            if (filecontent != null) {
                filecontent.close();
            }

        }

        /* Prépare les flux. */
        // BufferedInputStream entree = null;
        // BufferedOutputStream sortie = null;
        // try {
        /* Ouvre les flux. */
        //   entree = new BufferedInputStream(part.getInputStream(), TAILLE_TAMPON);
        // sortie = new BufferedOutputStream(new FileOutputStream(f),
        //       TAILLE_TAMPON);

        /*
         * Lit le fichier reçu et écrit son contenu dans un fichier sur le
         * disque.
         */
 /*    byte[] tampon = new byte[TAILLE_TAMPON];
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
        }*/
        return up;
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
}
