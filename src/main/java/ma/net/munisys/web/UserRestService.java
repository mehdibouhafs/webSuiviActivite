package ma.net.munisys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.net.munisys.business.UserBusiness;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.PageNatures;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.User;

@RestController
public class UserRestService {

	@Autowired
	private UserBusiness userBusiness;

	@RequestMapping(value="/users",method = RequestMethod.POST)
	public User getUser(@RequestBody User user) {
		return userBusiness.saveUser(user);
	}
	
	@RequestMapping(value="/users2",method = RequestMethod.POST)
	public User getUser2(@RequestBody User user) {
		return userBusiness.getUser(user.getUsername(), user.getPassword());
	}
	
	@RequestMapping(value="/users",method = RequestMethod.GET)
	public PageUsers listClients(@RequestParam(name="page",defaultValue="1")int page,@RequestParam(name="size",defaultValue="5")int size) {
		return userBusiness.listUsers(page, size);
	}
	
	
	@RequestMapping(value="/allUsers",method = RequestMethod.GET)
	public List<User> listClients() {
		return userBusiness.listUsers();
	}

	@RequestMapping(value="/roleToUser",method = RequestMethod.POST)
	public User addRoleToUser(String username, String role) {
		return userBusiness.addRoleToUser(username, role);
	}
	
	@RequestMapping(value="/roles",method = RequestMethod.POST)
	public Role saveRole(@RequestBody Role role) {
		return userBusiness.saveRole(role);
	}
	
	
	@RequestMapping(value="/roles",method = RequestMethod.GET)
	public List<Role> listRoles() {
		return userBusiness.listRoles();
	}
	
	@RequestMapping(value="/saveUsers",method = RequestMethod.POST)
	public User saveUser(@RequestBody User user) {
		return userBusiness.saveUser(user);
	}
		
	@RequestMapping(value="/users/email",method = RequestMethod.PUT)
	public void updateUser(@PathVariable(name="email")String email, @RequestBody User user) {
		userBusiness.updateUser(email,user);
	}
	
	
	@RequestMapping(value="/getLoggedUser")
	public Map<String, Object> getLoggedUser(HttpServletRequest httpServletRequest){
		 return userBusiness.getLoggedUser(httpServletRequest);
		
	}
	
	
	
	
}
