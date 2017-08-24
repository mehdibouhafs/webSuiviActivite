package ma.net.munisys.web;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ma.net.munisys.business.DateExcludedBusiness;
import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.PageDateExlcuded;



@RestController
public class DateExcludedRestService {

	@Autowired
	private DateExcludedBusiness dateExcludedBusiness;
	
	@RequestMapping(value="/dateExcluded",method = RequestMethod.POST)
	public DateExcluded saveProjet(@RequestBody DateExcluded dateExcluded) {
		return dateExcludedBusiness.saveDateExcluded(dateExcluded);
	}

	
	@RequestMapping(value="/dateExcluded1",method = RequestMethod.GET)
	public List<DateExcluded> listProjets() {
		return dateExcludedBusiness.listDateExcluded();
	}

	
	@RequestMapping(value="/chargerAll",method = RequestMethod.GET)
	public PageDateExlcuded listClients(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return dateExcludedBusiness.listDateExcluded(page, size);
	}

		
	
	@RequestMapping(value="/dateExcludede",method = RequestMethod.GET)
	public DateExcluded updateLieu2(@RequestParam(name="lastDateExcluded")String lastDateExcluded,@RequestParam(name="dateExcluded")String dateExcluded){
		
		System.out.println(" Date Excluded " + dateExcluded);
		 
	     Date dateExcluded1,lastDateExcluded1;
		try {
			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			dateExcluded1 = df.parse(dateExcluded);
			DateFormat df2 = new SimpleDateFormat("dd/MM/yyyy");
			lastDateExcluded1 = df2.parse(lastDateExcluded);
			return dateExcludedBusiness.updateDateExcluded(lastDateExcluded1,dateExcluded1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}
	

	
	
	
}
