package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name="users")
public class User implements Serializable {
	
	@Id
	private String username;
	private String nom;
	private String password;
	private Boolean active;
	
	@ManyToMany
	@JoinTable(name="USERS_ROLE")
	private Collection<Role> roles = new ArrayList<>();
	
	@OneToMany(mappedBy="user")
	private List<ActiviterEmployer> activiterEmployers = new ArrayList<>();
	
	public User() {
		
	}
	
	
	
	public User(String email, String nom, String password) {
		super();
		this.username = email;
		this.nom = nom;
		this.password = password;
		this.active = true;
	}



	public User(String email, String nom, String password, Boolean active, Collection<Role> roles) {
		super();
		this.username = email;
		this.nom = nom;
		this.password = password;
		this.active = active;
		this.roles = roles;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}
	@JsonSetter
	public void setPassword(String password) {
		this.password = password;
	}
	public Collection<Role> getRoles() {
		return roles;
	}
	
	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	@JsonIgnore
	public List<ActiviterEmployer> getActiviterEmployers() {
		return activiterEmployers;
	}
	
	@JsonIgnore
	public void setActiviterEmployers(List<ActiviterEmployer> activiterEmployers) {
		this.activiterEmployers = activiterEmployers;
	}
	
	
	

	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	

	@Override
	public String toString() {
		return "User [email=" + username + ", nom=" + nom + ", password=" + password + ", active=" + active ;
	}

	
	
	
	
	
	
	
	
	
}
