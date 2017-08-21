package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Groupe implements Serializable {
	
	@Id @GeneratedValue
	private Long codeGroupe;
	private String nomGroupe;
	@OneToMany(mappedBy="groupe")
	private List<User> user;
	
	
	
	
	public Groupe() {
		// TODO Auto-generated constructor stub
	}
	
	public Long getCodeGroupe() {
		return codeGroupe;
	}
	public void setCodeGroupe(Long codeGroupe) {
		this.codeGroupe = codeGroupe;
	}
	public String getNomGroupe() {
		return nomGroupe;
	}
	public void setNomGroupe(String nomGroupe) {
		this.nomGroupe = nomGroupe;
	}
	
	

	@JsonIgnore
	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	
	
	
	
	

}
