package ma.net.munisys.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.PageActiviterEmployer;



public interface ActiviterEmployerBusiness {
	public ActiviterEmployer saveActiviterEmployer(ActiviterEmployer activiterEmployer);
	public PageActiviterEmployer listActivitesEmployer(int page, int size);
	public PageActiviterEmployer listActivitesEmployerByUser(String email,int page,int size);
	public void deleteActiviterEmployer(Long idActiviterEmployer);
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer);
	public List<ActiviterEmployer> findActiviterByUser(String email);
	public List<ActiviterEmployer> findAllActiviterEmployer();
	public List<ActiviterEmployer> findByUserUsernameIn(List<String> usersIdList);
	public Boolean checkActiviterValide(ActiviterEmployer activiterEmployer);
	public ActiviterEmployer getActiviterEmployer(Long id);
	
	public List<ActiviterEmployer>  findByDatesBetween(String email,Date nouvelleDateDebut, Date nouvelleDateFin);
	public int countActiviterEmployerByEmail(String email);
	public List<ActiviterEmployer>  findByDatesAfterBefore(String username,Date DateDebut,Date DateFin);
	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(String email,String client,Date DateDebut,Date DateFin);
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(String email,String nature,Date DateDebut, Date DateFin);
	public int countNatureActiviteEmp(String email);
	public int countClientActiviteEmp(String email);
	public int countTypeActiviteEmp(String email,String type);
	
}
