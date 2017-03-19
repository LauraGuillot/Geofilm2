/**
 * ********************************************************************
 * Class SourcesManagementImpl
 * Gestion des sources (film, série ou jeu)
 *********************************************************************
 */
package Managers;

import Objects.Source;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class SourceManagerImpl implements SourceManager {
    
    private EntityManagerFactory emf;
    private static SourceManagerImpl theSourceManager;
    
    private SourceManagerImpl() {
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory("Geofilm2PU");
        }
    }
    
    public static SourceManager getInstance() {
        if (theSourceManager == null) {
            theSourceManager = new SourceManagerImpl();
        }
        return theSourceManager;
    }

    /**
     * Trouver une Source à partir de son nom
     *
     * @param name Nom de la source
     * @return Source
     */
    @Override
    public Source findSource(String name) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT s FROM Source s WHERE  s.sourceTitle=:name");
        q.setParameter("name", name);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Source) l.get(0);
    }

    /**
     * Récupérer toutes les sources de la base
     *
     * @return Liste de sources
     */
    @Override
    public ArrayList<Source> getSources() {
        ArrayList<Source> s = new ArrayList<>();

        //Requête
        EntityManager em = emf.createEntityManager();
        Query q = em.createNamedQuery("Source.findAll", Source.class);
        List l = q.getResultList();

        //Transformation en arraylist
        for (Object o : l) {
            if (((Source) o).getSourceId() > 0) {
                s.add((Source) o);
            }
        }
        
        return s;
    }

    /**
     * Récupérer l'ID d'une source à partir de son nom
     *
     * @param name
     * @return
     */
    @Override
    public Integer findSourceId(String name) {
        Source s = findSource(name);
        return s.getSourceId();
    }

    /**
     * Créer une nouvelle source et renvoyer la source
     *
     * @param title
     * @param type
     * @return
     */
    @Override
    public Source insertSource(String title, String type) {
        Source s = new Source(getMaxId());
        s.setSourceTitle(title);
        s.setSourceType(type);

        //Insertion de la source dans la base de données
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(s);
        em.getTransaction().commit();
        
        return s;
    }

    /**
     * Récupérer l'id max des sources
     *
     * @return Id max
     */
    public int getMaxId() {
        int max = 0;
        EntityManager em = emf.createEntityManager();
        Query q = em.createNamedQuery("Source.findAll", Source.class);
        List l = q.getResultList();
        
        for (Object o : l) {
            if (((Source) o).getSourceId() > max) {
                max = ((Source) o).getSourceId();
            }
        }
        return max + 1;
    }
    
}
