package ma.net.munisys.business;

import java.util.List;

import ma.net.munisys.entities.Role;


public interface RoleBusiness {
	
	public Role saveRole(Role role);
	public List<Role> listRoles();
	public Role updateRole(String role, Role role1);

}
