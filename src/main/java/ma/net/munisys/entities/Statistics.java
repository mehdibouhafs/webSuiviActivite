package ma.net.munisys.entities;

import java.io.Serializable;

public class Statistics implements Serializable {
	
	private int nbActiviterRealiser;
	private int nbActiviterPlannifier;
	private int nbClient;
	private int nbNature;
	
	
	public Statistics() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	public Statistics(int nbActiviterRealiser, int nbActiviterPlannifier, int nbClient, int nbNature) {
		super();
		this.nbActiviterRealiser = nbActiviterRealiser;
		this.nbActiviterPlannifier = nbActiviterPlannifier;
		this.nbClient = nbClient;
		this.nbNature = nbNature;
	}




	public int getNbActiviterRealiser() {
		return nbActiviterRealiser;
	}


	public void setNbActiviterRealiser(int nbActiviterRealiser) {
		this.nbActiviterRealiser = nbActiviterRealiser;
	}


	public int getNbActiviterPlannifier() {
		return nbActiviterPlannifier;
	}


	public void setNbActiviterPlannifier(int nbActiviterPlannifier) {
		this.nbActiviterPlannifier = nbActiviterPlannifier;
	}


	public int getNbClient() {
		return nbClient;
	}
	public void setNbClient(int nbClient) {
		this.nbClient = nbClient;
	}
	public int getNbNature() {
		return nbNature;
	}
	public void setNbNature(int nbNature) {
		this.nbNature = nbNature;
	}
	
	
	
	
	

}
