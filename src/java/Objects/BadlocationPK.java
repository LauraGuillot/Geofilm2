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
public class BadlocationPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "person_id")
    private int personId;
    @Basic(optional = false)
    @Column(name = "multimedia_id")
    private int multimediaId;
    @Basic(optional = false)
    @Column(name = "badlocation_id")
    private int badlocationId;

    public BadlocationPK() {
    }

    public BadlocationPK(int personId, int multimediaId, int badlocationId) {
        this.personId = personId;
        this.multimediaId = multimediaId;
        this.badlocationId = badlocationId;
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

    public int getBadlocationId() {
        return badlocationId;
    }

    public void setBadlocationId(int badlocationId) {
        this.badlocationId = badlocationId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) personId;
        hash += (int) multimediaId;
        hash += (int) badlocationId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BadlocationPK)) {
            return false;
        }
        BadlocationPK other = (BadlocationPK) object;
        if (this.personId != other.personId) {
            return false;
        }
        if (this.multimediaId != other.multimediaId) {
            return false;
        }
        if (this.badlocationId != other.badlocationId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.BadlocationPK[ personId=" + personId + ", multimediaId=" + multimediaId + ", badlocationId=" + badlocationId + " ]";
    }
    
}
