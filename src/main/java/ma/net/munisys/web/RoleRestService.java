package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.business.RoleBusiness;
import ma.net.munisys.business.VilleBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.Ville;


@RestController
public class RoleRestService {

	@Autowired
	private RoleBusiness roleBusiness;
	
	@RequestMapping(value="/role",method = RequestMethod.POST)
	public Role saveClient(@RequestBody Role role) {
		return roleBusiness.saveRole(role);
	}
	

	@RequestMapping(value="/role",method = RequestMethod.GET)
	public List<Role> listRoles() {
		return roleBusiness.listRoles();
	}

	
	@RequestMapping(value="/role/roleId",method = RequestMethod.PUT)
	public Role updateClient(@PathVariable String role,@RequestBody Role role1) {
		return roleBusiness.updateRole(role, role1);
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
