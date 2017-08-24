package ma.net.munisys.web;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ActiviterEmployerBusiness;
import ma.net.munisys.business.DateExcludedBusiness;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.ClientStatistics;
import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.DureeMonth;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.NatureStatistics;
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.Statistics;
import ma.net.munisys.entities.User;


@RestController
public class ActiviterEmployerRestService{

	@Autowired
	private ActiviterEmployerBusiness activiterEmployerBusiness;
	
	@Autowired
	private DateExcludedBusiness dateExcludedBusiness;

	@RequestMapping(value="/countActiviterEmployer",method = RequestMethod.GET)
	public Statistics countNatureActiviteEmp(@RequestParam(name="email") String email) {
		
		
		//System.out.println("Taille "+ distinctClientForUsers);

		Date dt = getFirstDateBeforeOneMonth(new Date());
				
		/*	Date dt=	new Date();
		Calendar c = Calendar.getInstance(); 
		c.setTime(dt); 
		//c.add(Calendar.MONTH, -1);
		c.set(Calendar.DAY_OF_MONTH, 1); 
		dt = c.getTime();*/
		
		
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		String dateDebut1 = df.format(dt);
		//System.out.println("Date debut dt " + dateDebut1 + " Date Fin  " + df.format(new Date()));

		Date dt1 = getFirstDateBeforeOneMonth(dt);
		/*Date dt1 = dt;
		Calendar c2 = Calendar.getInstance();
		c2.setTime(dt1);
		c2.add(Calendar.MONTH, -1);
		dt1 = c2.getTime();*/
		
		//System.out.println("Date debut dt1 " + df.format(dt1) + " Date Fin 1 " + df.format(dt));
		Date dt2= getFirstDateBeforeOneMonth(dt1);
		/*Date dt2 = dt1;
		Calendar c3 = Calendar.getInstance();
		c3.setTime(dt1);
		c3.add(Calendar.MONTH, -1);
		dt2 = c3.getTime();*/
		
		//System.out.println("Date debut dt2 " + df.format(dt2) + " Date Fin 2 " + df.format(dt1));
		
		Date dt3 = getFirstDateBeforeOneMonth(dt2);
		/*Date dt3 = dt2;
		Calendar c4 = Calendar.getInstance();
		c4.setTime(dt2);
		c4.add(Calendar.MONTH, -1);
		dt3 = c4.getTime();*/
		//Frist Day
		int nbNature =  activiterEmployerBusiness.countNatureActiviteEmp(email,"Réaliser",dt, getDatePlusOne(new Date()));
		int nbClient = activiterEmployerBusiness.countClientActiviteEmp(email,"Réaliser",dt, getDatePlusOne(new Date()));
		
		List<Client> distinctClientForUsers = activiterEmployerBusiness.distinctClientForUser(email,"Réaliser",dt, getDatePlusOne(new Date()));
		List<Nature> distinctNatureForUsers = activiterEmployerBusiness.distinctNatureForUser(email,"Réaliser",dt, getDatePlusOne(new Date()));
		int nbActiviterRealiser = activiterEmployerBusiness.countTypeActiviteEmp(email, "Réaliser",dt, getDatePlusOne(new Date()));
		int nbActiviterPlannifier = activiterEmployerBusiness.countTypeActiviteEmp(email, "Planifier",dt, getDatePlusOne(new Date()));
				
				List<ActiviterEmployer> actiThisMonth = activiterEmployerBusiness.findByDatesAfterBefore(email,"Réaliser", dt, getDatePlusOne(new Date()));
				List<ActiviterEmployer> actiLastMonth = activiterEmployerBusiness.findByDatesAfterBefore(email,"Réaliser",dt1, dt);
				List<ActiviterEmployer> actiLastLastMonth = activiterEmployerBusiness.findByDatesAfterBefore(email,"Réaliser", dt2, dt1);
				List<ActiviterEmployer> actiLasLasttMonth = activiterEmployerBusiness.findByDatesAfterBefore(email,"Réaliser", dt3, dt2);
				
				
				List<String> dureeThisMonth = new ArrayList<>();
				List<String> dureeLastMonth = new ArrayList<>();
				List<String> dureeLaseLastsMonth = new ArrayList<>();
				
				
				for(ActiviterEmployer activiterEmployer : actiThisMonth){
					dureeThisMonth.add(activiterEmployer.getDuree());
				}
				
				for(ActiviterEmployer activiterEmployer : actiLastMonth){
					dureeLastMonth.add(activiterEmployer.getDuree());
				}
				
				for(ActiviterEmployer activiterEmployer : actiLastLastMonth){
					dureeLaseLastsMonth.add(activiterEmployer.getDuree());
				}
				
				
				System.out.println("Activite Travaille ce mois " + dureeThisMonth);
				System.out.println("Activite Travaille  mois precedant  " + dureeThisMonth);
				System.out.println("Activite Travaille mois precedant precedant " + dureeLaseLastsMonth);
				String dureeMonth1 = DureeMonth.sumDuree(dureeThisMonth,"Duree Travaille This month");
				String dureeMonth2 = DureeMonth.sumDuree(dureeLastMonth,"Duree Travaille last month");
				String dureeMonth3 = DureeMonth.sumDuree(dureeLaseLastsMonth,"Duree Travaille last last month");
				
				Date dt4 = getFirstDateMineOne(new Date());
						
				/*Date dt4 =	new Date();
				Calendar c5 = Calendar.getInstance();
				c5.setTime(dt4);
				c5.set(Calendar.DAY_OF_MONTH, 1);
				c5.add(Calendar.DAY_OF_WEEK, -1);
				dt4 = c5.getTime();*/
				
				Date dt5 = getDatePlusOne(new Date());
				/*
				Date dt5 = new Date();
				Calendar c6 = Calendar.getInstance();
				c6.setTime(dt5);
				
				c6.add(Calendar.DAY_OF_WEEK, 1);
				dt5 = c6.getTime();*/
				
				
				
				System.out.println("DT4 " +dt4);
				System.out.println("DT5 " +dt5);
				List<ActiviterEmployer> activiteEnConge = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate(email,"Congé","Réaliser",dt4,getDatePlusOne(dt5));
				List<ActiviterEmployer> activiteEnConge2 = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate(email,"Congé","Réaliser",getFirstDateMineOne(dt4),getDatePlusOne(dt4));
				List<ActiviterEmployer> activiteEnConge3 = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate(email,"Congé","Réaliser",getFirstDateMineOne(dt5),getDatePlusOne(dt5));
				if(activiteEnConge!=null){
					System.out.println("Activite Congé" + activiteEnConge);
				}
				
				List<String> dureeCongeThisMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge){
					dureeCongeThisMonth.add(activiterEmployer.getDuree());
				}
				
				
				List<String> dureeCongeLastMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge2){
					dureeCongeLastMonth.add(activiterEmployer.getDuree());
				}
				
				List<String> dureeCongeLaseLastsMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge3){
					dureeCongeLaseLastsMonth.add(activiterEmployer.getDuree());
				}
				
				String dureeCongeMonth1 = DureeMonth.sumDuree(dureeCongeThisMonth,"Duree Conge This Month");
				String dureeCongeMonth2 = DureeMonth.sumDuree(dureeCongeLastMonth,"Duree Conge Last Month");
				String dureeCongeMonth3  = DureeMonth.sumDuree(dureeCongeLaseLastsMonth,"Duree Conge Last Last Month");
				
				
				
				
				System.out.println("Durrée conge this month " + dureeCongeMonth1);
				
				
				List<DateExcluded> dates =  dateExcludedBusiness.findByDatesBetween(dt,new Date());
				System.out.println(dates);
				
				
				
				/*System.out.println("this Month " + actiThisMonth.size());
				System.out.println("Last Month " + actiLastMonth.size());
				System.out.println("Last Last Month " + actiLastLastMonth.size());
				System.out.println("Last Lastt Month " + actiLasLasttMonth.size());*/
				
				Statistics statistics = new Statistics(nbActiviterRealiser, nbActiviterPlannifier, nbClient, nbNature);
				
		
		for(Client e :distinctClientForUsers){
			ClientStatistics clientStatistics = new ClientStatistics();
			clientStatistics.setClient(e.getClient());
			//clientStatistics.setNbInterventionMonth(activiterEmployerBusiness.countActiviterEmployerByClientEtDate(email, e.getClient(), dt, new Date()));
			clientStatistics.setMonth("month3");
			clientStatistics.setNbInterventions1(activiterEmployerBusiness.countActiviterEmployerByEmailByClient(email,e.getClient(),"Réaliser",dt, new Date()));
			statistics.getClientStatistics().add(clientStatistics);
		}
		
		for(Nature e :distinctNatureForUsers){
			NatureStatistics natureStatistics = new NatureStatistics();
			natureStatistics.setNature(e.getNature());
			//clientStatistics.setNbInterventionMonth(activiterEmployerBusiness.countActiviterEmployerByClientEtDate(email, e.getClient(), dt, new Date()));
			natureStatistics.setMonth("month00");
			natureStatistics.setNbInterventionsNature(activiterEmployerBusiness.countActiviterEmployerByEmailByNature(email,e.getNature(),"Réaliser",dt, new Date()));
			statistics.getNatureStatistics().add(natureStatistics);
		}
		
		
		statistics.setNbInterventionMois4(actiThisMonth.size());
		statistics.setNbInterventionMois3(actiLastMonth.size());
		statistics.setNbInterventionMois2(actiLastLastMonth.size());
		statistics.setNbInterventionMois1(actiLasLasttMonth.size());
		
		
		Double a = DureeMonth.calculeDureeHoursMonth(dureeMonth1,dt4,new Date(),dureeCongeMonth1,dates.size());
		Double b = DureeMonth.calculeTempsMaxMonth(dureeMonth1,dt4,new Date(),dureeCongeMonth1,dates.size());
		statistics.setTauxActuel(String.format("%.2f",a/b * 100));
		
		DureeMonth dureeMonth = new DureeMonth();
		dureeMonth.setNbhoursMonth(a);
		dureeMonth.setTaux(b);
		statistics.getDureeStatistics().add(dureeMonth);
		
		DureeMonth dureeMonth11 = new DureeMonth();
		Date dt6 = getFirstDateMineOne(dt4);
		dureeMonth11.setNbhoursMonth(DureeMonth.calculeDureeHoursMonth(dureeMonth2,getFirstDateMineOne(dt4),dt4,dureeCongeMonth1,dates.size()));
		dureeMonth11.setTaux(DureeMonth.calculeTempsMaxMonth(dureeMonth2,getFirstDateMineOne(dt4),dt4,dureeCongeMonth2,dates.size()));
		statistics.getDureeStatistics().add(dureeMonth11);
		
		DureeMonth dureeMonth22 = new DureeMonth();
		dureeMonth22.setNbhoursMonth(DureeMonth.calculeDureeHoursMonth(dureeMonth3,getFirstDateMineOne(dt6),dt6,dureeCongeMonth1,dates.size()));
		dureeMonth22.setTaux(DureeMonth.calculeTempsMaxMonth(dureeMonth3,getFirstDateMineOne(dt6),dt6,dureeCongeMonth3,dates.size()));
		statistics.getDureeStatistics().add(dureeMonth22);
		
		
		
		return statistics;
	}
	
	
	
	
	
	@RequestMapping(value="/countActiviterEmployer2",method = RequestMethod.GET)
	public Statistics countNatureActiviteEmp2() {
		
		
		//System.out.println("Taille "+ distinctClientForUsers);
		
		
		
		Date dt = getFirstDateBeforeOneMonth(new Date());
				
		/*	Date dt=	new Date();
		Calendar c = Calendar.getInstance(); 
		c.setTime(dt); 
		//c.add(Calendar.MONTH, -1);
		c.set(Calendar.DAY_OF_MONTH, 1); 
		dt = c.getTime();*/
		
		
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		String dateDebut1 = df.format(dt);
		//System.out.println("Date debut dt " + dateDebut1 + " Date Fin  " + df.format(new Date()));

		Date dt1 = getFirstDateBeforeOneMonth(dt);
		/*Date dt1 = dt;
		Calendar c2 = Calendar.getInstance();
		c2.setTime(dt1);
		c2.add(Calendar.MONTH, -1);
		dt1 = c2.getTime();*/
		
		//System.out.println("Date debut dt1 " + df.format(dt1) + " Date Fin 1 " + df.format(dt));
		Date dt2= getFirstDateBeforeOneMonth(dt1);
		/*Date dt2 = dt1;
		Calendar c3 = Calendar.getInstance();
		c3.setTime(dt1);
		c3.add(Calendar.MONTH, -1);
		dt2 = c3.getTime();*/
		
		//System.out.println("Date debut dt2 " + df.format(dt2) + " Date Fin 2 " + df.format(dt1));
		
		Date dt3 = getFirstDateBeforeOneMonth(dt2);
		/*Date dt3 = dt2;
		Calendar c4 = Calendar.getInstance();
		c4.setTime(dt2);
		c4.add(Calendar.MONTH, -1);
		dt3 = c4.getTime();*/
		//Frist Day
		int nbNature =  activiterEmployerBusiness.countNatureActiviteEmp2("Réaliser", dt, getDatePlusOne(new Date()));
		int nbClient = activiterEmployerBusiness.countClientActiviteEmp2("Réaliser", dt, getDatePlusOne(new Date()));
		int nbActiviterRealiser = activiterEmployerBusiness.countTypeActiviteEmp2("Réaliser", dt, getDatePlusOne(new Date()));
		int nbActiviterPlannifier = activiterEmployerBusiness.countTypeActiviteEmp2("Planifier", dt, getDatePlusOne(new Date()));
		List<Client> distinctClientForUsers = activiterEmployerBusiness.distinctClientForUser2("Réaliser", dt, getDatePlusOne(new Date()));
		List<Nature> distinctNatureForUsers = activiterEmployerBusiness.distinctNatureForUser2("Réaliser", dt, getDatePlusOne(new Date()));
				List<ActiviterEmployer> actiThisMonth = activiterEmployerBusiness.findByDatesAfterBefore2("Réaliser", dt, getDatePlusOne(new Date()));
				List<ActiviterEmployer> actiLastMonth = activiterEmployerBusiness.findByDatesAfterBefore2("Réaliser",dt1, dt);
				List<ActiviterEmployer> actiLastLastMonth = activiterEmployerBusiness.findByDatesAfterBefore2("Réaliser", dt2, dt1);
				List<ActiviterEmployer> actiLasLasttMonth = activiterEmployerBusiness.findByDatesAfterBefore2("Réaliser", dt3, dt2);
				
				
				List<String> dureeThisMonth = new ArrayList<>();
				List<String> dureeLastMonth = new ArrayList<>();
				List<String> dureeLaseLastsMonth = new ArrayList<>();
				
				System.out.println("Activiti taille This month " + actiThisMonth.size() + " value = " +actiThisMonth.toString() );
				System.out.println("Day Start " + dt);
				System.out.println("Day end " + getDatePlusOne(new Date()));
				
				for(ActiviterEmployer activiterEmployer : actiThisMonth){
					dureeThisMonth.add(activiterEmployer.getDuree());
				}
				
				for(ActiviterEmployer activiterEmployer : actiLastMonth){
					dureeLastMonth.add(activiterEmployer.getDuree());
				}
				
				for(ActiviterEmployer activiterEmployer : actiLastLastMonth){
					dureeLaseLastsMonth.add(activiterEmployer.getDuree());
				}
				
				
				System.out.println("Activite Travaille ce mois " + dureeThisMonth);
				System.out.println("Activite Travaille  mois precedant  " + dureeThisMonth);
				System.out.println("Activite Travaille mois precedant precedant " + dureeLaseLastsMonth);
				String dureeMonth1 = DureeMonth.sumDuree(dureeThisMonth,"Duree Travaille This month");
				String dureeMonth2 = DureeMonth.sumDuree(dureeLastMonth,"Duree Travaille last month");
				String dureeMonth3 = DureeMonth.sumDuree(dureeLaseLastsMonth,"Duree Travaille last last month");
				
				Date dt4 = getFirstDateMineOne(new Date());
						
				/*Date dt4 =	new Date();
				Calendar c5 = Calendar.getInstance();
				c5.setTime(dt4);
				c5.set(Calendar.DAY_OF_MONTH, 1);
				c5.add(Calendar.DAY_OF_WEEK, -1);
				dt4 = c5.getTime();*/
				
				Date dt5 = getDatePlusOne(new Date());
				/*
				Date dt5 = new Date();
				Calendar c6 = Calendar.getInstance();
				c6.setTime(dt5);
				
				c6.add(Calendar.DAY_OF_WEEK, 1);
				dt5 = c6.getTime();*/
				
				
				
				System.out.println("DT4 " +dt4);
				System.out.println("DT5 " +dt5);
				List<ActiviterEmployer> activiteEnConge = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate2("Congé","Réaliser",dt4,getDatePlusOne(dt5));
				List<ActiviterEmployer> activiteEnConge2 = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate2("Congé","Réaliser",getFirstDateMineOne(dt4),getDatePlusOne(dt4));
				List<ActiviterEmployer> activiteEnConge3 = activiterEmployerBusiness.activiterEmployerByEmailByNatureByDate2("Congé","Réaliser",getFirstDateMineOne(dt5),getDatePlusOne(dt5));
				if(activiteEnConge!=null){
					System.out.println("Activite Congé" + activiteEnConge);
				}
				
				List<String> dureeCongeThisMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge){
					dureeCongeThisMonth.add(activiterEmployer.getDuree());
				}
				
				
				List<String> dureeCongeLastMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge2){
					dureeCongeLastMonth.add(activiterEmployer.getDuree());
				}
				
				List<String> dureeCongeLaseLastsMonth = new ArrayList<>();
				 
				for(ActiviterEmployer activiterEmployer : activiteEnConge3){
					dureeCongeLaseLastsMonth.add(activiterEmployer.getDuree());
				}
				
				String dureeCongeMonth1 = DureeMonth.sumDuree(dureeCongeThisMonth,"Duree Conge This Month");
				String dureeCongeMonth2 = DureeMonth.sumDuree(dureeCongeLastMonth,"Duree Conge Last Month");
				String dureeCongeMonth3  = DureeMonth.sumDuree(dureeCongeLaseLastsMonth,"Duree Conge Last Last Month");
				
				
				
				
				System.out.println("Durrée conge this month " + dureeCongeMonth1);
				
				
				List<DateExcluded> dates =  dateExcludedBusiness.findByDatesBetween(dt,new Date());
				System.out.println(dates);
				
				
				
				/*System.out.println("this Month " + actiThisMonth.size());
				System.out.println("Last Month " + actiLastMonth.size());
				System.out.println("Last Last Month " + actiLastLastMonth.size());
				System.out.println("Last Lastt Month " + actiLasLasttMonth.size());*/
				
				
				List<User> userActif = activiterEmployerBusiness.distinctUserForUser2("Réaliser",dt, getDatePlusOne(new Date()));
				
				Statistics statistics = new Statistics(nbActiviterRealiser, nbActiviterPlannifier, nbClient, nbNature);
				Double taux = DureeMonth.calculeTaux(dureeMonth1,dt4,new Date(),dureeCongeMonth1,dates.size());
				Double res = taux / userActif.size();
				statistics.setTauxActuel(String.format("%.2f",res));
		
		for(Client e :distinctClientForUsers){
			ClientStatistics clientStatistics = new ClientStatistics();
			clientStatistics.setClient(e.getClient());
			//clientStatistics.setNbInterventionMonth(activiterEmployerBusiness.countActiviterEmployerByClientEtDate(email, e.getClient(), dt, new Date()));
			clientStatistics.setMonth("month3");
			clientStatistics.setNbInterventions1(activiterEmployerBusiness.countActiviterEmployerByEmailByClient2(e.getClient(),"Réaliser",dt4,new Date()));
			statistics.getClientStatistics().add(clientStatistics);
		}
		
		for(Nature e :distinctNatureForUsers){
			NatureStatistics natureStatistics = new NatureStatistics();
			natureStatistics.setNature(e.getNature());
			//clientStatistics.setNbInterventionMonth(activiterEmployerBusiness.countActiviterEmployerByClientEtDate(email, e.getClient(), dt, new Date()));
			natureStatistics.setMonth("month00");
			natureStatistics.setNbInterventionsNature(activiterEmployerBusiness.countActiviterEmployerByEmailByNature2(e.getNature(),"Réaliser",dt4,new Date()));
			statistics.getNatureStatistics().add(natureStatistics);
		}
		
		
		statistics.setNbInterventionMois4(actiThisMonth.size());
		statistics.setNbInterventionMois3(actiLastMonth.size());
		statistics.setNbInterventionMois2(actiLastLastMonth.size());
		statistics.setNbInterventionMois1(actiLasLasttMonth.size());
		
		List<User> userActif1 = activiterEmployerBusiness.distinctUserForUser2("Réaliser",getFirstDateMineOne(dt4), dt4);//mois2
		
		
		
		Double a = DureeMonth.calculeDureeHoursMonth(dureeMonth1,dt4,new Date(),dureeCongeMonth1,dates.size());
		Double b = DureeMonth.calculeTempsMaxMonth(dureeMonth1,dt4,new Date(),dureeCongeMonth1,dates.size());
		statistics.setTauxActuel(String.format("%.2f",a/b/userActif.size() * 100));
		
		DureeMonth dureeMonth = new DureeMonth();
		if(userActif.size()>0){
		dureeMonth.setNbhoursMonth(a/userActif.size());
		}else{
			dureeMonth.setNbhoursMonth(0);
		}
		dureeMonth.setTaux(b);
		statistics.getDureeStatistics().add(dureeMonth);
		
		DureeMonth dureeMonth11 = new DureeMonth();
		Date dt6 = getFirstDateMineOne(dt4);
		Double nbH = DureeMonth.calculeDureeHoursMonth(dureeMonth2,getFirstDateMineOne(dt4),dt4,dureeCongeMonth1,dates.size());
		if(userActif1.size()>0){
		dureeMonth11.setNbhoursMonth(nbH /userActif1.size());
		}else{
			dureeMonth11.setNbhoursMonth(0);
		}
		dureeMonth11.setTaux(DureeMonth.calculeTempsMaxMonth(dureeMonth2,getFirstDateMineOne(dt4),dt4,dureeCongeMonth2,dates.size()));
		statistics.getDureeStatistics().add(dureeMonth11);
		
		List<User> userActif2 = activiterEmployerBusiness.distinctUserForUser2("Réaliser",getFirstDateMineOne(dt6),dt6);//month3
		
		
		DureeMonth dureeMonth22 = new DureeMonth();
		if(userActif2.size()>2){
			Double nbH2 = DureeMonth.calculeDureeHoursMonth(dureeMonth3,getFirstDateMineOne(dt6),dt6,dureeCongeMonth1,dates.size());
		dureeMonth22.setNbhoursMonth(nbH2 / userActif2.size());
		}else{
			dureeMonth22.setNbhoursMonth(0);
		}
		
		dureeMonth22.setTaux(DureeMonth.calculeTempsMaxMonth(dureeMonth3,getFirstDateMineOne(dt6),dt6,dureeCongeMonth3,dates.size()));
		
		
		
		statistics.getDureeStatistics().add(dureeMonth22);
		
		return statistics;
		
	}

	
	@RequestMapping(value="/ActiviterEmployerClientByDate",method = RequestMethod.GET)
	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(@RequestParam(name="email") String email,@RequestParam(name="client")  String client,@RequestParam(name="dateDebut")  String dateDebut,
			@RequestParam(name="dateFin")  String dateFin) {
		try {
	        DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
	        Date dateDebut1 = df.parse(dateDebut);
	        Date dateFin1 = df.parse(dateFin);
	        return activiterEmployerBusiness.findActiviterByUserAndClientAfterBefore(email, client, dateDebut1, dateFin1);
	    } catch (ParseException e) {
	        //WebApplicationException ...("Date format should be yyyy-MM-dd'T'HH:mm:ss", Status.BAD_REQUEST);
	    }
		return null;
		
	}

	@RequestMapping(value="/ActiviterEmployerNatureByDate",method = RequestMethod.GET)
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(@RequestParam(name="email") String email,@RequestParam(name="nature") String nature,@RequestParam(name="dateDebut")  String dateDebut,
			@RequestParam(name="dateFin") String dateFin) {
		try {
	        DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
	        Date dateDebut1 = df.parse(dateDebut);
	        Date dateFin1 = df.parse(dateFin);
	        return activiterEmployerBusiness.findActiviterByUserAndNatureAfterBefore(email, nature, dateDebut1, dateFin1);
		 	} catch (ParseException e) {
		        //WebApplicationException ...("Date format should be yyyy-MM-dd'T'HH:mm:ss", Status.BAD_REQUEST);
		    }
			return null;
		
		}

	@RequestMapping(value="/ActivitesEmploye",method = RequestMethod.GET)
	public ActiviterEmployer getActiviterEmployer(@RequestParam(name="id")Long id) {
		return activiterEmployerBusiness.getActiviterEmployer(id);
	}
	
	@RequestMapping(value="/ActivitesEmployeGroupe",method = RequestMethod.GET)
	public List<ActiviterEmployer> findActiviterByGroupe(@RequestParam(name="codeGroupe")Long codeGroupe) {
		return activiterEmployerBusiness.findActiviterByGroupe(codeGroupe);
	}

	@RequestMapping(value="/ActivitesEmployer",method = RequestMethod.POST)
	public ActiviterEmployer saveActiviterEmployer(@RequestBody ActiviterEmployer activiterEmployer) {
		 DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		System.out.println("Date Debut" + df.format(activiterEmployer.getDateDebut()));
		System.out.println("Date Fin" + df.format(activiterEmployer.getDateFin()));
		return activiterEmployerBusiness.saveActiviterEmployer(activiterEmployer);
	}
	
	
	
	@RequestMapping(value="/ActivitesEmployers",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployer() {
		return activiterEmployerBusiness.findAllActiviterEmployer();
	}
	
	@RequestMapping(value="/ActivitesEmployersFiltred/{emailsId}",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployer(@PathVariable String[] emailsId) {	
		return activiterEmployerBusiness.findByUserUsernameIn(Arrays.asList(emailsId));
	}
	


	
	
	@RequestMapping(value="/ActivitesEmployerAllByMail",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployerByUser(@RequestParam(name="email")String email) {
		return activiterEmployerBusiness.findActiviterByUser(email);
	}

	@RequestMapping(value="/ActivitesEmployer/{activiteID}",method = RequestMethod.DELETE)
	public void deleteActiviterEmployer(@PathVariable(name="activiteID") Long id) {
		activiterEmployerBusiness.deleteActiviterEmployer(id);
	}
	
	

	@RequestMapping(value="/ActivitesEmployer/{idActiviterEmployer}",method = RequestMethod.PUT)
	public void updateActiviteEmployer(@PathVariable(name="idActiviterEmployer")Long idActiviterEmployer, @RequestBody ActiviterEmployer activiterEmployer) {
		activiterEmployerBusiness.updateActiviteEmployer(idActiviterEmployer,activiterEmployer);
	}
	
	

	
	/*
	@RequestMapping(value="/getLoggedUser")
	public Map<String, Object> getLoggedUser(HttpServletRequest httpServletRequest){
		HttpSession httpSession = httpServletRequest.getSession();
		SecurityContext securityContext = (SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username = securityContext.getAuthentication().getName();
		List<String> roles = new ArrayList<>();
		for(GrantedAuthority g : securityContext.getAuthentication().getAuthorities()){
			roles.add(g.getAuthority());
		}
		Map<String,Object> params = new HashMap<>();
		params.put("username", username);
		params.put("roles", roles);
		return params;
		
	}*/
	
	public Date getFirstDate(Date date){
		Date dt4 = date;
		Calendar c5 = Calendar.getInstance();
		c5.setTime(dt4);
		c5.set(Calendar.DAY_OF_MONTH, 1);
		
		dt4 = c5.getTime();
		return dt4;
	}
	
	public Date getFirstDateMineOne(Date date){
		Date dt4 = date;
		Calendar c5 = Calendar.getInstance();
		c5.setTime(dt4);
		c5.set(Calendar.DAY_OF_MONTH, 1);
		c5.add(Calendar.DAY_OF_WEEK, -1);
		dt4 = c5.getTime();
		return dt4;
	}
	
	public Date getFirstDatePlusOne(Date date){
		Date dt4 = date;
		Calendar c5 = Calendar.getInstance();
		c5.setTime(dt4);
		c5.set(Calendar.DAY_OF_MONTH, 1);
		c5.add(Calendar.DAY_OF_WEEK, 1);
		dt4 = c5.getTime();
		return dt4;
	}
	
	public Date getDatePlusOne(Date date){
		Date dt4 = date;
		Calendar c5 = Calendar.getInstance();
		c5.setTime(dt4);
		c5.add(Calendar.DAY_OF_WEEK, 1);
		dt4 = c5.getTime();
		return dt4;
	}
	
	public Date getDateMineOne(Date date){
		Date dt4 = date;
		Calendar c5 = Calendar.getInstance();
		c5.setTime(dt4);
		c5.add(Calendar.DAY_OF_WEEK, -1);
		dt4 = c5.getTime();
		return dt4;
	}
	
	public Date getFirstDateBeforeOneMonth(Date date){
		Date dt=	date;
		Calendar c = Calendar.getInstance(); 
		c.setTime(dt); 
		//c.add(Calendar.MONTH, -1);
		c.set(Calendar.DAY_OF_MONTH, 1); 
		dt = c.getTime();
		return dt;
	}
	
}
