package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.PageClients;


@RestController
public class ClientRestService {

	@Autowired
	private ClientBusiness clientBusiness;
	
	@RequestMapping(value="/clients",method = RequestMethod.POST)
	public Client saveClient(@RequestBody Client client) {
		return clientBusiness.saveClient(client);
	}
	
	@RequestMapping(value="/clients1",method = RequestMethod.GET)
	public List<Client> listActivitesEmployer() {
		return clientBusiness.listClients();
	}
	
	@RequestMapping(value="/clients2",method = RequestMethod.GET)
	public List<Client> listClients(@RequestParam String client) {
		return clientBusiness.getClients("%"+client+"%");
	}

	
	@RequestMapping(value="/clients",method = RequestMethod.GET)
	public PageClients listActivitesEmployer(@RequestParam(name="page",defaultValue="1") int page,@RequestParam(name="size",defaultValue="5")int size) {
		return clientBusiness.listClients(page, size);
	}

	
	@RequestMapping(value="/clients/clientId",method = RequestMethod.PUT)
	public Client updateClient(@PathVariable Long clientId,@RequestBody Client client) {
		return clientBusiness.updateClient(clientId, client);
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
