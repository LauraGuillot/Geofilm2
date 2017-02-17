/**
 * ********************************************************************
 * Interface SourceManager
 * --------------------------------------------------------------------
 * Last update : 29/01/2017
 *********************************************************************
 */
package Managers;

import Objects.Source;
import java.util.ArrayList;

public interface SourceManager {
    /**
     * Trouver une Source à partir de son nom
     * @param name
     * @return 
     */
    public Source findSource(String name);
    
     /**
     * Récupérer toutes les sources de la base
     *
     * @return Liste de sources
     */
    public ArrayList<Source> getSources();
}
