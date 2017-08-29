package ma.net.munisys.entities;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Transient;



@Entity
@DiscriminatorValue("AS")
public class ActiviterEmployerSupport extends ActiviterEmployer {
	
	@OneToOne
	private Support support;
	@Transient
	private Projet projet = new Projet();
	
	public ActiviterEmployerSupport(Support support) {
		super();
		this.support = support;
	}

	public ActiviterEmployerSupport(Date dateDebut, Date dateFin, String heureDebut, String heureFin, Client client,
			Nature nature, String descProjet, Lieu lieu, Ville ville, String duree, String dureeFormated, ma.net.munisys.entities.Type type,
			User user) {
		super(dateDebut, dateFin,heureDebut,heureFin,client,nature,descProjet,lieu,ville,duree,dureeFormated,type,user);
	}

	public ActiviterEmployerSupport() {
		super();
	}

	public Support getSupport() {
		return support;
	}

	public void setSupport(Support support) {
		this.support = support;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	
	
	
	

}
