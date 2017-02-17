/**
 * ********************************************************************
 * Class LocationManagementImpl
 * Gestion des localisations
 * --------------------------------------------------------------------
 * Last update : 29/01/2017
 *********************************************************************
 */
package Managers;

import Objects.Location;
import Objects.Person;
import Objects.Source;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class LocationManagerImpl implements LocationManager {

    private EntityManagerFactory emf;
    private static LocationManagerImpl theLocationManager;

    private LocationManagerImpl() {
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory("Geofilm2PU");
        }
    }

    public static LocationManager getInstance() {
        if (theLocationManager == null) {
            theLocationManager = new LocationManagerImpl();
        }
        return theLocationManager;
    }

    /**
     * Récupérer toutes les positions de la base de données
     *
     * @return Liste de positions
     */
    public ArrayList<Location> getMarkers() {
        ArrayList<Location> l = new ArrayList<>();

        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Location.findAll", Location.class);
        Collection c = queryProductsByName.getResultList();

        for (Object loc : c) {
            l.add((Location) loc);
        }
        return l;
    }

    /**
     * Création d'une location à partir d'une géométrie entrée
     *
     * @param the_geom
     * @return
     */
    @Override
    public Location insertLocation(String the_geom) {
        Location l = new Location();
        l.setLocationThegeom(the_geom);
        return l;
    }

    /**
     * Trouver une localisation par son Id
     *
     * @param id Identifiant de la localisation
     * @return
     */
    @Override
    public Location findLocationById(Integer id) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT l.LocationId FROM Location l WHERE  l.locationId=:id");
        q.setParameter("id", id);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Location) l.get(0);
    }

    /**
     * Trouver une localisation par sa géométrie
     *
     * @param thegeom
     * @return
     */
    @Override
    public Location findLocation(String thegeom) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT l.LocationId FROM Location l WHERE  l.locationThegeom=:thegeom");
        q.setParameter("thegeom", thegeom);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Location) l.get(0);
    }

    /**
     * Pour une liste de sources donnée, renvoyer la liste des positions pour
     * lesquelles il y a des multimédias de cette source
     *
     * @param s Liste de sources
     * @return Liste de liste de position
     */
    @Override
    public ArrayList<ArrayList<Location>> getLocationForSources(ArrayList<Source> s) {
        EntityManager em = emf.createEntityManager();

        ArrayList<ArrayList<Location>> loc = new ArrayList<>();

        for (Source source : s) {
            ArrayList<Location> location = new ArrayList<>();

            Query q = em.createQuery("SELECT l FROM Location l INNER JOIN  Multimedia m ON (l.locationId = m.locationId.locationId) WHERE  m.sourceId=:s");
            q.setParameter("s", source);
            List l = q.getResultList();

            for (Object o : l) {
                location.add((Location) o);
            }

            loc.add(location);
        }

        return loc;
    }

    /**
     * Récupérer les positions des favoris de l'utilisateur
     *
     * @param p Personne
     * @return Liste de positions
     */
    @Override
    public ArrayList<Location> getFavorite(Person p) {
        EntityManager em = emf.createEntityManager();

        ArrayList<Location> loc = new ArrayList<>();

        Query q = em.createQuery("SELECT distinct l FROM Location l INNER JOIN  Favorite f ON (l.locationId = f.multimediaId.locationId.locationId) WHERE  f.personId=:p");
        q.setParameter("p", p);
        List l = q.getResultList();

        for (Object o : l) {
            loc.add((Location) o);
        }
        return loc;
    }
}
