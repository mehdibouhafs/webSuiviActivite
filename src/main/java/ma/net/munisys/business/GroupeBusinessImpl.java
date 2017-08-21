package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.GroupeRepository;
import ma.net.munisys.dao.VilleRepository;
import ma.net.munisys.entities.Groupe;
import ma.net.munisys.entities.Ville;

@Service
public class GroupeBusinessImpl implements GroupeBusiness {
	
	
	@Autowired
	private GroupeRepository groupeRepository;

	@Override
	public Groupe saveGroupe(Groupe groupe) {
		// TODO Auto-generated method stub
		return groupeRepository.save(groupe);
	}

	@Override
	public List<Groupe> listGroupes() {
		// TODO Auto-generated method stub
		return groupeRepository.findAll();
	}

	

	@Override
	public Groupe updateGroupe(Long codeGroupe, Groupe groupe) {
		groupe.setCodeGroupe(codeGroupe);;
		return groupeRepository.save(groupe);
	}

}
