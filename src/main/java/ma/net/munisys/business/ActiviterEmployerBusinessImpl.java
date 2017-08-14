package ma.net.munisys.business;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.User;

@Service
public class ActiviterEmployerBusinessImpl implements ActiviterEmployerBusiness {
	
	@Autowired
	private ActiviterEmployerRepository activiterEmployerRepository;
	
	@Autowired
	private UserRepository userRepository;
	

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
			return activiterEmployerRepository.save(activiterEmployer);
		}
		
		
		return null;
		
	}
	
	

	@Override
	public PageActiviterEmployer listActivitesEmployer(int page, int size) {
		PageActiviterEmployer pageActiviterEmployer = new PageActiviterEmployer();
		Page<ActiviterEmployer> pageActiviterEmp = activiterEmployerRepository.findActiviterEmployer(new PageRequest(page-1, size));
		pageActiviterEmployer.setActivitesEmployers(pageActiviterEmp.getContent());
		pageActiviterEmployer.setNombreOperations(pageActiviterEmp.getNumberOfElements());
		pageActiviterEmployer.setPage(pageActiviterEmp.getNumber());
		pageActiviterEmployer.setTotalPages(pageActiviterEmp.getTotalPages());
		pageActiviterEmployer.setTotalActiviterEmployer(pageActiviterEmp.getTotalElements());
		return pageActiviterEmployer;
	}

	@Override
	public PageActiviterEmployer listActivitesEmployerByUser(String email,int page, int size) {
		//User user = userRepository.findOne(email);
		PageActiviterEmployer pageActiviterEmployer = new PageActiviterEmployer();
		Page<ActiviterEmployer> pageActiviterEmp = activiterEmployerRepository.findActiviterEmployer(email, new PageRequest(page-1, size));
		pageActiviterEmployer.setActivitesEmployers(pageActiviterEmp.getContent());
		pageActiviterEmployer.setNombreOperations(pageActiviterEmp.getNumberOfElements());
		pageActiviterEmployer.setPage(pageActiviterEmp.getNumber());
		pageActiviterEmployer.setTotalPages(pageActiviterEmp.getTotalPages());
		pageActiviterEmployer.setTotalActiviterEmployer(pageActiviterEmp.getTotalElements());
		return pageActiviterEmployer;
	}

	@Override
	public void deleteActiviterEmployer(Long idActiviterEmployer) {
		// TODO Auto-generated method stub
		 activiterEmployerRepository.deleteActiviterEmployer(idActiviterEmployer);
		
	}

	@Override
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer) {
		
		activiterEmployer.setId(idActiviterEmployer);
		List<ActiviterEmployer> activitesBetween = findByDatesBetween(activiterEmployer.getUser().getUsername(),activiterEmployer.getDateDebut(), activiterEmployer.getDateFin());
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		df.setTimeZone(TimeZone.getTimeZone("GMT"));
		System.out.println("Date pour teste " + df.format(activiterEmployer.getDateDebut()) + " Date Fin "+ df.format(activiterEmployer.getDateFin()));
		if(activitesBetween.size()>=1 && (activitesBetween.get(0).getId() != idActiviterEmployer)){
			System.out.println("TRouve !=null ");
			for(ActiviterEmployer acEmployer : activitesBetween){
				System.out.println(acEmployer.toString());
			}
			
		}else{
			
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
	public List<ActiviterEmployer> findByDatesAfterBefore(String username, Date DateDebut, Date DateFin) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.findByDatesAfterBefore(username, DateDebut, DateFin);
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
	public int countNatureActiviteEmp(String email) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countNatureActiviteEmp(email);
	}



	@Override
	public int countClientActiviteEmp(String email) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countClientActiviteEmp(email);
	}



	@Override
	public int countTypeActiviteEmp(String email, String type) {
		// TODO Auto-generated method stub
		return activiterEmployerRepository.countTypeActiviteEmp(email,type);
	}
	
}
