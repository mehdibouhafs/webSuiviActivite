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
	public void deleteActiviterEmployer(ActiviterEmployer activiterEmployer) {
		// TODO Auto-generated method stub
		 activiterEmployerRepository.delete(activiterEmployer);
	}

	@Override
	public ActiviterEmployer updateActiviteEmployer(Long idActiviterEmployer,ActiviterEmployer activiterEmployer) {
		activiterEmployer.setId(idActiviterEmployer);
		return activiterEmployerRepository.save(activiterEmployer);
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
	
}
