/*
  * Classe Source.java
  * ------------------------------------------------------------------------------
  * Objet de la base de données
  * Une source peut être un film, une série ou un jeu.
  * Elle se caractérise par un identifiant, un titre et un type (FILM, SERIE, JEU).
  * La source d'identifiant 0 est la source nulle. Un multimédia qui a pour source 
  * la source nulle n'a en réalité pas de source connue.
 */
package Objects;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "source", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Source.findAll", query = "SELECT s FROM Source s"),
    @NamedQuery(name = "Source.findBySourceId", query = "SELECT s FROM Source s WHERE s.sourceId = :sourceId"),
    @NamedQuery(name = "Source.findBySourceTitle", query = "SELECT s FROM Source s WHERE s.sourceTitle = :sourceTitle"),
    @NamedQuery(name = "Source.findBySourceType", query = "SELECT s FROM Source s WHERE s.sourceType = :sourceType"),
    @NamedQuery(name = "Source.findBySourceMultimediaStart", query = "SELECT s FROM Source s WHERE s.sourceMultimediaStart = :sourceMultimediaStart"),
    @NamedQuery(name = "Source.findBySourceMultimediaEnd", query = "SELECT s FROM Source s WHERE s.sourceMultimediaEnd = :sourceMultimediaEnd")})
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
    @Column(name = "source_multimedia_start")
    private String sourceMultimediaStart;
    @Column(name = "source_multimedia_end")
    private String sourceMultimediaEnd;

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

    public String getSourceMultimediaStart() {
        return sourceMultimediaStart;
    }

    public void setSourceMultimediaStart(String sourceMultimediaStart) {
        this.sourceMultimediaStart = sourceMultimediaStart;
    }

    public String getSourceMultimediaEnd() {
        return sourceMultimediaEnd;
    }

    public void setSourceMultimediaEnd(String sourceMultimediaEnd) {
        this.sourceMultimediaEnd = sourceMultimediaEnd;
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
