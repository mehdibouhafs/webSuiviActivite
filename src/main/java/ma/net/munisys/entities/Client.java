package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Client implements Serializable {
	
	@Id @GeneratedValue
	private Long id;
	private String client;
	private String codeClient;

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


	@Override
	public String toString() {
		return "Client [id=" + id + ", client=" + client + "]";
	}
	
	
	
	

}
