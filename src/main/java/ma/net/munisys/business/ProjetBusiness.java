package ma.net.munisys.business;

import java.util.List;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Projet;

public interface ProjetBusiness {
	
	public Projet saveProjet(Projet projet);
	public List<Projet> listProjet();
	public Projet updateProjet(String id,String projet1);
	public PageProjet listProjet(int page, int size);

}
