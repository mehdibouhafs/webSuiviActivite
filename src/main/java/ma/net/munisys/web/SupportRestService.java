package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ma.net.munisys.business.SupportBusiness;

import ma.net.munisys.entities.PageSupport;
import ma.net.munisys.entities.Support;


@RestController
public class SupportRestService {

	@Autowired
	private SupportBusiness supportBusiness;
	
	@RequestMapping(value="/Support",method = RequestMethod.POST)
	public Support saveSupport(@RequestBody Support Support) {
		return supportBusiness.saveSupport(Support);
	}

	
	@RequestMapping(value="/Support1",method = RequestMethod.GET)
	public List<Support> listSupports() {
		return supportBusiness.listSupport();
	}

	
	@RequestMapping(value="/chargerAllSupports",method = RequestMethod.GET)
	public PageSupport listClients(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return supportBusiness.listSupport(page, size);
	}

	@RequestMapping(value="/getSupport",method = RequestMethod.GET)
	public Support getSupport(@RequestParam(name="numDemande") String numDemande) {
		return supportBusiness.findSupport(numDemande);
	}
	
	
	
	
	 

	
}
