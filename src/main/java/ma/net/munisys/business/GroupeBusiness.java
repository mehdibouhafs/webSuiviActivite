package ma.net.munisys.business;

import java.util.List;

import ma.net.munisys.entities.Groupe;
import ma.net.munisys.entities.User;


public interface GroupeBusiness {
	
	public Groupe saveGroupe(Groupe groupe);
	public List<Groupe> listGroupes();
	public Groupe updateGroupe(Long idGroupe, Groupe groupe);
	
	

}
