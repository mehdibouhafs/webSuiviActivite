package ma.net.munisys.entities;

import java.io.Serializable;

public class ClientStatistics implements Serializable {
	
	private String client;
	private int nbInterventionMonth;
	private String month;
	private int nbInterventions1;
	
	
	public ClientStatistics() {
		// TODO Auto-generated constructor stub
	}
	
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public int getNbInterventionMonth() {
		return nbInterventionMonth;
	}
	public void setNbInterventionMonth(int nbInterventionMonth) {
		this.nbInterventionMonth = nbInterventionMonth;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public int getNbInterventions1() {
		return nbInterventions1;
	}

	public void setNbInterventions1(int nbInterventions1) {
		this.nbInterventions1 = nbInterventions1;
	}

	
	
	
	
	
	
	

}
