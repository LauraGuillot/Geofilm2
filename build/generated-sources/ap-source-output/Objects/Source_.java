package Objects;

import Objects.Multimedia;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-03-25T15:26:24")
@StaticMetamodel(Source.class)
public class Source_ { 

    public static volatile SingularAttribute<Source, Integer> sourceId;
    public static volatile SingularAttribute<Source, String> sourceType;
    public static volatile SingularAttribute<Source, String> sourceTitle;
    public static volatile CollectionAttribute<Source, Multimedia> multimediaCollection;

}