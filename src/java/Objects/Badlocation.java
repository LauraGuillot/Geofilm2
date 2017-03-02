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
@Table(name = "badlocation", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Badlocation.findAll", query = "SELECT b FROM Badlocation b"),
    @NamedQuery(name = "Badlocation.findByPersonId", query = "SELECT b FROM Badlocation b WHERE b.badlocationPK.personId = :personId"),
    @NamedQuery(name = "Badlocation.findByMultimediaId", query = "SELECT b FROM Badlocation b WHERE b.badlocationPK.multimediaId = :multimediaId"),
    @NamedQuery(name = "Badlocation.findByBadlocationId", query = "SELECT b FROM Badlocation b WHERE b.badlocationPK.badlocationId = :badlocationId")})
public class Badlocation implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected BadlocationPK badlocationPK;

    public Badlocation() {
    }

    public Badlocation(BadlocationPK badlocationPK) {
        this.badlocationPK = badlocationPK;
    }

    public Badlocation(int personId, int multimediaId, int badlocationId) {
        this.badlocationPK = new BadlocationPK(personId, multimediaId, badlocationId);
    }

    public BadlocationPK getBadlocationPK() {
        return badlocationPK;
    }

    public void setBadlocationPK(BadlocationPK badlocationPK) {
        this.badlocationPK = badlocationPK;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (badlocationPK != null ? badlocationPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Badlocation)) {
            return false;
        }
        Badlocation other = (Badlocation) object;
        if ((this.badlocationPK == null && other.badlocationPK != null) || (this.badlocationPK != null && !this.badlocationPK.equals(other.badlocationPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Badlocation[ badlocationPK=" + badlocationPK + " ]";
    }
    
}
