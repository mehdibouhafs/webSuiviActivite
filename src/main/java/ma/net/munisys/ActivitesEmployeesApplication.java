package ma.net.munisys;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import ma.net.munisys.business.ActiviterEmployerBusiness;
import ma.net.munisys.business.ActiviterEmployerBusinessImpl;
import ma.net.munisys.dao.ActiviterEmployerRepository;
import ma.net.munisys.dao.RoleRepository;
import ma.net.munisys.dao.UserRepository;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.User;

@SpringBootApplication
public class ActivitesEmployeesApplication {

	public static void main(String[] args) {
		ApplicationContext ctx=SpringApplication.run(ActivitesEmployeesApplication.class, args);
		
		UserRepository dao=ctx.getBean(UserRepository.class);
		RoleRepository dao1=ctx.getBean(RoleRepository.class);
		ActiviterEmployerRepository activiterEmployerRepository = ctx.getBean(ActiviterEmployerRepository.class);
		ActiviterEmployerBusiness activiterEmployerBusiness = new ActiviterEmployerBusinessImpl();
		
		// Ajouter quelques produits
		//dao.save(new Produit("TR342",540)); dao.save(new Produit("HR 4378",540)); dao.save(new Produit("AXL 123",540));
		// Consulter tous les produits
		System.out.println("------------------------");
		/*User u =  new User("a@b.c", "Mr Bouhafs Mehdi", "123");
		u.setActive(true);
		dao.save(u);*/
		
		
		/*List<Produit> prods=dao.findAll();
		for(Produit p:prods){ System.out.println(p.getDesignation()+"--"+p.getPrix()); } // Consulter un produit
		System.out.println("------------------------");
		Produit p=dao.findOne(2L);*/
		
		
		
		ActiviterEmployer activiterEmployer = new ActiviterEmployer();
		ActiviterEmployer activiterEmployer2 = new ActiviterEmployer();
		
 		
 		
		
		
		/*String s = "08/09/2017 13:00:21";
		String s2 = "08/09/2017 13:02:30";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        try
        {
            Date dateDebut = simpleDateFormat.parse(s);
            Date dateFin = simpleDateFormat.parse(s2);
            activiterEmployer.setDateDebut(dateDebut);
     		activiterEmployer.setDateFin(dateFin);
     		activiterEmployer.setDescProjet("TEST ");
     		User u = new User();
     		u.setUsername("a@b.c");
     		activiterEmployer.setUser(u);
           List<ActiviterEmployer> listes = activiterEmployerBusiness.findByDatesBetween(dateDebut, dateFin);
    		//activiterEmployerBusiness.saveActiviterEmployer(activiterEmployer);
    		
    		
    		activiterEmployer2.setDateDebut(dateDebut);
    		activiterEmployer2.setDateFin(dateFin);
    		activiterEmployer2.setDescProjet("TEST 2");
    		activiterEmployer2.setUser(u);
    		//activiterEmployerBusiness.saveActiviterEmployer(activiterEmployer2);
    		for(ActiviterEmployer e : listes){
    			System.out.println(e.toString());
    		}
    		
    	//System.out.println(activiterEmployerBusiness.findActiviterByUser("a@b.c"));
            
        }
        catch (ParseException ex)
        {
            System.out.println("Exception "+ex);
        }*/
		
		
		
		
		
		
	}
}
