/**
 * ********************************************************************
 * Interface MultimediaManager
 *********************************************************************
 */
package Managers;

import Objects.Location;
import Objects.Multimedia;
import Objects.Person;
import Objects.Source;
import java.util.ArrayList;

public interface MultimediaManager {

    /**
     * Obtention d'une liste de listes de multimédias où chaque liste de
     * multimédia correspond à une position donnée
     *
     * @param pos Liste de positions
     * @return Liste de listes de multimédias
     */
    public ArrayList<ArrayList<Multimedia>> getMultiByPos(ArrayList<Location> pos);

    /**
     * Récupérer le nombre de likes d'un multimédia
     *
     * @param m Multimédia
     * @return Nombre de likes
     */
    public Integer getLike(Multimedia m);

    /**
     * Récupérer le nombre de dislikes d'un multimédia
     *
     * @param m Multimédia
     * @return Nombre de dislikes
     */
    public Integer getDislike(Multimedia m);

    /**
     * Récupérer les likes de chaque multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de likes
     */
    public ArrayList<ArrayList<Integer>> getLikes(ArrayList<ArrayList<Multimedia>> multis);

    /**
     * Récupérer les dislikes de chaque multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dislikes
     */
    public ArrayList<ArrayList<Integer>> getDislikes(ArrayList<ArrayList<Multimedia>> multis);

    /**
     * Récupérer les signalements de mauvais géolocalisation pour tous les
     * multimédias
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de mauvaise géolocalisation
     */
    public ArrayList<ArrayList<Integer>> getBadLoc(ArrayList<ArrayList<Multimedia>> multis);

    /**
     * Récupérer le nombre de signalements de mauvaise géolocalisation pour un
     * multimedia
     *
     * @param m Multimedia
     * @return Nombre de signalements
     */
    public int getBadLocMult(Multimedia m);

    /**
     * Récupérer un multimédia par son id
     *
     * @param id Identifiant
     * @return Multimédia
     */
    public Multimedia getMultById(int id);

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
    public String getInfosMuliPerson(Multimedia m, Person p);

    /**
     * Ajout d'un multimédia dans les favoris d'une personne
     *
     * @param m Multimédia
     * @param p Personne
     */
    public void addToFavorite(Multimedia m, Person p);

    /**
     * Signalement d'un multimédia comme mal géolocalisé
     *
     * @param m Multimédia
     * @param p Personne
     */
    public void signal(Multimedia m, Person p);

    /**
     * Enregistrement d'un like/dislike d'une personne
     *
     * @param m Multimedia
     * @param p Personne
     * @param type Type : like ou dislike
     */
    public void like(Multimedia m, Person p, String type);

    /**
     * Insertion d'un multimédia dans la base de données
     *
     * @param title
     * @param description
     * @param path
     * @param date
     * @param format
     * @param language
     * @param type
     * @param l Localisation du média
     * @param p Personne qui upload la vidéo
     * @param sourceId Source du multimédia
     */
    public void insertMultimedia(String title, String description, String path, String date, String format, String language, String type, Location l, Person p, Source sourceId);

    /**
     * Etant donnée un matrice 2D de positions (positions classées par source),
     * on récupère une matrice 3D de multimédias (multimédias classés par
     * sources et par position)
     *
     * @param loc Matrice de positions
     * @return Matrice de multimédias
     */
    public ArrayList<ArrayList<ArrayList<Multimedia>>> getMultimediaForSource(ArrayList<ArrayList<Location>> loc);

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de likes
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de likes
     */
    public ArrayList<ArrayList<ArrayList<Integer>>> getLikesSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis);

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de dislikes
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dislikes
     */
    public ArrayList<ArrayList<ArrayList<Integer>>> getDislikesSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis);

    /**
     * Etant donnée un matrice 3D de multimédias (multimédias classés par
     * sources et par position), on récupère pour chaque multimédia de cette
     * matrice le nombre de signalements
     *
     * @param multis Matrice de multimédias
     * @return Matrice de nombre de dsignalements
     */
    public ArrayList<ArrayList<ArrayList<Integer>>> getBadLocSource(ArrayList<ArrayList<ArrayList<Multimedia>>> multis);

    /**
     * Suppression d'un like
     *
     * @param m Multimédia liké
     * @param p Utilisateur
     */
    public void deleteLike(Multimedia m, Person p);
    
    /**
     * Obtention des favoris correspondant à une liste de positions
     * @param pos Liste de positions
     * @param p Utilisateur
     * @return Matrice de multimedias
     */
     public ArrayList<ArrayList<Multimedia>> getFavoritesByPos(ArrayList<Location> pos, Person p);
}
