package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.ClientRepository;
import ma.net.munisys.dao.LieuRepository;
import ma.net.munisys.dao.ProjetRepository;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.Projet;
import ma.net.munisys.entities.PageLieux;

@Service
public class ProjetBusinessImpl implements ProjetBusiness {
	
	
	@Autowired
	private ProjetRepository projetRepository;

	@Override
	public Projet saveProjet(Projet projet) {
		// TODO Auto-generated method stub
		return projetRepository.save(projet);
	}

	@Override
	public List<Projet> listProjet() {
		// TODO Auto-generated method stub
		return projetRepository.findAll();
	}

	@Override
	public Projet updateProjet(String id,Projet projet1) {
		System.out.println("lieu id "+ id);
		 projet1.setId(id);
		
		
		return projetRepository.save(projet1);
	}

	@Override
	public PageProjet listProjet(int page, int size) {
		PageProjet pageProjet= new PageProjet();
		Page<Projet> pageProjets = projetRepository.findProjet(new PageRequest(page-1, size));
		pageProjet.setProjet(pageProjets.getContent());
		pageProjet.setNombreProjet(pageProjets.getNumberOfElements());
		pageProjet.setPage(pageProjets.getNumber());
		pageProjet.setTotalPages(pageProjets.getTotalPages());
		pageProjet.setTotalProjet(pageProjets.getTotalElements());
		return pageProjet;
	}

	@Override
	public List<Projet> findProjetByClient(String codeClient, int tag) {
		return projetRepository.findProjetByClient(codeClient, tag);
	}

	@Override
	public List<Projet> findProjetByClient(int tag) {
		// TODO Auto-generated method stub
		return projetRepository.findProjetByClient(tag);
	}

	

}
