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
@Table(name = "person", catalog = "geofilm", schema = "geofilm")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Person.findAll", query = "SELECT p FROM Person p"),
    @NamedQuery(name = "Person.findByPersonId", query = "SELECT p FROM Person p WHERE p.personId = :personId"),
    @NamedQuery(name = "Person.findByPersonName", query = "SELECT p FROM Person p WHERE p.personName = :personName"),
    @NamedQuery(name = "Person.findByPersonFirstname", query = "SELECT p FROM Person p WHERE p.personFirstname = :personFirstname"),
    @NamedQuery(name = "Person.findByPersonEmail", query = "SELECT p FROM Person p WHERE p.personEmail = :personEmail"),
    @NamedQuery(name = "Person.findByPersonPassword", query = "SELECT p FROM Person p WHERE p.personPassword = :personPassword")})
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "person_id")
    private Integer personId;
    @Basic(optional = false)
    @Column(name = "person_name")
    private String personName;
    @Basic(optional = false)
    @Column(name = "person_firstname")
    private String personFirstname;
    @Basic(optional = false)
    @Column(name = "person_email")
    private String personEmail;
    @Basic(optional = false)
    @Column(name = "person_password")
    private String personPassword;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "personId")
    private Collection<Badlocation> badlocationCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "publisher")
    private Collection<Multimedia> multimediaCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "personId")
    private Collection<Favorite> favoriteCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "personId")
    private Collection<Connect> connectCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "person")
    private Collection<Liked> likedCollection;

    public Person() {
    }

    public Person(Integer personId) {
        this.personId = personId;
    }

    public Person(Integer personId, String personName, String personFirstname, String personEmail, String personPassword) {
        this.personId = personId;
        this.personName = personName;
        this.personFirstname = personFirstname;
        this.personEmail = personEmail;
        this.personPassword = personPassword;
    }

    public Integer getPersonId() {
        return personId;
    }

    public void setPersonId(Integer personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getPersonFirstname() {
        return personFirstname;
    }

    public void setPersonFirstname(String personFirstname) {
        this.personFirstname = personFirstname;
    }

    public String getPersonEmail() {
        return personEmail;
    }

    public void setPersonEmail(String personEmail) {
        this.personEmail = personEmail;
    }

    public String getPersonPassword() {
        return personPassword;
    }

    public void setPersonPassword(String personPassword) {
        this.personPassword = personPassword;
    }

    @XmlTransient
    public Collection<Badlocation> getBadlocationCollection() {
        return badlocationCollection;
    }

    public void setBadlocationCollection(Collection<Badlocation> badlocationCollection) {
        this.badlocationCollection = badlocationCollection;
    }

    @XmlTransient
    public Collection<Multimedia> getMultimediaCollection() {
        return multimediaCollection;
    }

    public void setMultimediaCollection(Collection<Multimedia> multimediaCollection) {
        this.multimediaCollection = multimediaCollection;
    }

    @XmlTransient
    public Collection<Favorite> getFavoriteCollection() {
        return favoriteCollection;
    }

    public void setFavoriteCollection(Collection<Favorite> favoriteCollection) {
        this.favoriteCollection = favoriteCollection;
    }

    @XmlTransient
    public Collection<Connect> getConnectCollection() {
        return connectCollection;
    }

    public void setConnectCollection(Collection<Connect> connectCollection) {
        this.connectCollection = connectCollection;
    }

    @XmlTransient
    public Collection<Liked> getLikedCollection() {
        return likedCollection;
    }

    public void setLikedCollection(Collection<Liked> likedCollection) {
        this.likedCollection = likedCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (personId != null ? personId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Person)) {
            return false;
        }
        Person other = (Person) object;
        if ((this.personId == null && other.personId != null) || (this.personId != null && !this.personId.equals(other.personId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Objects.Person[ personId=" + personId + " ]";
    }
    
}
