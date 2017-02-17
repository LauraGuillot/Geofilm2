/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objects;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
@Table(name = "liked", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Liked.findAll", query = "SELECT l FROM Liked l"),
    @NamedQuery(name = "Liked.findByPersonId", query = "SELECT l FROM Liked l WHERE l.likedPK.personId = :personId"),
    @NamedQuery(name = "Liked.findByMultimediaId", query = "SELECT l FROM Liked l WHERE l.likedPK.multimediaId = :multimediaId"),
    @NamedQuery(name = "Liked.findByLikedType", query = "SELECT l FROM Liked l WHERE l.likedType = :likedType")})
public class Liked implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected LikedPK likedPK;
    @Basic(optional = false)
    @Column(name = "liked_type")
    private String likedType;
    @JoinColumn(name = "multimedia_id", referencedColumnName = "multimedia_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Multimedia multimedia;
    @JoinColumn(name = "person_id", referencedColumnName = "person_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Person person;

    public Liked() {
    }

    public Liked(LikedPK likedPK) {
        this.likedPK = likedPK;
    }

    public Liked(LikedPK likedPK, String likedType) {
        this.likedPK = likedPK;
        this.likedType = likedType;
    }

    public Liked(int personId, int multimediaId) {
        this.likedPK = new LikedPK(personId, multimediaId);
    }

    public LikedPK getLikedPK() {
        return likedPK;
    }

    public void setLikedPK(LikedPK likedPK) {
        this.likedPK = likedPK;
    }

    public String getLikedType() {
        return likedType;
    }

    public void setLikedType(String likedType) {
        this.likedType = likedType;
    }

    public Multimedia getMultimedia() {
        return multimedia;
    }

    public void setMultimedia(Multimedia multimedia) {
        this.multimedia = multimedia;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (likedPK != null ? likedPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Liked)) {
            return false;
        }
        Liked other = (Liked) object;
        if ((this.likedPK == null && other.likedPK != null) || (this.likedPK != null && !this.likedPK.equals(other.likedPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Liked[ likedPK=" + likedPK + " ]";
    }
    
}
