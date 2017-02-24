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
        Query q = em.createQuery("SELECT * FROM Source s WHERE  s.sourceTitle=:name");
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
     * TODO : récupérer l'id d'une source
     */
    /**
     * Créer une nouvelle source et renvoyer son id
     *
     * @param title
     * @param type
     * @param time_begin
     * @param time_end
     */
    @Override
    public Integer createSource(String title, String type, String time_begin, String time_end) {
        Source s = new Source();
        s.setSourceTitle(title);
        s.setSourceType(type);
        s.setSourceMultimediaEnd(time_end);
        s.setSourceMultimediaStart(time_begin);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(s);
        em.getTransaction().commit();

        return s.getSourceId();
    }

}
