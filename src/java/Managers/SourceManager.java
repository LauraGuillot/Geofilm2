/**
 * ********************************************************************
 * Interface SourceManager
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
    
    /**
     * Création d'une nouvelle source et renvoi de son ID
     * @param title
     * @param type
     * @param time_begin
     * @param time_end
     * @return 
     */
    public Integer createSource(String title, String type, String time_begin, String time_end);
    
    /**
     * Récupérer l'ID d'une source à partir de son nom
     * @param name
     * @return 
     */
    public Integer findSourceId(String name);
}
