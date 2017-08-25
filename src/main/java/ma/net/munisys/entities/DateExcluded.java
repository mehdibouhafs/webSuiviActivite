package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class DateExcluded implements Serializable {
	
	@Id
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dateExcluded;
	
	private String intitule;
	
	
	public DateExcluded() {
		// TODO Auto-generated constructor stub
	}

	public Date getDateExcluded() {
		return dateExcluded;
	}

	public void setDateExcluded(Date dateExcluded) {
		this.dateExcluded = dateExcluded;
	}
	
	

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	@Override
	public String toString() {
		return "DateExcluded [dateExcluded=" + dateExcluded + "]";
	}
	
	

}
