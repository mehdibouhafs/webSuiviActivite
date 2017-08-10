package ma.net.munisys.business;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.User;




public interface UserBusiness {
	
	public User saveUser(User user);
	public User getUser(String email,String password);
	public User getUser(String email);
	public User updateUser(String email, User user);
	public Role saveRole(Role role);
	public List<Role> listRoles();
	public PageUsers listUsers(int page, int size);
    public User addRoleToUser(String username,String role);
    public Map<String, Object> getLoggedUser(HttpServletRequest httpServletRequest);
    public List<User> listUsers();
	

}
