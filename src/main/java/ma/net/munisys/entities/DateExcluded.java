package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class DateExcluded implements Serializable {
	
	@Id
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
	private Date dateExcluded;
	
	
	public DateExcluded() {
		// TODO Auto-generated constructor stub
	}

	public Date getDateExcluded() {
		return dateExcluded;
	}

	public void setDateExcluded(Date dateExcluded) {
		this.dateExcluded = dateExcluded;
	}

	@Override
	public String toString() {
		return "DateExcluded [dateExcluded=" + dateExcluded + "]";
	}
	
	

}
