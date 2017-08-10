package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class DataBaseVersion implements Serializable {
	
	@Id
	private Long id;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
	private Date dateUpdateUser;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
	private Date dateUpdateNature;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
	private Date dateUpdateClient;
	
	
	public DataBaseVersion() {
		super();
	}


	public DataBaseVersion(Long id, Date dateUpdateUser, Date dateUpdateNature, Date dateUpdateClient) {
		super();
		this.id = id;
		this.dateUpdateUser = dateUpdateUser;
		this.dateUpdateNature = dateUpdateNature;
		this.dateUpdateClient = dateUpdateClient;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Date getDateUpdateUser() {
		return dateUpdateUser;
	}


	public void setDateUpdateUser(Date dateUpdateUser) {
		this.dateUpdateUser = dateUpdateUser;
	}


	public Date getDateUpdateNature() {
		return dateUpdateNature;
	}


	public void setDateUpdateNature(Date dateUpdateNature) {
		this.dateUpdateNature = dateUpdateNature;
	}


	public Date getDateUpdateClient() {
		return dateUpdateClient;
	}


	public void setDateUpdateClient(Date dateUpdateClient) {
		this.dateUpdateClient = dateUpdateClient;
	}


	@Override
	public String toString() {
		return "DatabaseVersion [id=" + id + ", dateUpdateUser=" + dateUpdateUser + ", dateUpdateNature="
				+ dateUpdateNature + ", dateUpdateClient=" + dateUpdateClient + "]";
	}
	
	
	
	
	
	
	
	
	

}
