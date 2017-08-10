package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.VilleRepository;
import ma.net.munisys.entities.Ville;

@Service
public class VilleBusinessImpl implements VilleBusiness {
	
	
	@Autowired
	private VilleRepository villeRepository;

	@Override
	public Ville saveVille(Ville ville) {
		// TODO Auto-generated method stub
		return villeRepository.save(ville);
	}

	@Override
	public List<Ville> listVilles() {
		// TODO Auto-generated method stub
		return villeRepository.findAll();
	}

	

	@Override
	public Ville updateVille(Long id, Ville ville) {
		ville.setId(id);
		return villeRepository.save(ville);
	}

}
