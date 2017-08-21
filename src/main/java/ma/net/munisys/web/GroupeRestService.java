package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.business.GroupeBusiness;
import ma.net.munisys.business.VilleBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Groupe;
import ma.net.munisys.entities.Ville;


@RestController
public class GroupeRestService {

	@Autowired
	private GroupeBusiness groupeBusiness;
	
	@RequestMapping(value="/groupe",method = RequestMethod.POST)
	public Groupe saveClient(@RequestBody Groupe groupe) {
		return groupeBusiness.saveGroupe(groupe);
	}
	

	@RequestMapping(value="/groupe",method = RequestMethod.GET)
	public List<Groupe> listClients() {
		return groupeBusiness.listGroupes();
	}

	
	@RequestMapping(value="/groupe/groupeId",method = RequestMethod.PUT)
	public Groupe updateClient(@PathVariable Long villeId,@RequestBody Groupe groupe) {
		return groupeBusiness.updateGroupe(villeId, groupe);
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
