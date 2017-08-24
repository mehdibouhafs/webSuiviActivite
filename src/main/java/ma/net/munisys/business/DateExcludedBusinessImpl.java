package ma.net.munisys.business;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import ma.net.munisys.dao.DateExcludedRepository;

import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.PageDateExlcuded;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.Projet;


@Service
public class DateExcludedBusinessImpl implements DateExcludedBusiness {
	
	
	@Autowired
	private DateExcludedRepository  dateExcludedRepository;

	

	@Override
	public DateExcluded saveDateExcluded(DateExcluded dateExcluded) {
		// TODO Auto-generated method stub
		
		
		return dateExcludedRepository.save(dateExcluded);
	}

	@Override
	public List<DateExcluded> listDateExcluded() {
		// TODO Auto-generated method stub
		return dateExcludedRepository.findAll();
	}

	@Override
	public List<DateExcluded> findByDatesBetween(Date nouvelleDateDebut, Date nouvelleDateFin) {
		// TODO Auto-generated method stub
		return dateExcludedRepository.findByDatesBetween(nouvelleDateDebut, nouvelleDateFin);
	}

	@Override
	public DateExcluded updateDateExcluded(Date lastDateExcluded,Date dateExcluded) {
		
		DateExcluded dateExcluded1 = dateExcludedRepository.findOne(lastDateExcluded);
		dateExcludedRepository.delete(dateExcluded1);
		
		DateExcluded dExcluded = new DateExcluded();
		dExcluded.setDateExcluded(dateExcluded);
		//lieu.setId(id);
		return dateExcludedRepository.save(dExcluded);
	}

	@Override
	public PageDateExlcuded listDateExcluded(int page, int size) {
		PageDateExlcuded pageDateExlcuded= new PageDateExlcuded();
		Page<DateExcluded> pageDateExlcudeds = dateExcludedRepository.findDateExcluded(new PageRequest(page-1, size));
		pageDateExlcuded.setProjet(pageDateExlcudeds.getContent());
		pageDateExlcuded.setNombreDateExlcuded(pageDateExlcudeds.getNumberOfElements());
		pageDateExlcuded.setPage(pageDateExlcudeds.getNumber());
		pageDateExlcuded.setTotalPages(pageDateExlcudeds.getTotalPages());
		pageDateExlcuded.setTotalDateExlcudeds(pageDateExlcudeds.getTotalElements());
		return pageDateExlcuded;
	}
	
	
	


	

}
