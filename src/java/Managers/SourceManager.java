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
     * @return source trouvée à partir du nom
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
     * @return source insérée dans la base de données
     */
    public Source insertSource(String title, String type);
    
    /**
     * Récupérer l'ID d'une source à partir de son nom
     * @param name
     * @return ID de la source trouvée
     */
    public Integer findSourceId(String name);
}
