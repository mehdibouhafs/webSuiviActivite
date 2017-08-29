package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ma.net.munisys.dao.SupportRepository;
import ma.net.munisys.entities.PageSupport;
import ma.net.munisys.entities.Support;


@Service
public class SupportBusinessImpl implements SupportBusiness {
	
	
	@Autowired
	private SupportRepository SupportRepository;

	@Override
	public Support saveSupport(Support Support) {
		// TODO Auto-generated method stub
		return SupportRepository.save(Support);
	}

	@Override
	public List<Support> listSupport() {
		// TODO Auto-generated method stub
		return SupportRepository.findAll();
	}

	@Override
	public Support updateSupport(String id,Support Support) {
		
		
		Support.setNumDemande(id);
		
		//lieu.setId(id);
		return SupportRepository.save(Support);
	}

	@Override
	public PageSupport listSupport(int page, int size) {
		PageSupport pageSupport= new PageSupport();
		Page<Support> pageSupports = SupportRepository.findSupport(new PageRequest(page-1, size));
		pageSupport.setsupport(pageSupports.getContent());
		pageSupport.setNombresupport(pageSupports.getNumberOfElements());
		pageSupport.setPage(pageSupports.getNumber());
		pageSupport.setTotalPages(pageSupports.getTotalPages());
		pageSupport.setTotalsupport(pageSupports.getTotalElements());
		return pageSupport;
	}

	@Override
	public Support findSupport(String numDemande) {
		// TODO Auto-generated method stub
		return SupportRepository.findSupport(numDemande);
	}



}
