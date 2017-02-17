package Objects;

import Objects.Multimedia;
import Objects.Person;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-02-17T14:33:21")
@StaticMetamodel(Favorite.class)
public class Favorite_ { 

    public static volatile SingularAttribute<Favorite, Integer> favoriteId;
    public static volatile SingularAttribute<Favorite, Multimedia> multimediaId;
    public static volatile SingularAttribute<Favorite, Person> personId;

}