package ma.net.munisys.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Nature implements Serializable {
	
	
	@Id @GeneratedValue
	private Long id;
	private String nature;
	
	
	
	
	
	public Nature() {
		super();
	}


	public Nature(Long id, String nature) {
		super();
		this.id = id;
		this.nature = nature;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNature() {
		return nature;
	}


	public void setNature(String nature) {
		this.nature = nature;
	}


	@Override
	public String toString() {
		return "Nature [id=" + id + ", nature=" + nature + "]";
	}
	
	
	
	
	

}
