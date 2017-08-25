package ma.net.munisys.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.TauxUser;
import ma.net.munisys.entities.User;



public interface ActiviterEmployerBusiness {
	public ActiviterEmployer saveActiviterEmployer(ActiviterEmployer activiterEmployer);
	public List<ActiviterEmployer> listActivitesEmployer();
	public List<ActiviterEmployer> listActivitesEmployerByUser(String email);
	public void deleteActiviterEmployer(Long idActiviterEmployer);
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer);
	public List<ActiviterEmployer> findActiviterByUser(String email);
	public List<ActiviterEmployer> findAllActiviterEmployer();
	public List<ActiviterEmployer> findByUserUsernameIn(List<String> usersIdList);
	public Boolean checkActiviterValide(ActiviterEmployer activiterEmployer);
	public ActiviterEmployer getActiviterEmployer(Long id);
	
	public List<ActiviterEmployer>  findByDatesBetween(String email,Date nouvelleDateDebut, Date nouvelleDateFin);
	public int countActiviterEmployerByEmail(String email);

	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(String email,String client,Date DateDebut,Date DateFin);
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(String email,String nature,Date DateDebut, Date DateFin);
	
	

	
	

	
	
	public List<ActiviterEmployer> findActiviterByUserAfterBefore(String email,Date DateDebut,Date DateFin);
	
	
	
	public int countActiviterEmployerByClientEtDate(String email,String client,Date DateDebut,Date DateFin);

	public List<ActiviterEmployer> findActiviterByGroupe(Long codeGroupe);
	
	
	/** User Tableau de bord**/
	
	public int countNatureActiviteEmp(String email,String type,Date DateDebut,Date DateFin);
	public int countClientActiviteEmp(String email,String type,Date DateDebut,Date DateFin);
	public int countTypeActiviteEmp(String email,String type,Date DateDebut,Date DateFin);
	public List<Client> distinctClientForUser(String email,String type,Date DateDebut,Date DateFin);
	public List<Nature> distinctNatureForUser(String email,String type,Date DateDebut,Date DateFin);
	public List<ActiviterEmployer>  findByDatesAfterBefore(String username,String type,Date DateDebut,Date DateFin);
	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate(String email,String nature,String type,Date DateDebut,Date DateFin);
	public int countActiviterEmployerByEmailByClient(String email,String client,String type,Date DateDebut,Date DateFin);
	public int countActiviterEmployerByEmailByNature(String email,String nature,String type,Date DateDebut,Date DateFin);
	
	
	/*** Directeur requete ***/
		
	public int countNatureActiviteEmp2(String type,Date DateDebut,Date DateFin);

	public int countClientActiviteEmp2(String type,Date DateDebut,Date DateFin);
	
	public int countTypeActiviteEmp2(String type,Date DateDebut,Date DateFin);
	
	public List<Client> distinctClientForUser2(String type,Date DateDebut,Date DateFin);
	
	public List<Nature> distinctNatureForUser2(String type,Date DateDebut,Date DateFin);
	
	public List<ActiviterEmployer>  findByDatesAfterBefore2(String type,Date DateDebut, Date DateFin);

	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate2(String nature,String type,Date DateDebut,Date DateFin);
	
	public int countActiviterEmployerByEmailByClient2(String client,String type,Date DateDebut,Date DateFin);
	
	public int countActiviterEmployerByEmailByNature2(String nature,String type,Date DateDebut,Date DateFin);
	
	public List<User> distinctUserForUser2(String type,Date dateDebut,Date dateFin);
	
	
	public List<TauxUser> getStatisticUsers(Date dateDebut,Date dateFin);
}
