/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
 * @author Paola
 */
@WebServlet(name = "ModifPasswordServlet", urlPatterns = {"/ModifPasswordServlet"})
public class ModifPasswordServlet extends HttpServlet {
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
        String mdp = request.getParameter("mdp");

        //Mise à jour des connexions
        ConnectManager cm = ConnectManagerImpl.getInstance();
        Connect c = cm.getByConnectId(idco);
        cm.updateConnection(c);
        cm.checkConnection();

        //On cherche l'existence de la personne associée au mail
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPersonByEmail(email);
        Boolean b = (p != null); // Booléen vrai si une personne correspond à l'email

        

        //Update : si oui, on met à jour les infos
        if (b) {
            pm.updateMdp(p, mdp);
        }

        //Envoi de la réponse : booléen vrai si l'email n'est pas celui d'un autre utilisateur
        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(b + "");
    }
}
