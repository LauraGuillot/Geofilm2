/*
Controller RouteMapController
------------------------------------------------------------------------------
Controller pour l'affichage de la carte interactive 2 où les multimédias sont 
groupés par source.
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
import Managers.SourceManager;
import Managers.SourceManagerImpl;
import Objects.Location;
import Objects.Multimedia;
import Objects.Person;
import Objects.Source;
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
public class RouteMapController {

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView get(HttpServletRequest request, HttpServletResponse response, @RequestParam("idco") String idco) {

        //Récupération de l'utilisateur
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);

        if (p != null) {

            //Résultat
            ModelAndView result = new ModelAndView("routeMap");

            //Mise à jour des connexions dans la base de données
            ConnectManager cm = ConnectManagerImpl.getInstance();
            cm.checkConnection();
            cm.updateConnection(cm.getByConnectId(idco));

            //Infis personnelles
            result.addObject("email", p.getPersonEmail());
            result.addObject("nom", p.getPersonName());
            result.addObject("prenom", p.getPersonFirstname());
            result.addObject("id", p.getPersonId());

            //Connexion de l'utilisateur 
            result.addObject("idco", idco);

            //Récupération des multimédias
            MultimediaManager mm = MultimediaManagerImpl.getInstance();
            LocationManager lm = LocationManagerImpl.getInstance();
            SourceManager sm = SourceManagerImpl.getInstance();

            ArrayList<Source> sources = sm.getSources();
            result.addObject("src", sources);
            ArrayList<ArrayList< Location>> markers = lm.getLocationForSources(sources);
            result.addObject("pos", markers);
            ArrayList<ArrayList<ArrayList<Multimedia>>> multis = mm.getMultimediaForSource(markers);
            result.addObject("multis", multis);

            //Pour chaque multimédia : like, dislike et bad location
            result.addObject("likes", mm.getLikesSource(multis));
            result.addObject("dislikes", mm.getDislikesSource(multis));
            result.addObject("badloc", mm.getBadLocSource(multis));

            return result;
        } else {
            ModelAndView result = new ModelAndView("index");
            result.addObject("idco", 0);
            return result;
        }
    }
}
