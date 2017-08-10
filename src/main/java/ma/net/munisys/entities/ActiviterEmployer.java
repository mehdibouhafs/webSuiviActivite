package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
public class ActiviterEmployer implements Serializable {
	
	@Id @GeneratedValue
	private Long id;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
	private Date dateDebut;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private Date dateFin;
    private String heureDebut;
    private String heureFin;
    @OneToOne
    private Client client;
    @OneToOne
    private Nature nature;
    private String descProjet;
    @OneToOne
    private Lieu lieu;
    @OneToOne
    private Ville ville;
    private String duree;
    @OneToOne
    private Type type;
    
    private int tag;
    
    @ManyToOne
    private User user;
    
	public ActiviterEmployer() {
		
	}
	

	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}





	public Nature getNature() {
		return nature;
	}





	public void setNature(Nature nature) {
		this.nature = nature;
	}


	public String getDescProjet() {
		return descProjet;
	}

	public void setDescProjet(String descProjet) {
		this.descProjet = descProjet;
	}
	

	public Type getType() {
		return type;
	}


	public void setType(Type type) {
		this.type = type;
	}


	public Lieu getLieu() {
		return lieu;
	}


	public void setLieu(Lieu lieu) {
		this.lieu = lieu;
	}


	public Ville getVille() {
		return ville;
	}


	public void setVille(Ville ville) {
		this.ville = ville;
	}


	public String getDuree() {
		return duree;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public String getHeureDebut() {
		return heureDebut;
	}

	public void setHeureDebut(String heureDebut) {
		this.heureDebut = heureDebut;
	}

	public String getHeureFin() {
		return heureFin;
	}

	public void setHeureFin(String heureFin) {
		this.heureFin = heureFin;
	}

	

	public void setDuree(String duree) {
		this.duree = duree;
	}

	public int getTag() {
		return tag;
	}

	public void setTag(int tag) {
		this.tag = tag;
	}

	
	
	public User getUser() {
		return user;
	}

	@JsonSetter
	public void setUser(User user) {
		this.user = user;
	}
	

	@Override
	public String toString() {
		return "ActiviterEmployer [id=" + id + ", dateDebut=" + dateDebut + ", dateFin=" + dateFin
				+ ", heureDebut=" + heureDebut + ", heureFin=" + heureFin + ", client=" + client + ", nature=" + nature
				+ ", descProjet=" + descProjet + ", lieu=" + lieu + ", ville=" + ville + ", duree=" + duree + ", tag="
				+ tag + ", user=" + user + "]";
	}
	
}
