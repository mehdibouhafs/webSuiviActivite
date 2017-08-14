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
import ma.net.munisys.business.TypeBusiness;
import ma.net.munisys.business.UserBusiness;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageNatures;
import ma.net.munisys.entities.PageTypes;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.Type;
import ma.net.munisys.entities.User;

@RestController
public class TypesRestService {

	@Autowired
	private TypeBusiness typeBusiness;
	
	@RequestMapping(value="/types",method = RequestMethod.POST)
	public Type saveType(@RequestBody Type type) {
		return typeBusiness.saveType(type);
	}
	
	
	@RequestMapping(value="/types1",method = RequestMethod.GET)
	public List<Type> listNatures() {
		return typeBusiness.listTypes();
	}

	@RequestMapping(value="/types",method = RequestMethod.GET)
	public PageTypes listNaturess(@RequestParam(name="page",defaultValue="1") int page,@RequestParam(name="size",defaultValue="1")int size) {
		return typeBusiness.listTypes(page, size);
	}

	@RequestMapping(value="/types/typeId",method = RequestMethod.PUT)
	public Type updateNature(@PathVariable(name="typeId") Long typeId,@RequestBody Type type) {
		return typeBusiness.updateType(typeId, type);
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
