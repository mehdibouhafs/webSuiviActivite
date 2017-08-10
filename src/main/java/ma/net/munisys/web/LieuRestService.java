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
import ma.net.munisys.business.LieuBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageClients;
import ma.net.munisys.entities.PageLieux;


@RestController
public class LieuRestService {

	@Autowired
	private LieuBusiness lieuBusiness;
	
	@RequestMapping(value="/lieux",method = RequestMethod.POST)
	public Lieu saveClient(@RequestBody Lieu lieu) {
		return lieuBusiness.saveLieu(lieu);
	}

	
	@RequestMapping(value="/lieux1",method = RequestMethod.GET)
	public List<Lieu> listClients() {
		return lieuBusiness.listLieux();
	}

	
	@RequestMapping(value="/lieux",method = RequestMethod.GET)
	public PageLieux listClients(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return lieuBusiness.listLieux(page, size);
	}

	
	@RequestMapping(value="/lieux/clientId",method = RequestMethod.PUT)
	public Lieu updateClient(@PathVariable Long clientId,@RequestBody Lieu lieu) {
		return lieuBusiness.updateLieu(clientId, lieu);
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
