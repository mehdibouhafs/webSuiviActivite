package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.business.LieuBusiness;
import ma.net.munisys.business.ProjetBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageClients;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.Projet;


@RestController
public class ProjetRestService {

	@Autowired
	private ProjetBusiness projetBusiness;
	
	
	@RequestMapping(value="/projetByClient",method = RequestMethod.GET)
	public List<Projet> findProjetByClient(@RequestParam(name="codeClient")String codeClient,@RequestParam(name="statutProjet")int statutProjet) {
		return projetBusiness.findProjetByClient(codeClient, statutProjet);
	}
	
	@RequestMapping(value="/projetByStatut",method = RequestMethod.GET)
	public List<Projet> findProjetByClient(@RequestParam(name="statutProjet")int statutProjet) {
		return projetBusiness.findProjetByClient(statutProjet);
	}


	@RequestMapping(value="/projet",method = RequestMethod.POST)
	public Projet saveProjet(@RequestBody Projet projet) {
		return projetBusiness.saveProjet(projet);
	}

	
	@RequestMapping(value="/projet1",method = RequestMethod.GET)
	public List<Projet> listProjets() {
		return projetBusiness.listProjet();
	}

	
	@RequestMapping(value="/chargerAllProjets",method = RequestMethod.GET)
	public PageProjet listClients(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return projetBusiness.listProjet(page, size);
	}

		
	
	@RequestMapping(value="/projete/{id}",method = RequestMethod.PUT)
	public Projet updateLieu2(@PathVariable(name="id")String id,@RequestBody Projet projet){
		
		return projetBusiness.updateProjet(id,projet);
	}
	
	
	
	
	
	 

	
}
