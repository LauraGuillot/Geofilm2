package Controllers;

/**
 * ********************************************************************
 * Controller pour la connexion : accès à la carte interactive
 * -------------------------------------------------------------------- 
 * Last update : 01/02/2017
 * ********************************************************************
 */
import Managers.ConnectManager;
import Managers.ConnectManagerImpl;
import Managers.LocationManager;
import Managers.LocationManagerImpl;
import Managers.MultimediaManager;
import Managers.MultimediaManagerImpl;
import Managers.PersonManager;
import Managers.PersonManagerImpl;
import Objects.Location;
import Objects.Multimedia;
import Objects.Person;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ConnectController {

    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView post(@RequestParam("email") String email, @RequestParam("mdp") String mdp) {
        ModelAndView r = new ModelAndView("redirect:globalMap.htm");

        //Mise à jour des connexions dans la base de données
        ConnectManager cm = ConnectManagerImpl.getInstance();
        cm.checkConnection();

        //Récupération de l'utilisateur
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPersonByEmail(email);

        //Connexion de l'utilisateur 
        String idco = cm.connect(p);
        r.addObject("idco", idco);

        return r;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView get(HttpServletRequest request, HttpServletResponse response, @RequestParam("idco") String idco) {
        ModelAndView result = new ModelAndView("globalMap");

        //Récupération de l'utilisateur
        PersonManager pm = PersonManagerImpl.getInstance();
        Person p = pm.findPerson(idco);
        result.addObject("email", p.getPersonEmail());
        result.addObject("nom", p.getPersonName());
        result.addObject("prenom", p.getPersonFirstname());
         result.addObject("id", p.getPersonId());

        //Connexion de l'utilisateur 
        result.addObject("idco", idco);

        //Récupération des multimédias
        MultimediaManager mm = MultimediaManagerImpl.getInstance();
        LocationManager lm = LocationManagerImpl.getInstance();
        ArrayList<Location> markers = lm.getMarkers();
        result.addObject("markers", markers);
        ArrayList<ArrayList<Multimedia>> multis = mm.getMultiByPos(markers);
        result.addObject("multis", multis);

        //Pour chaque multimédia : like, dislike et bad location
        result.addObject("likes", mm.getLikes(multis));
        result.addObject("dislikes", mm.getDislikes(multis));
        result.addObject("badloc", mm.getBadLoc(multis));

        return result;
    }
}
