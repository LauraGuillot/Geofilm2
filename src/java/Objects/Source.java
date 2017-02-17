/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objects;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Laura
 */
@Entity
@Table(name = "source", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Source.findAll", query = "SELECT s FROM Source s"),
    @NamedQuery(name = "Source.findBySourceId", query = "SELECT s FROM Source s WHERE s.sourceId = :sourceId"),
    @NamedQuery(name = "Source.findBySourceTitle", query = "SELECT s FROM Source s WHERE s.sourceTitle = :sourceTitle"),
    @NamedQuery(name = "Source.findBySourceType", query = "SELECT s FROM Source s WHERE s.sourceType = :sourceType")})
public class Source implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "source_id")
    private Integer sourceId;
    @Basic(optional = false)
    @Column(name = "source_title")
    private String sourceTitle;
    @Column(name = "source_type")
    private String sourceType;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sourceId")
    private Collection<Multimedia> multimediaCollection;

    public Source() {
    }

    public Source(Integer sourceId) {
        this.sourceId = sourceId;
    }

    public Source(Integer sourceId, String sourceTitle) {
        this.sourceId = sourceId;
        this.sourceTitle = sourceTitle;
    }

    public Integer getSourceId() {
        return sourceId;
    }

    public void setSourceId(Integer sourceId) {
        this.sourceId = sourceId;
    }

    public String getSourceTitle() {
        return sourceTitle;
    }

    public void setSourceTitle(String sourceTitle) {
        this.sourceTitle = sourceTitle;
    }

    public String getSourceType() {
        return sourceType;
    }

    public void setSourceType(String sourceType) {
        this.sourceType = sourceType;
    }

    @XmlTransient
    public Collection<Multimedia> getMultimediaCollection() {
        return multimediaCollection;
    }

    public void setMultimediaCollection(Collection<Multimedia> multimediaCollection) {
        this.multimediaCollection = multimediaCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sourceId != null ? sourceId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Source)) {
            return false;
        }
        Source other = (Source) object;
        if ((this.sourceId == null && other.sourceId != null) || (this.sourceId != null && !this.sourceId.equals(other.sourceId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Source[ sourceId=" + sourceId + " ]";
    }
    
}
