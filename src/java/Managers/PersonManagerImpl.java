/**
 * ********************************************************************
 * Class PersonManagementImpl
 * Gestion des personnes
 * --------------------------------------------------------------------
 * Last update : 29/01/2017
 *********************************************************************
 */
package Managers;

import Objects.Favorite;
import Objects.Multimedia;
import Objects.Person;
import Util.PasswordHash;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class PersonManagerImpl implements PersonManager {

    private EntityManagerFactory emf;
    private static PersonManagerImpl thePersonManager;

    private PersonManagerImpl() {
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory("Geofilm2PU");
        }
    }

    public static PersonManager getInstance() {
        if (thePersonManager == null) {
            thePersonManager = new PersonManagerImpl();
        }
        return thePersonManager;
    }

    /**
     * Retrouver une personne par son identifiant de connexion
     *
     * @param id Identifiant de connexion
     * @return Personne
     */
    @Override
    public Person findPerson(String id) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT c.personId FROM Connect c WHERE  c.connectId=:id");
        q.setParameter("id", id);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Person) l.get(0);
    }

    /**
     * Retrouver une personne par son email
     *
     * @param email Adresse email
     * @return Personne
     */
    @Override
    public Person findPersonByEmail(String email) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT p FROM Person p WHERE  p.personEmail=:email");
        q.setParameter("email", email);
        List l = q.getResultList();
        return l.isEmpty() ? null : (Person) l.get(0);
    }

    /**
     * Inscription d'une personne
     *
     * @param email Adresse email
     * @param mdp Mot de passe
     * @param name Nom
     * @param firstname Prénom
     */
    @Override
    public void insert(String email, String mdp, String name, String firstname) {
        //Création de l'objet personne
        Person p = new Person();
        p.setPersonEmail(email);
        p.setPersonFirstname(firstname);
        p.setPersonName(name);
        p.setPersonPassword(PasswordHash.hash(mdp));
        //Insertion
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(p);
        em.getTransaction().commit();
    }

    /**
     * Mise à jour des informations d'une personne
     *
     * @param p Personne
     * @param name Nom
     * @param firstname Prénom
     * @param email Adresse Email
     */
    @Override
    public void updateInfos(Person p, String name, String firstname, String email) {
        //Mise à jour des infos
        p.setPersonEmail(email);
        p.setPersonFirstname(firstname);
        p.setPersonName(name);
        //Update dans la base de données
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.merge(p);
        em.getTransaction().commit();
    }
    
    /**
     * Mise à jour du mot de passe d'une personne
     *
     * @param p Personne
     * @param mdp Mot de passe
     */
    @Override
    public void updateMdp(Person p, String mdp) {
        //Mise à jour des infos
        p.setPersonPassword(PasswordHash.hash(mdp));
        //Update dans la base de données
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.merge(p);
        em.getTransaction().commit();
    }

    /**
     * Suppression d'un favoris
     *
     * @param p Personne
     * @param m Multimedia
     */
    @Override
    public void removeFavorite(Person p, Multimedia m) {
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT f FROM Favorite f WHERE f.personId=:p AND f.multimediaId=:m");
        q.setParameter("p", p);
        q.setParameter("m", m);
        List l = q.getResultList();
        if (!l.isEmpty()) {
            Favorite f = ((Favorite) l.get(0));
            em.getTransaction().begin();
            em.remove(f);
            em.getTransaction().commit();
        }
    }

}

