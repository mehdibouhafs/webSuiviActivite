package ma.net.munisys.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.ClientBusiness;
import ma.net.munisys.business.DataBaseVersionBusiness;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.DataBaseVersion;


@RestController
public class DataBaseVersionRestService {

	@Autowired
	private DataBaseVersionBusiness dataBaseVersionBusiness;
	
	

	@RequestMapping(value="/db",method = RequestMethod.GET)
	public DataBaseVersion getDbVersion() {
		return dataBaseVersionBusiness.getDbVersion();
	}
	
	@RequestMapping(value="/db",method = RequestMethod.POST)
	public DataBaseVersion DbVersion(@RequestBody DataBaseVersion dataBaseVersion) {
		return dataBaseVersionBusiness.saveDataBaseVersion(dataBaseVersion);
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
