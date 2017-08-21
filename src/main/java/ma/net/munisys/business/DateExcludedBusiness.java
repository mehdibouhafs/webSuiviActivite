package ma.net.munisys.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageDateExlcuded;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageProjet;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Projet;

public interface DateExcludedBusiness {
	
	public DateExcluded saveDateExcluded(DateExcluded dateExcluded);
	public List<DateExcluded> listDateExcluded();
	public List<DateExcluded> findByDatesBetween(Date nouvelleDateDebut, Date nouvelleDateFin);
	public DateExcluded updateDateExcluded(Date dateExcluded);
	public PageDateExlcuded listDateExcluded(int page, int size);
}
