package ma.net.munisys.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.PageActiviterEmployer;



public interface ActiviterEmployerBusiness {
	public ActiviterEmployer saveActiviterEmployer(ActiviterEmployer activiterEmployer);
	public PageActiviterEmployer listActivitesEmployer(int page, int size);
	public PageActiviterEmployer listActivitesEmployerByUser(String email,int page,int size);
	public void deleteActiviterEmployer(ActiviterEmployer activiterEmployer);
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer);
	public List<ActiviterEmployer> findActiviterByUser(String email);
	public List<ActiviterEmployer> findAllActiviterEmployer();
	public List<ActiviterEmployer> findByUserUsernameIn(List<String> usersIdList);
	public Boolean checkActiviterValide(ActiviterEmployer activiterEmployer);
	
	public List<ActiviterEmployer>  findByDatesBetween(String email,Date nouvelleDateDebut, Date nouvelleDateFin);
	
	
}
