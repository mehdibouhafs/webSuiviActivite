package ma.net.munisys.business;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.ActiviterEmployerRepository;
import ma.net.munisys.dao.UserRepository;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.DureeMonth;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.TauxUser;
import ma.net.munisys.entities.User;

@Service
public class ActiviterEmployerBusinessImpl implements ActiviterEmployerBusiness {
	
	@Autowired
	private ActiviterEmployerRepository activiterEmployerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private DateExcludedBusiness dateExcludedBusiness;
	
	

	@Override
	public ActiviterEmployer saveActiviterEmployer(ActiviterEmployer activiterEmployer) {
		System.out.println("USER " + activiterEmployer.getUser().getUsername());
		List<ActiviterEmployer> activitesBetween = findByDatesBetween(activiterEmployer.getUser().getUsername(),activiterEmployer.getDateDebut(), activiterEmployer.getDateFin());
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		df.setTimeZone(TimeZone.getTimeZone("GMT"));
		System.out.println("Date pour teste " + df.format(activiterEmployer.getDateDebut()) + " Date Fin "+ df.format(activiterEmployer.getDateFin()));
		if(activitesBetween.size()>=1){
			System.out.println("TRouve !=null ");
			for(ActiviterEmployer acEmployer : activitesBetween){
				System.out.println(acEmployer.toString());
			}
			
		}else{
			
			/*System.out.println("Last Date DEbut " + activiterEmployer.getDateDebut());
			
			System.out.println("Last Date Fin " + activiterEmployer.getDateFin());
			
			Calendar calendar=Calendar.getInstance();
			calendar.setTime(activiterEmployer.getDateDebut());
			calendar.set(Calendar.SECOND,(calendar.get(Calendar.SECOND)-1));
			
			Calendar calendar1=Calendar.getInstance();
			calendar1.setTime(activiterEmployer.getDateFin());
			calendar1.set(Calendar.SECOND,(calendar.get(Calendar.SECOND)+1));
			
			activiterEmployer.setDateDebut(calendar.getTime());
			activiterEmployer.setDateFin(calendar1.getTime());
			   
			System.out.println("New Date DEbut " + activiterEmployer.getDateDebut());
			
			System.out.println("New Date Fin " + activiterEmployer.getDateFin());*/

			return activiterEmployerRepository.save(activiterEmployer);
		}
		
		
		return null;
		
	}
	
	

	@Override
	public List<ActiviterEmployer> listActivitesEmployer() {
		/*PageActiviterEmployer pageActiviterEmployer = new PageActiviterEmployer();
		Page<ActiviterEmployer> pageActiviterEmp = activiterEmployerRepository.findActiviterEmployer(new PageRequest(page-1, size));
		pageActiviterEmployer.setActivitesEmployers(pageActiviterEmp.getContent());
		pageActiviterEmployer.setNombreOperations(pageActiviterEmp.getNumberOfElements());
		pageActiviterEmployer.setPage(pageActiviterEmp.getNumber());
		pageActiviterEmployer.setTotalPages(pageActiviterEmp.getTotalPages());
		pageActiviterEmployer.setTotalActiviterEmployer(pageActiviterEmp.getTotalElements());*/
		return activiterEmployerRepository.findActiviterEmployer();
	}

	@Override
	public List<ActiviterEmployer> listActivitesEmployerByUser(String email) {
		//User user = userRepository.findOne(email);
		
		return activiterEmployerRepository.findActiviterEmployer(email);
		
	}

	@Override
	public void deleteActiviterEmployer(Long idActiviterEmployer) {
		// TODO Auto-generated method stub
		 activiterEmployerRepository.deleteActiviterEmployer(idActiviterEmployer);
		
	}

	@Override
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer) {
		
		System.out.println("id " + idActiviterEmployer);
		
		activiterEmployer.setId(idActiviterEmployer);
		List<ActiviterEmployer> activitesBetween = findByDatesBetween(activiterEmployer.getUser().getUsername(),activiterEmployer.getDateDebut(), activiterEmployer.getDateFin());
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		df.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		
		System.out.println("id liste "+ activitesBetween.get(0).getId()  + "id path " + idActiviterEmployer);
		if(activitesBetween.size()>=1 && (activitesBetween.get(0).getId() != idActiviterEmployer)){
			
			for(ActiviterEmployer acEmployer : activitesBetween){
				System.out.println(acEmployer.toString());
			}
			
		}else{
			//activiterEmployerRepository.deleteActiviterEmployer(idActiviterEmployer);
			//System.out.println("Activiter to save " + activiterEmployer.toString());
			return activiterEmployerRepository.save(activiterEmployer);
		}
		
		
		return null;
		
	}

	@Override
	public List<ActiviterEmployer> findActiviterByUser(String email) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterByUser(email);
	}

	@Override
	public List<ActiviterEmployer> findAllActiviterEmployer() {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findAll();
	}

	@Override
	public List<ActiviterEmployer> findByUserUsernameIn(List<String> usersUsernameList) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findByUserUsernameIn(usersUsernameList);
	}
	
	public List<ActiviterEmployer> findByDay(Date day){
		return null;
	}

	@Override
	public Boolean checkActiviterValide(ActiviterEmployer activiterEmployer) {
		// TODO Auto-generated method stub
		
		System.out.println("New Date Debut "+ activiterEmployer.getDateDebut());
		for(ActiviterEmployer activiterEmployer2 : findActiviterByUser(activiterEmployer.getUser().getUsername())){
			System.out.println("*************");
			System.out.println("debut = "+activiterEmployer2.getDateDebut()+" fin "+ activiterEmployer2.getDateFin());
			if(activiterEmployer.getDateDebut().after(activiterEmployer2.getDateDebut()) && activiterEmployer.getDateFin().before(activiterEmployer2.getDateFin())){
				System.out.println("Between");
				return false;
			}
		}
		return true;
	}



	@Override
	public List<ActiviterEmployer> findByDatesBetween(String email,Date nouvelleDateDebut, Date nouvelleDateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findByDatesBetween(email,nouvelleDateDebut, nouvelleDateFin);
	}



	@Override
	public ActiviterEmployer getActiviterEmployer(Long id) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterEmployer(id);
	}



	@Override
	public int countActiviterEmployerByEmail(String email) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countActiviterEmployerByEmail(email);
	}



	@Override
	public List<ActiviterEmployer> findByDatesAfterBefore(String username,String type, Date DateDebut, Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findByDatesAfterBefore(username,type,DateDebut, DateFin);
	}



	@Override
	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(String email, String client, Date DateDebut,
			Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterByUserAndClientAfterBefore(email, client, DateDebut, DateFin);
	}



	@Override
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(String email, String nature, Date DateDebut,
			Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterByUserAndNatureAfterBefore(email, nature, DateDebut, DateFin);
	}



	@Override
	public int countNatureActiviteEmp(String email,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countNatureActiviteEmp(email,type,dateDebut,dateFin);
	}



	@Override
	public int countClientActiviteEmp(String email,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countClientActiviteEmp(email,type,dateDebut,dateFin);
	}



	@Override
	public int countTypeActiviteEmp(String email, String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countTypeActiviteEmp(email,type,dateDebut,dateFin);
	}



	@Override
	public List<ActiviterEmployer> findActiviterByUserAfterBefore(String email, Date DateDebut, Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterByUserAfterBefore(email,"Réalisée",DateDebut, DateFin);
	}



	@Override
	public List<Client> distinctClientForUser(String email,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.distinctClientForUser(email, type,dateDebut,dateFin);
	}



	@Override
	public int countActiviterEmployerByClientEtDate(String email, String client, Date DateDebut, Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countActiviterEmployerByClientEtDate(email, client, DateDebut, DateFin);
	}



	@Override
	public int countActiviterEmployerByEmailByClient(String email, String client,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		
		return activiterEmployerRepository.countActiviterEmployerByEmailByClient(email, client,type);
	}



	@Override
	public int countActiviterEmployerByEmailByNature(String email, String nature,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countActiviterEmployerByEmailByNature(email, nature,type);
	}



	@Override
	public List<Nature> distinctNatureForUser(String email,String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.distinctNatureForUser(email,type,dateDebut,dateFin);
	}



	@Override
	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate(String email, String nature, String type,
			Date DateDebut, Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.activiterEmployerByEmailByNatureByDate(email, nature, type, DateDebut, DateFin);
	}



	@Override
	public List<ActiviterEmployer> findActiviterByGroupe(Long codeGroupe,String email) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findActiviterByGroupe(codeGroupe,email);
	}



	@Override
	public int countNatureActiviteEmp2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countNatureActiviteEmp2(type,dateDebut,dateFin);
	}



	@Override
	public int countClientActiviteEmp2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countClientActiviteEmp2(type,dateDebut,dateFin);
	}



	@Override
	public int countTypeActiviteEmp2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countTypeActiviteEmp2(type,dateDebut,dateFin);
	}



	@Override
	public List<Client> distinctClientForUser2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.distinctClientForUser2(type,dateDebut,dateFin);
	}



	@Override
	public List<Nature> distinctNatureForUser2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.distinctNatureForUser2(type,dateDebut,dateFin);
	}



	@Override
	public List<ActiviterEmployer> findByDatesAfterBefore2(String type, Date dateDebut, Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findByDatesAfterBefore2(type,dateDebut,dateFin);
	}



	@Override
	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate2(String nature, String type, Date dateDebut,
			Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.activiterEmployerByEmailByNatureByDate2(nature,type,dateDebut,dateFin);
	}



	@Override
	public int countActiviterEmployerByEmailByClient2(String client, String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countActiviterEmployerByEmailByClient2(client,type,dateDebut,dateFin);
	}



	@Override
	public int countActiviterEmployerByEmailByNature2(String nature, String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countActiviterEmployerByEmailByNature2(nature,type,dateDebut,dateFin);
	}



	@Override
	public List<User> distinctUserForUser2(String type,Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.distinctUserForUser2(type,dateDebut,dateFin);
	}



	@Override
	public List<TauxUser> getStatisticUsers(Date dateDebut,Date dateFin) {
		// TODO Auto-generated method stub
		List<TauxUser> tauxUsers  = new ArrayList<>();
		List<User> userActif = activiterEmployerRepository.distinctUserForUser2("Réalisée",dateDebut,dateFin);
		List<DateExcluded> dateExcluded =  dateExcludedBusiness.findByDatesBetween(dateDebut,dateFin);
		
		for(User user : userActif){
			TauxUser tauxUser = new TauxUser();
			
			List<ActiviterEmployer> actiThisDate = findByDatesAfterBefore(user.getUsername(),"Réalisée", dateDebut, dateFin);
			List<ActiviterEmployer> activiteEnConge = activiterEmployerByEmailByNatureByDate(user.getUsername(),"Congé","Réalisée",dateDebut,dateFin);
			List<String> dureeThisDate = new ArrayList<>();
			for(ActiviterEmployer activiterEmployer : actiThisDate){
				dureeThisDate.add(activiterEmployer.getDuree());
			}
			String dureeTotalThisDate = DureeMonth.sumDuree(dureeThisDate,"Duree Travaille Date");
			
			List<String> dureeCongeThisDate = new ArrayList<>();
			 
			for(ActiviterEmployer activiterEmployer : activiteEnConge){
				dureeCongeThisDate.add(activiterEmployer.getDuree());
			}
			String dureeTotalCongeThisDate = DureeMonth.sumDuree(dureeCongeThisDate,"Duree Conge This Date");
			
			Double a = DureeMonth.calculeDureeHoursMonth(dureeTotalThisDate,dateDebut,dateFin,dureeTotalCongeThisDate,dateExcluded.size());
			Double b = DureeMonth.calculeTempsMaxMonth(dureeTotalThisDate,dateDebut,dateFin,dureeTotalCongeThisDate,dateExcluded.size());
			tauxUser.setUser(user.getNom());
			tauxUser.setTaux(String.format("%.2f",a/b * 100)+"%");
			
			tauxUsers.add(tauxUser);
		}
		
		return tauxUsers;
	}
	
}
