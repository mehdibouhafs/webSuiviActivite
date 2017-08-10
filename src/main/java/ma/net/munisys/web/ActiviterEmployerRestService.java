package ma.net.munisys.web;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.PageActiviterEmployer;


@RestController
public class ActiviterEmployerRestService{

	@Autowired
	private ActiviterEmployerBusiness activiterEmployerBusiness;

	@RequestMapping(value="/ActivitesEmployer",method = RequestMethod.POST)
	public ActiviterEmployer saveActiviterEmployer(@RequestBody ActiviterEmployer activiterEmployer) {
		return activiterEmployerBusiness.saveActiviterEmployer(activiterEmployer);
	}
	
	@RequestMapping(value="/ActivitesEmployer",method = RequestMethod.GET)
	public PageActiviterEmployer listActivitesEmployer(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return activiterEmployerBusiness.listActivitesEmployer(page,size);
	}
	
	@RequestMapping(value="/ActivitesEmployers",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployer() {
		return activiterEmployerBusiness.findAllActiviterEmployer();
	}
	
	@RequestMapping(value="/ActivitesEmployersFiltred/{emailsId}",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployer(@PathVariable String[] emailsId) {	
		return activiterEmployerBusiness.findByUserUsernameIn(Arrays.asList(emailsId));
	}
	


	@RequestMapping(value="/ActivitesEmployerByMail",method = RequestMethod.GET)
	public PageActiviterEmployer listActivitesEmployerByUser(String email,@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return activiterEmployerBusiness.listActivitesEmployerByUser(email, page, size);
	}
	
	@RequestMapping(value="/ActivitesEmployerAllByMail",method = RequestMethod.GET)
	public List<ActiviterEmployer> listActivitesEmployerByUser(@RequestParam(name="email")String email) {
		return activiterEmployerBusiness.findActiviterByUser(email);
	}

	@RequestMapping(value="/ActivitesEmployer",method = RequestMethod.DELETE)
	public void deleteActiviterEmployer(@RequestBody ActiviterEmployer activiterEmployer) {
		activiterEmployerBusiness.deleteActiviterEmployer(activiterEmployer);
	}
	
	

	@RequestMapping(value="/ActivitesEmployer/idActiviterEmployer",method = RequestMethod.PUT)
	public void updateActiviteEmployer(@PathVariable(name="idActiviterEmployer")Long idActiviterEmployer, @RequestBody ActiviterEmployer activiterEmployer) {
		activiterEmployerBusiness.updateActiviteEmployer(idActiviterEmployer,activiterEmployer);
	}
	
	@RequestMapping(value="/chercher",method=RequestMethod.GET)
	public PageActiviterEmployer chercher(
			@RequestParam(name="mc",defaultValue="")String mc,
			@RequestParam(name="page",defaultValue="0")int page,
			@RequestParam(name="size",defaultValue="4")int size){
		return activiterEmployerBusiness.listActivitesEmployerByUser("%"+mc+"%",page,size);
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
	
	
}
