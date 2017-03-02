/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objects;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author Paola
 */
@Embeddable
public class FavoritePK implements Serializable {

    @Basic(optional = false)
    @Column(name = "person_id")
    private int personId;
    @Basic(optional = false)
    @Column(name = "multimedia_id")
    private int multimediaId;
    @Basic(optional = false)
    @Column(name = "favorite_id")
    private int favoriteId;

    public FavoritePK() {
    }

    public FavoritePK(int personId, int multimediaId, int favoriteId) {
        this.personId = personId;
        this.multimediaId = multimediaId;
        this.favoriteId = favoriteId;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public int getMultimediaId() {
        return multimediaId;
    }

    public void setMultimediaId(int multimediaId) {
        this.multimediaId = multimediaId;
    }

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) personId;
        hash += (int) multimediaId;
        hash += (int) favoriteId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof FavoritePK)) {
            return false;
        }
        FavoritePK other = (FavoritePK) object;
        if (this.personId != other.personId) {
            return false;
        }
        if (this.multimediaId != other.multimediaId) {
            return false;
        }
        if (this.favoriteId != other.favoriteId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.FavoritePK[ personId=" + personId + ", multimediaId=" + multimediaId + ", favoriteId=" + favoriteId + " ]";
    }
    
}
