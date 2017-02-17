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
 * @author Laura
 */
@Embeddable
public class LikedPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "person_id")
    private int personId;
    @Basic(optional = false)
    @Column(name = "multimedia_id")
    private int multimediaId;

    public LikedPK() {
    }

    public LikedPK(int personId, int multimediaId) {
        this.personId = personId;
        this.multimediaId = multimediaId;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) personId;
        hash += (int) multimediaId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof LikedPK)) {
            return false;
        }
        LikedPK other = (LikedPK) object;
        if (this.personId != other.personId) {
            return false;
        }
        if (this.multimediaId != other.multimediaId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.LikedPK[ personId=" + personId + ", multimediaId=" + multimediaId + " ]";
    }
    
}
