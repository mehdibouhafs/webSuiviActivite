package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.ClientRepository;
import ma.net.munisys.dao.LieuRepository;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageLieux;

@Service
public class LieuBusinessImpl implements LieuBusiness {
	
	
	@Autowired
	private LieuRepository lieuRepository;

	@Override
	public Lieu saveLieu(Lieu lieu) {
		// TODO Auto-generated method stub
		return lieuRepository.save(lieu);
	}

	@Override
	public List<Lieu> listLieux() {
		// TODO Auto-generated method stub
		return lieuRepository.findAll();
	}

	@Override
	public Lieu updateLieu(Long id, Lieu lieu) {
		lieu.setId(id);
		return lieuRepository.save(lieu);
	}

	@Override
	public PageLieux listLieux(int page, int size) {
		PageLieux pageLieux= new PageLieux();
		Page<Lieu> pageLieu = lieuRepository.findLieux(new PageRequest(page-1, size));
		pageLieux.setLieux(pageLieu.getContent());
		pageLieux.setNombreLieux(pageLieu.getNumberOfElements());
		pageLieux.setPage(pageLieu.getNumber());
		pageLieux.setTotalPages(pageLieu.getTotalPages());
		pageLieux.setTotalLieux(pageLieu.getTotalElements());
		return pageLieux;
	}

}
