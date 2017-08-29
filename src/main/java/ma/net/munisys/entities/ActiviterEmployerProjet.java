package ma.net.munisys.entities;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

@Entity
@DiscriminatorValue("AP")
public class ActiviterEmployerProjet extends ActiviterEmployer {
	
	 @OneToOne
	  private Projet projet;

	

	public ActiviterEmployerProjet(Projet projet) {
		super();
		this.projet = projet;
	}
	
	
	public ActiviterEmployerProjet(Date dateDebut, Date dateFin, String heureDebut, String heureFin, Client client,
			Nature nature, String descProjet, Lieu lieu, Ville ville, String duree, String dureeFormated, ma.net.munisys.entities.Type type,
			User user) {
		super(dateDebut, dateFin,heureDebut,heureFin,client,nature,descProjet,lieu,ville,duree,dureeFormated,type,user);
		
		
	}
	
	

	public ActiviterEmployerProjet() {
		super();
	}


	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	
	
	    
	 
	

}
