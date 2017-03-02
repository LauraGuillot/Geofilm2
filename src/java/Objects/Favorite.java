/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objects;

import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Paola
 */
@Entity
@Table(name = "favorite", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Favorite.findAll", query = "SELECT f FROM Favorite f"),
    @NamedQuery(name = "Favorite.findByPersonId", query = "SELECT f FROM Favorite f WHERE f.favoritePK.personId = :personId"),
    @NamedQuery(name = "Favorite.findByMultimediaId", query = "SELECT f FROM Favorite f WHERE f.favoritePK.multimediaId = :multimediaId"),
    @NamedQuery(name = "Favorite.findByFavoriteId", query = "SELECT f FROM Favorite f WHERE f.favoritePK.favoriteId = :favoriteId")})
public class Favorite implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected FavoritePK favoritePK;

    public Favorite() {
    }

    public Favorite(FavoritePK favoritePK) {
        this.favoritePK = favoritePK;
    }

    public Favorite(int personId, int multimediaId, int favoriteId) {
        this.favoritePK = new FavoritePK(personId, multimediaId, favoriteId);
    }

    public FavoritePK getFavoritePK() {
        return favoritePK;
    }

    public void setFavoritePK(FavoritePK favoritePK) {
        this.favoritePK = favoritePK;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (favoritePK != null ? favoritePK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Favorite)) {
            return false;
        }
        Favorite other = (Favorite) object;
        if ((this.favoritePK == null && other.favoritePK != null) || (this.favoritePK != null && !this.favoritePK.equals(other.favoritePK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Favorite[ favoritePK=" + favoritePK + " ]";
    }
    
}
