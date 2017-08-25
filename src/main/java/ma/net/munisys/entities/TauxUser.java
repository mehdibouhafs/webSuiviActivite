package ma.net.munisys.entities;

import java.io.Serializable;

public class TauxUser implements Serializable {
	
	private String userName;
	private String taux;
	
	public TauxUser() {
		// TODO Auto-generated constructor stub
	}

	public String getUser() {
		return userName;
	}

	public void setUser(String userName) {
		this.userName = userName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTaux() {
		return taux;
	}

	public void setTaux(String taux) {
		this.taux = taux;
	}

	
	
	
	
	

}
