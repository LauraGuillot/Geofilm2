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
 * @author Paola
 */
@Entity
@Table(name = "connect", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Connect.findAll", query = "SELECT c FROM Connect c"),
    @NamedQuery(name = "Connect.findByConnectId", query = "SELECT c FROM Connect c WHERE c.connectId = :connectId"),
    @NamedQuery(name = "Connect.findByConnectLastAction", query = "SELECT c FROM Connect c WHERE c.connectLastAction = :connectLastAction")})
public class Connect implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "connect_id")
    private String connectId;
    @Basic(optional = false)
    @Column(name = "connect_last_action")
    private String connectLastAction;
    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
    @ManyToOne(optional = false)
    private Person personId;

    public Connect() {
    }

    public Connect(String connectId) {
        this.connectId = connectId;
    }

    public Connect(String connectId, String connectLastAction) {
        this.connectId = connectId;
        this.connectLastAction = connectLastAction;
    }

    public String getConnectId() {
        return connectId;
    }

    public void setConnectId(String connectId) {
        this.connectId = connectId;
    }

    public String getConnectLastAction() {
        return connectLastAction;
    }

    public void setConnectLastAction(String connectLastAction) {
        this.connectLastAction = connectLastAction;
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
        hash += (connectId != null ? connectId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Connect)) {
            return false;
        }
        Connect other = (Connect) object;
        if ((this.connectId == null && other.connectId != null) || (this.connectId != null && !this.connectId.equals(other.connectId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Connect[ connectId=" + connectId + " ]";
    }
    
}
