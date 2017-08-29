package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Support implements Serializable {
	
	@Id
	private String numDemande;
	
	private String objet;
	
	private String identifiant;
	
	private String contrat;
	
	private Date dateDemande;
	
	@ManyToOne
	private Client client;
	
	
	public Support() {
		// TODO Auto-generated constructor stub
	}


	public String getNumDemande() {
		return numDemande;
	}


	public void setNumDemande(String numDemande) {
		this.numDemande = numDemande;
	}


	


	public String getObjet() {
		return objet;
	}


	public void setObjet(String objet) {
		this.objet = objet;
	}


	public String getIdentifiant() {
		return identifiant;
	}


	public void setIdentifiant(String identifiant) {
		this.identifiant = identifiant;
	}


	public String getContrat() {
		return contrat;
	}


	public void setContrat(String contrat) {
		this.contrat = contrat;
	}


	public Date getDateDemande() {
		return dateDemande;
	}


	public void setDateDemande(Date dateDemande) {
		this.dateDemande = dateDemande;
	}


	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}
	
	
	

}
