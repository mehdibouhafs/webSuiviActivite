package ma.net.munisys.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Projet implements Serializable {
	
	@Id
	private String id;
	private String projet;
	private int statutProjet; 
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjet() {
		return projet;
	}
	public void setProjet(String projet) {
		this.projet = projet;
	}
	public int getStatutProjet() {
		return statutProjet;
	}
	public void setStatutProjet(int statutProjet) {
		this.statutProjet = statutProjet;
	}
	
	
	
	
	

}
