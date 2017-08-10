package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.NatureBusiness;
import ma.net.munisys.business.UserBusiness;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageNatures;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.User;

@RestController
public class NatureRestService {

	@Autowired
	private NatureBusiness natureBusiness;
	
	@RequestMapping(value="/natures",method = RequestMethod.POST)
	public Nature saveNature(@RequestBody Nature nature) {
		return natureBusiness.saveNature(nature);
	}
	
	
	@RequestMapping(value="/natures1",method = RequestMethod.GET)
	public List<Nature> listNatures() {
		return natureBusiness.listNaturess();
	}

	@RequestMapping(value="/natures",method = RequestMethod.GET)
	public PageNatures listNaturess(@RequestParam(name="page",defaultValue="1") int page,@RequestParam(name="size",defaultValue="1")int size) {
		return natureBusiness.listNatures(page, size);
	}

	@RequestMapping(value="/natures/natureId",method = RequestMethod.PUT)
	public Nature updateNature(@PathVariable(name="natureId") Long natureId,@RequestBody Nature nature) {
		return natureBusiness.updateNature(natureId, nature);
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
