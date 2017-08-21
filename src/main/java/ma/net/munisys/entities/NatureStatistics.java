package ma.net.munisys.entities;

import java.io.Serializable;

public class NatureStatistics implements Serializable {

	private String nature;
	private int nbInterventionNatureMonth;
	private String month;
	private int nbInterventionsNature;
	
	
	public NatureStatistics() {
		// TODO Auto-generated constructor stub
	}
	
	public String getNature() {
		return nature;
	}
	public void setNature(String nature) {
		this.nature = nature;
	}
	public int getNbInterventionNatureMonth() {
		return nbInterventionNatureMonth;
	}
	public void setNbInterventionNatureMonth(int nbInterventionNatureMonth) {
		this.nbInterventionNatureMonth = nbInterventionNatureMonth;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public int getNbInterventionsNature() {
		return nbInterventionsNature;
	}
	public void setNbInterventionsNature(int nbInterventionsNature) {
		this.nbInterventionsNature = nbInterventionsNature;
	}
	
	
	
	
}
