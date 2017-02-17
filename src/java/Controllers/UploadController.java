/**
 * ********************************************************************
 * Controller Uploading page pour uploader un multimédia
 * --------------------------------------------------------------------
 * Last update : 09/02/2017
 *********************************************************************
 */
package Controllers;

import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Managers.ConnectManager;
import Managers.ConnectManagerImpl;
import Managers.LocationManager;
import Managers.LocationManagerImpl;
import Objects.Person;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UploadController {

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView get(HttpServletRequest request, HttpServletResponse response, @RequestParam("idco") String idco) {
        ModelAndView result = new ModelAndView("uploading");

        //Mise à jour des connexions dans la base de données
        ConnectManager cm = ConnectManagerImpl.getInstance();
        cm.checkConnection();
        cm.updateConnection(cm.getByConnectId(idco));

        //Récupération de l'utilisateur
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);
        result.addObject("email", p.getPersonEmail());
        result.addObject("nom", p.getPersonName());
        result.addObject("prenom", p.getPersonFirstname());
        result.addObject("id", p.getPersonId());

        //Connexion de l'utilisateur 
        result.addObject("idco", idco);

        return result;
    }
}
