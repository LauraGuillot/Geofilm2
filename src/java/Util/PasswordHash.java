/**
 * ********************************************************************
 * Class PasswordHash
 * Hachage des mots de passe
 * --------------------------------------------------------------------
 * Last update : 01/02/2017
 *********************************************************************
 */

package Util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHash {

    /**
     * Hachage + Sallage d'un mot de passe
     * @param password Mot de passe
     * @return Mot de passe haché
     */
    public static String hash(String password) {
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt(10));
        return hashed;
    }

    /**
     * Tester si un mot de passe correspond au hachage enregistré
     * @param mdp Mot de passe
     * @param hashed Hash 
     * @return True si il y a correspondance
     */
    public static boolean match(String mdp, String hashed) {
        return BCrypt.checkpw(mdp, hashed);
    }

}