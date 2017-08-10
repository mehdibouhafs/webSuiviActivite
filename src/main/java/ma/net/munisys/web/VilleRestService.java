package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.business.VilleBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Ville;


@RestController
public class VilleRestService {

	@Autowired
	private VilleBusiness villeBusiness;
	
	@RequestMapping(value="/villes",method = RequestMethod.POST)
	public Ville saveClient(@RequestBody Ville ville) {
		return villeBusiness.saveVille(ville);
	}
	

	@RequestMapping(value="/villes",method = RequestMethod.GET)
	public List<Ville> listClients() {
		return villeBusiness.listVilles();
	}

	
	@RequestMapping(value="/villes/villeId",method = RequestMethod.PUT)
	public Ville updateClient(@PathVariable Long villeId,@RequestBody Ville ville) {
		return villeBusiness.updateVille(villeId, ville);
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
