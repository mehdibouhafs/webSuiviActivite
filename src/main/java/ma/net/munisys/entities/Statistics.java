package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Statistics implements Serializable {
	
	private int nbActiviterRealiser;
	private int nbActiviterPlannifier;
	private int nbClient;
	private int nbNature;
	private int nbInterventionMois1;
	private int nbInterventionMois2;
	private int nbInterventionMois3;
	private int nbInterventionMois4;
	private String tauxActuel;
	private List<ClientStatistics> clientStatistics = new ArrayList<>();
	private List<NatureStatistics> natureStatistics = new ArrayList<>();
	private List<DureeMonth> dureeStatistics = new ArrayList<>();
	
	
	
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

	public int getNbInterventionMois1() {
		return nbInterventionMois1;
	}




	public void setNbInterventionMois1(int nbInterventionMois1) {
		this.nbInterventionMois1 = nbInterventionMois1;
	}




	public int getNbInterventionMois2() {
		return nbInterventionMois2;
	}



	public void setNbInterventionMois2(int nbInterventionMois2) {
		this.nbInterventionMois2 = nbInterventionMois2;
	}


	public int getNbInterventionMois3() {
		return nbInterventionMois3;
	}


	public void setNbInterventionMois3(int nbInterventionMois3) {
		this.nbInterventionMois3 = nbInterventionMois3;
	}




	public int getNbInterventionMois4() {
		return nbInterventionMois4;
	}
	

	public List<ClientStatistics> getClientStatistics() {
		return clientStatistics;
	}


	public void setClientStatistics(List<ClientStatistics> clientStatistics) {
		this.clientStatistics = clientStatistics;
	}


	public void setNbInterventionMois4(int nbInterventionMois4) {
		this.nbInterventionMois4 = nbInterventionMois4;
	}

	public List<NatureStatistics> getNatureStatistics() {
		return natureStatistics;
	}

	public void setNatureStatistics(List<NatureStatistics> natureStatistics) {
		this.natureStatistics = natureStatistics;
	}

	public List<DureeMonth> getDureeStatistics() {
		return dureeStatistics;
	}

	public void setDureeStatistics(List<DureeMonth> dureeStatistics) {
		this.dureeStatistics = dureeStatistics;
	}

	public String getTauxActuel() {
		return tauxActuel;
	}

	public void setTauxActuel(String tauxActuel) {
		this.tauxActuel = tauxActuel;
	}
	
	
	
	
	
	
	
	
	
	
	
	

}
