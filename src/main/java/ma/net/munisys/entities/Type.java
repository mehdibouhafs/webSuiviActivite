package ma.net.munisys.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Type  implements Serializable {
	
	@Id @GeneratedValue
	private Long id;
	private String type;
	
	public Type() {
		super();
	}
	
	
	public Type(Long id, String type) {
		
		this.id = id;
		this.type = type;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}


	@Override
	public String toString() {
		return "Type [id=" + id + ", type=" + type + "]";
	}
	
	
	
	
	
	

}
