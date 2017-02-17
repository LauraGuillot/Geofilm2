/**
 * ********************************************************************
 * Interface LocationManager
 * --------------------------------------------------------------------
 * Last update : 29/01/2017
 *********************************************************************
 */
package Managers;

import Objects.Location;
import Objects.Person;
import Objects.Source;
import java.util.ArrayList;

public interface LocationManager {
     public ArrayList<Location> getMarkers();
     
     
     /**
     * Création d'une location à partir d'une géométrie entrée
     * @param the_geom
     * @return 
     */
    public Location insertLocation(String the_geom);
    
    /**
     * Trouver une Location à partir d'une géométrie entrée
     * @param the_geom
     * @return 
     */
    public Location findLocation(String the_geom);
    
    /**
     * Trouver une Lcoation à partir de son ID
     * @param id
     * @return 
     */
    public Location findLocationById(Integer id);
    
     /**
     * Pour une liste de sources donnée, renvoyer la liste des positions pour
     * lesquelles il y a des multimédias de cette source
     *
     * @param s Liste de sources
     * @return Liste de liste de position
     */
    public ArrayList<ArrayList<Location>> getLocationForSources(ArrayList<Source> s) ;
    
     /**
     * Récupérer les positions des favoris de l'utilisateur
     *
     * @param p Personne
     * @return Liste de positions
     */
    public ArrayList<Location> getFavorite(Person p);
}
