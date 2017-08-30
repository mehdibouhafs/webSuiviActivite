package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Projet implements Serializable {
	
	@Id
	private String id;
	private String projet;
	private int statutProjet; 
	
	@ManyToOne
	private Client client;
	
	
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
	
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	

}
