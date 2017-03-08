/**
 * ********************************************************************
 * Class MultimediaManagementImpl
 * Gestion des multimédias
 *********************************************************************
 */
package Managers;

import Objects.Badlocation;
import Objects.Favorite;
import Objects.Liked;
import Objects.LikedPK;
import Objects.Location;
import Objects.Multimedia;
import Objects.Person;
import Objects.Source;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class MultimediaManagerImpl implements MultimediaManager {

    private EntityManagerFactory emf;
    private static MultimediaManagerImpl theMultimediaManager;

    private MultimediaManagerImpl() {
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory("Geofilm2PU");
        }
    }

    public static MultimediaManager getInstance() {
        if (theMultimediaManager == null) {
            theMultimediaManager = new MultimediaManagerImpl();
        }
        return theMultimediaManager;
    }

    /**
     * Obtention d'une liste de listes de multimédias où chaque liste de
     * multimédia correspond à une position donnée
     *
     * @param pos Liste de positions
     * @return Liste de listes de multimédias
     */
    @Override
    public ArrayList<ArrayList<Multimedia>> getMultiByPos(ArrayList<Location> pos) {
        ArrayList<ArrayList<Multimedia>> mult = new ArrayList<>();

        //Pour chaque position de la liste, on récupère les multimédias associés
        for (Location loc : pos) {
            ArrayList<Multimedia> m = new ArrayList<>();
            //Requête
            EntityManager em = emf.createEntityManager();
            Query q = em.createQuery("SELECT m FROM Multimedia m WHERE  m.locationId=:loc");
            q.setParameter("loc", loc);
            List l = q.getResultList();
            //Tranformation en arraylist
            for (Object o : l) {
                m.add((Multimedia) o);
            }
            mult.add(m);
        }
        return mult;
    }

    /**
     * Récupérer le nombre de likes d'un multimédia
     *
     * @param m Multimédia
     * @return Nombre de likes
     */
    @Override
    public Integer getLike(Multimedia m) {
        //On récupère tous les liked du multimedia
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT l FROM Liked l WHERE  l.multimedia=:m");
        q.setParameter("m", m);
        List l = q.getResultList();

        //On compte le nombre de liked de type 'LIKE'
        int cpt = 0;
        for (Object o : l) {
            Liked li = (Liked) o;
            if (li.getLikedType().equals("LIKE")) {
                cpt++;
            }
        }
        return cpt;
    }

    /**
     * Récupérer le nombre de dislikes d'un multimédia
     *
     * @param m Multimédia
     * @return Nombre de dislikes
     */
    @Override
    public Integer getDislike(Multimedia m) {
        //On récupère tous les liked du multimedia
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT l FROM Liked l WHERE  l.multimedia=:m");
        q.setParameter("m", m);
        List l = q.getResultList();

        //On compte le nombre de liked de type 'DISLIKE'
        int cpt = 0;
        for (Object o : l) {
            Liked li = (Liked) o;
            if (!li.getLikedType().equals("LIKE")) {
                cpt++;
            }
        }
        return cpt;
    }

    /**
     * Récupérer les likes de chaque multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de likes
     */
    @Override
    public ArrayList<ArrayList<Integer>> getLikes(ArrayList<ArrayList<Multimedia>> multis) {
        ArrayList<ArrayList<Integer>> li = new ArrayList<>();
        //Pour chaque tableau de multimédia
        for (ArrayList<Multimedia> mu : multis) {
            ArrayList<Integer> l = new ArrayList<>();
            //Pour chaque multimédia
            for (Multimedia m : mu) {
                //On récupère le nombre de likes
                l.add(this.getLike(m));
            }
            li.add(l);
        }
        return li;
    }

    /**
     * Récupérer les dislikes de chaque multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dislikes
     */
    @Override
    public ArrayList<ArrayList<Integer>> getDislikes(ArrayList<ArrayList<Multimedia>> multis) {
        ArrayList<ArrayList<Integer>> li = new ArrayList<>();
        //Pour chaque tableau de multimédias
        for (ArrayList<Multimedia> mu : multis) {
            ArrayList<Integer> l = new ArrayList<>();
            //Pour chaque multimédia
            for (Multimedia m : mu) {
                //On récupère le nombre de dislikes
                l.add(this.getDislike(m));
            }
            li.add(l);
        }
        return li;
    }

    /**
     * Récupérer le nombre de signalements de mauvaise géolocalisation pour un
     * multimedia
     *
     * @param m Multimedia
     * @return Nombre de signalements
     */
    @Override
    public int getBadLocMult(Multimedia m) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT b FROM Badlocation b WHERE  b.multimediaId=:m");
        q.setParameter("m", m);
        List l = q.getResultList();
        return l.size();
    }

    /**
     * Récupérer les signalements de mauvais géolocalisation pour tous les
     * multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de mauvaise géolocalisation
     */
    @Override
    public ArrayList<ArrayList<Integer>> getBadLoc(ArrayList<ArrayList<Multimedia>> multis) {
        ArrayList<ArrayList<Integer>> li = new ArrayList<>();
        //Pour chaque tableau de multimédia
        for (ArrayList<Multimedia> mu : multis) {
            ArrayList<Integer> l = new ArrayList<>();
            //Pour chaque multimédia
            for (Multimedia m : mu) {
                //On récupère le nombre de signalements
                l.add(this.getBadLocMult(m));
            }
            li.add(l);
        }
        return li;
    }

    /**
     * Récupérer un multimédia par son id
     *
     * @param id Identifiant
     * @return Multimédia
     */
    @Override
    public Multimedia getMultById(int id) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createNamedQuery("Multimedia.findByMultimediaId", Multimedia.class);
        q.setParameter("multimediaId", id);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Multimedia) l.get(0);
    }

    /**
     * Récupérer les actions d'une personne sur un multimédia sous la forme
     * d'une chaîne de caractère de la forme : badloc:[est ce que la personne a
     * signalé le multimédia ]*favoris:[est ce que la personne a ajouté ce
     * multimédia à ses favoris]*like:[est ce que la personne a liké le
     * multimédia]
     *
     * @param m Multimedia
     * @param p Personne
     * @return Chaîne d'informations
     */
    @Override
    public String getInfosMuliPerson(Multimedia m, Person p) {
        EntityManager em = emf.createEntityManager();

        //Est ce que la personne a mal géolocalisé le multimédia?
        String result = "badloc:";
        Query q = em.createQuery("SELECT b FROM Badlocation b WHERE  b.multimediaId=:m AND b.personId=:p");
        q.setParameter("m", m);
        q.setParameter("p", p);
        List l = q.getResultList();
        result += (!l.isEmpty());

        //Est ce que la personne a ajouté ce multimédia dans ses favoris?
        result += "*favoris:";
        Query q1 = em.createQuery("SELECT f FROM Favorite f WHERE  f.multimediaId=:m AND f.personId=:p");
        q1.setParameter("m", m);
        q1.setParameter("p", p);
        List l1 = q1.getResultList();
        result += (!l1.isEmpty());

        //Est ce que la perosnne a liké/disliké ce multimédia?
        result += "*like:";
        Query q2 = em.createQuery("SELECT l FROM Liked l WHERE  l.multimedia=:m AND l.person=:p");
        q2.setParameter("m", m);
        q2.setParameter("p", p);
        List l2 = q2.getResultList();

        //Si pas de like : on écrit 'no'
        if (l2.isEmpty()) {
            result += "no";
            //Si like : on écrit le type : 'like' ou 'dislike'
        } else {
            result += ((Liked) l2.get(0)).getLikedType();
        }
        return result;
    }

    /**
     * Ajout d'un multimédia dans les favoris d'une personne
     *
     * @param m Multimédia
     * @param p Personne
     */
    @Override
    public void addToFavorite(Multimedia m, Person p) {
        EntityManager em = emf.createEntityManager();

        //Récupération id max des favoris
        Query q = em.createNamedQuery("Favorite.findAll", Favorite.class);
        List l = q.getResultList();

        //Création du favoris
        Favorite f = new Favorite(l.size() + 1);
        f.setMultimediaId(m);
        f.setPersonId(p);
        System.out.println(f.getFavoriteId());

        //Insertion
        em.getTransaction().begin();
        em.persist(f);
        em.getTransaction().commit();
    }

    /**
     * Signalement d'un multimédia comme mal géolocalisé
     *
     * @param m Multimédia
     * @param p Personne
     */
    @Override
    public void signal(Multimedia m, Person p) {
        EntityManager em = emf.createEntityManager();

        //Récupération id max des favoris
        Query q = em.createNamedQuery("Badlocation.findAll", Badlocation.class);
        List l = q.getResultList();

        //Création du favoris
        System.out.println(l.size() + 1);
        Badlocation b = new Badlocation(l.size() + 1);
        b.setMultimediaId(m);
        b.setPersonId(p);

        //Insertion
        em.getTransaction().begin();
        em.persist(b);
        em.getTransaction().commit();
    }

    /**
     * Enregistrement d'un like/dislike d'une personne
     *
     * @param m Multimedia
     * @param p Personne
     * @param type Type : like ou dislike
     */
    @Override
    public void like(Multimedia m, Person p, String type) {
        EntityManager em = emf.createEntityManager();

        //Primary key
        LikedPK pk = new LikedPK();
        pk.setMultimediaId(m.getMultimediaId());
        pk.setPersonId(p.getPersonId());

        //Like
        Liked like = new Liked();
        like.setLikedPK(pk);
        like.setLikedType(type);
        like.setMultimedia(m);
        like.setPerson(p);

        //Insertion
        em.getTransaction().begin();
        em.persist(like);
        em.getTransaction().commit();
    }

    /**
     * Suppression d'un like
     *
     * @param m Multimédia liké
     * @param p Utilisateur
     */
    @Override
    public void deleteLike(Multimedia m, Person p) {
        EntityManager em = emf.createEntityManager();

        //Primary key
        LikedPK pk = new LikedPK();
        pk.setMultimediaId(m.getMultimediaId());
        pk.setPersonId(p.getPersonId());

        //Like
        Liked l = em.find(Liked.class, pk);

        //Suppression
        em.getTransaction().begin();
        em.remove(l);
        em.getTransaction().commit();
    }

    /**
     * Insertion d'un multimédia dans la base de données et création de la
     * localisation associée (à partir d'une géométrie reçue en paramètre)
     *
     * @param title Titre
     * @param description Description
     * @param path Chemin d'accès au fichier
     * @param date Date d'upload
     * @param format Format (extension)
     * @param language Langage
     * @param type Type du fichier : video, image ou son
     * @param l ID de la localisation du multimédia
     * @param p Person p qui upload le multimédia
     * @param sourceId ID de la source du multimédia
     * @param time_end
     * @param time_begin
     */
    @Override
    public void insertMultimedia(String title, String description, String path, String date, String format, String language, String type, Location l, Person p, Source sourceId, String time_end, String time_begin) {
        Multimedia m = new Multimedia();
        m.setMultimediaTitle(title);
        m.setMultimediaDescription(description);
        m.setMultimediaPath(path);
        m.setMultimediaUploadDate(date);
        m.setMultimediaFormat(format);
        m.setMultimediaLanguage(language);
        m.setMultimediaType(type);
        m.setLocationId(l);
        m.setPublisher(p);
        m.setSourceId(sourceId);
        m.setMultimediaEnd(time_end);
        m.setMultimediaStart(time_begin);

        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(m);
        em.getTransaction().commit();
    }

    /**
     * Etant donnée un matrice 2D de positions (positions classées par source),
     * on récupère une matrice 3D de multimédias (multimédias classés par
     * sources et par position)
     *
     * @param loc Matrice de positions
     * @return Matrice de multimédias
     */
    @Override
    public ArrayList<ArrayList<ArrayList<Multimedia>>> getMultimediaForSource(ArrayList<ArrayList<Location>> loc) {
        ArrayList<ArrayList<ArrayList<Multimedia>>> multi = new ArrayList<>();
        //Pour chaque liste de positions
        for (ArrayList<Location> pos : loc) {
            //On récupère les multimédias correspondants
            multi.add(getMultiByPos(pos));
        }
        return multi;
    }

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de likes
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de likes
     */
    @Override
    public ArrayList<ArrayList<ArrayList<Integer>>> getLikesSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis) {
        ArrayList<ArrayList< ArrayList< Integer>>> li = new ArrayList<>();
        for (ArrayList<ArrayList<Multimedia>> m : multis) {
            li.add(this.getLikes(m));
        }
        return li;
    }

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de dislikes
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dislikes
     */
    @Override
    public ArrayList<ArrayList<ArrayList<Integer>>> getDislikesSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis) {
        ArrayList<ArrayList< ArrayList< Integer>>> li = new ArrayList<>();
        for (ArrayList<ArrayList<Multimedia>> m : multis) {
            li.add(this.getDislikes(m));
        }
        return li;
    }

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de signalements
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dsignalements
     */
    @Override
    public ArrayList<ArrayList<ArrayList<Integer>>> getBadLocSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis) {
        ArrayList<ArrayList< ArrayList< Integer>>> li = new ArrayList<>();
        for (ArrayList<ArrayList<Multimedia>> m : multis) {
            li.add(this.getBadLoc(m));
        }
        return li;
    }

    /**
     * Obtention des favoris correspondant à une liste de positions
     *
     * @param pos Liste de positions
     * @param p Utilisateur
     * @return Matrice de multimedias
     */
    @Override
    public ArrayList<ArrayList<Multimedia>> getFavoritesByPos(ArrayList<Location> pos, Person p) {
        ArrayList<ArrayList<Multimedia>> mult = new ArrayList<>();

        //Pour chaque position de la liste, on récupère les multimédias associés
        for (Location loc : pos) {
            ArrayList<Multimedia> m = new ArrayList<>();
            //Requête
            EntityManager em = emf.createEntityManager();
            Query q = em.createQuery("SELECT m FROM Multimedia m WHERE  m.locationId=:loc");
            q.setParameter("loc", loc);
            List l = q.getResultList();

            //Tranformation en arraylist + conservation uniquement des favoris
            for (Object o : l) {
                Multimedia multi = (Multimedia) o;
        
                Query q1 = em.createQuery("SELECT f FROM Favorite f WHERE  f.multimediaId=:m AND f.personId=:p");
                q1.setParameter("m", multi);
                q1.setParameter("p", p);
                List l1 = q1.getResultList();
                if (!l1.isEmpty()) {
                    m.add(multi);
                }

            }
            mult.add(m);
        }

        return mult;
    }
}

