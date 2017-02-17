/*
Controller FavoriteController
------------------------------------------------------------------------------
Controller pour l'affichage des favoris de l'utilisateur
 */
package Controllers;

import Managers.ConnectManager;
import Managers.ConnectManagerImpl;
import Managers.LocationManager;
import Managers.LocationManagerImpl;
import Managers.MultimediaManager;
import Managers.MultimediaManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Objects.Location;
import Objects.Person;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Laura
 */
@Controller
public class FavoriteController {

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView get(HttpServletRequest request, HttpServletResponse response, @RequestParam("idco") String idco) {
        //Résultat
        ModelAndView result = new ModelAndView("favorite");

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

        //Récupération des multimédias favoris
        LocationManager lm = LocationManagerImpl.getInstance();
        MultimediaManager mm = MultimediaManagerImpl.getInstance();
        ArrayList<Location> loc = lm.getFavorite(p);
        result.addObject("locations", loc);
        result.addObject("favorites", mm.getMultiByPos(loc));

        return result;
    }
}
