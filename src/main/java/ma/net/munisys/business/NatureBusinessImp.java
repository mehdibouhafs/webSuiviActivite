package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.NatureRepository;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageNatures;
import ma.net.munisys.entities.PageNatures;

@Service
public class NatureBusinessImp implements NatureBusiness {
	
	@Autowired
	private NatureRepository natureRepository;

	@Override
	public Nature saveNature(Nature nature) {
		natureRepository.save(nature);
		return null;
	}

	@Override
	public List<Nature> listNaturess() {
		// TODO Auto-generated method stub
		return natureRepository.findAll();
	}

	@Override
	public Nature updateNature(Long id, Nature nature) {
		// TODO Auto-generated method stub
		nature.setId(id);
		return natureRepository.save(nature);
	}

	@Override
	public PageNatures listNatures(int page, int size) {
		PageNatures pageNatures= new PageNatures();
		Page<Nature> pageNature = natureRepository.findNatures(new PageRequest(page-1, size));
		pageNatures.setNatures(pageNature.getContent());
		pageNatures.setNombreNatures(pageNature.getNumberOfElements());
		pageNatures.setPage(pageNature.getNumber());
		pageNatures.setTotalPages(pageNature.getTotalPages());
		pageNatures.setTotalNatures(pageNature.getTotalElements());
		return pageNatures;
	}

	@Override
	public List<Nature> findNaturesIn() {
		// TODO Auto-generated method stub
		return natureRepository.findNaturesIn();
	}

	@Override
	public List<Nature> findNaturesNotIn() {
		// TODO Auto-generated method stub
		return natureRepository.findNaturesNotIn();
	}

}
