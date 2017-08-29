package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Client implements Serializable {
	
	@Id @GeneratedValue
	private Long id;
	private String client;
	private String codeClient;
	@OneToMany(mappedBy="client")
	private List<Projet> projets;
	
	

	public Client() {
		super();
	}


	public Client(Long id, String client) {
		super();
		this.id = id;
		this.client = client;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getClient() {
		return client;
	}


	public void setClient(String client) {
		this.client = client;
	}

	public String getCodeClient() {
		return codeClient;
	}


	public void setCodeClient(String codeClient) {
		this.codeClient = codeClient;
	}
	
	

	@JsonIgnore
	public List<Projet> getProjets() {
		return projets;
	}


	public void setProjets(List<Projet> projets) {
		this.projets = projets;
	}


	@Override
	public String toString() {
		return "Client [id=" + id + ", client=" + client + "]";
	}
	
	
	
	

}
