/*
 * Servlet appelée pour l'ouverture d'un multimédia (requetage des informations)
 */
package Servlets;

import Managers.ConnectManager;
import Managers.ConnectManagerImpl;
import Managers.MultimediaManager;
import Managers.MultimediaManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Objects.Multimedia;
import Objects.Person;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Laura
 */
@WebServlet(name = "OpenMultimediaServlet", urlPatterns = {"/OpenMultimediaServlet"})
public class OpenMultimediaServlet extends HttpServlet {

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

        //On récupère les paramètres
        String idco = request.getParameter("idco");
        String multiid = request.getParameter("id");
        
        //Mise à jour des connexions
        ConnectManager cm = ConnectManagerImpl.getInstance();
        cm.updateConnection(cm.getByConnectId(idco));
        cm.checkConnection();

        //On récupère les objets
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);
        MultimediaManager mm = MultimediaManagerImpl.getInstance();
        Multimedia m = mm.getMultById(Integer.parseInt(multiid));
        
        //On envoie la réponse : informations sur les actions faites par la personne sur le multimédia (likes, signalement, ajout aux favoris)
        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(mm.getInfosMuliPerson(m,p));
    }

}
