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
@Table(name = "badlocation", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Badlocation.findAll", query = "SELECT b FROM Badlocation b"),
    @NamedQuery(name = "Badlocation.findByBadlocationId", query = "SELECT b FROM Badlocation b WHERE b.badlocationId = :badlocationId")})
public class Badlocation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "badlocation_id")
    private Integer badlocationId;
    @JoinColumn(name = "multimedia_id", referencedColumnName = "multimedia_id")
    @ManyToOne(optional = false)
    private Multimedia multimediaId;
    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
    @ManyToOne(optional = false)
    private Person personId;

    public Badlocation() {
    }

    public Badlocation(Integer badlocationId) {
        this.badlocationId = badlocationId;
    }

    public Integer getBadlocationId() {
        return badlocationId;
    }

    public void setBadlocationId(Integer badlocationId) {
        this.badlocationId = badlocationId;
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
        hash += (badlocationId != null ? badlocationId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Badlocation)) {
            return false;
        }
        Badlocation other = (Badlocation) object;
        if ((this.badlocationId == null && other.badlocationId != null) || (this.badlocationId != null && !this.badlocationId.equals(other.badlocationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Badlocation[ badlocationId=" + badlocationId + " ]";
    }
    
}
