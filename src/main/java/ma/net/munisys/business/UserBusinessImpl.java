package ma.net.munisys.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import ma.net.munisys.dao.RoleRepository;
import ma.net.munisys.dao.UserRepository;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.User;


@Service
public class UserBusinessImpl implements UserBusiness {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public User saveUser(User user) {
		user.setActive(true);
		User u = userRepository.save(user);
		//addRoleToUser(user.getUsername(),"employer");
		return u;
	}


	@Override
	public Role saveRole(Role role) {
		// TODO Auto-generated method stub
		return roleRepository.save(role);
	}

	@Override
	public List<Role> listRoles() {
		// TODO Auto-generated method stub
		return roleRepository.findAll();
	}

	@Override
	public User addRoleToUser(String username, String role) {
		// TODO Auto-generated method stub
		User user = userRepository.findOne(username);
		Role roles = roleRepository.findOne(role);
		System.out.println(roles.getRole());
		user.getRoles().add(roles);
		userRepository.save(user);
		return user;
		
	}

	@Override
	public User updateUser(String email, User user) {
		user.setUsername(email);
		return userRepository.save(user);
		
	}

	@Override
	public User getUser(String email, String password) {
		// TODO Auto-generated method stub
		User user = userRepository.findByEmailAndPassword(email, password);
		if(user !=null){
			return user;
		}
		return null;
	}


	@Override
	public PageUsers listUsers(int page, int size) {
		PageUsers pageUsers= new PageUsers();
		Page<User> pageUser = userRepository.findUsers(new PageRequest(page-1, size));
		pageUsers.setUsers(pageUser.getContent());
		pageUsers.setNombreUsers(pageUser.getNumberOfElements());
		pageUsers.setPage(pageUser.getNumber());
		pageUsers.setTotalPages(pageUser.getTotalPages());
		pageUsers.setTotalUsers(pageUser.getTotalElements());
		return pageUsers;
	}
	
	@RequestMapping(value="/getLoggedUser")
	public Map<String, Object> getLoggedUser(HttpServletRequest httpServletRequest){
		HttpSession httpSession = httpServletRequest.getSession();
		SecurityContext securityContext = (SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username = securityContext.getAuthentication().getName();
		List<String> roles = new ArrayList<>();
		for(GrantedAuthority g : securityContext.getAuthentication().getAuthorities()){
			roles.add(g.getAuthority());
		}
		User user = getUser(username);
		Map<String,Object> params = new HashMap<>();
		params.put("username", username);
		params.put("nom", user.getNom());
		params.put("roles", roles);
		params.put("groupe", user.getGroupe());
		return params;
		
	}


	@Override
	public User getUser(String email) {
		// TODO Auto-generated method stub
		return userRepository.findOne(email);
	}


	@Override
	public List<User> listUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

}
