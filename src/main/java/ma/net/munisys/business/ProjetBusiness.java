package ma.net.munisys.business;

import java.util.List;

import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Projet;

public interface ProjetBusiness {
	
	public Projet saveProjet(Projet projet);
	public List<Projet> listProjet();
	public Projet updateProjet(String id,Projet projet1);
	public PageProjet listProjet(int page, int size);
	
	public List<Projet> findProjetByClient(String codeClient,int tag);
	
	public List<Projet> findProjetByClient(int tag);


}
