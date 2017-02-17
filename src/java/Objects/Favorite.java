/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objects;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Laura
 */
@Entity
@Table(name = "favorite", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Favorite.findAll", query = "SELECT f FROM Favorite f"),
    @NamedQuery(name = "Favorite.findByFavoriteId", query = "SELECT f FROM Favorite f WHERE f.favoriteId = :favoriteId")})
public class Favorite implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "favorite_id")
    private Integer favoriteId;
    @JoinColumn(name = "multimedia_id", referencedColumnName = "multimedia_id")
    @ManyToOne(optional = false)
    private Multimedia multimediaId;
    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
    @ManyToOne(optional = false)
    private Person personId;

    public Favorite() {
    }

    public Favorite(Integer favoriteId) {
        this.favoriteId = favoriteId;
    }

    public Integer getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(Integer favoriteId) {
        this.favoriteId = favoriteId;
    }

    public Multimedia getMultimediaId() {
        return multimediaId;
    }

    public void setMultimediaId(Multimedia multimediaId) {
        this.multimediaId = multimediaId;
    }

    public Person getPersonId() {
        return personId;
    }

    public void setPersonId(Person personId) {
        this.personId = personId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (favoriteId != null ? favoriteId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Favorite)) {
            return false;
        }
        Favorite other = (Favorite) object;
        if ((this.favoriteId == null && other.favoriteId != null) || (this.favoriteId != null && !this.favoriteId.equals(other.favoriteId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Favorite[ favoriteId=" + favoriteId + " ]";
    }
    
}
