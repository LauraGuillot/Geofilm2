/*
 * Servlet pour mettre à jour les informations d'un utilisateur 
 */
package Servlets;

import Managers.ConnectManager;
import Managers.ConnectManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Objects.Connect;
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
@WebServlet(name = "ModifInfoServlet", urlPatterns = {"/ModifInfoServlet"})
public class ModifInfoServlet extends HttpServlet {

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
        String email = request.getParameter("email");
        String idco = request.getParameter("idco");
        String name = request.getParameter("name");
        String firstname = request.getParameter("firstname");

        //Mise à jour des connexions
        ConnectManager cm = ConnectManagerImpl.getInstance();
        Connect c = cm.getByConnectId(idco);
        cm.updateConnection(c);
        cm.checkConnection();

        PersonManager pm = PersonManagerImpl.getInstance();
        //On récupère la personne qiu correspond à l'email
        Person p = pm.findPersonByEmail(email);
        //On récupère la personne qui correspond à l'identifiant de connexion
        Person p1 = pm.findPerson(idco);

        //On teste si le nouveau email est déjà utilisé par un autre utilisateur ou non 
        Boolean b = (p == null) || (p.equals(p1));

        //Update
        if (b) {
            pm.updateInfos(p1, name,firstname,email);
        }

        //Envoi de la réponse : booléen vrai si l'email n'est pas celui d'un autre utilisateur
        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(b + "");
    }
}
