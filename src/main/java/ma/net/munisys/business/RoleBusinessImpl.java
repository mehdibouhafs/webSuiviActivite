package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.RoleRepository;
import ma.net.munisys.dao.VilleRepository;
import ma.net.munisys.entities.Role;
import ma.net.munisys.entities.Ville;

@Service
public class RoleBusinessImpl implements RoleBusiness {
	
	
	@Autowired
	private RoleRepository roleRepository;

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
	public Role updateRole(String role, Role role1) {
		role1.setRole(role);
		return roleRepository.save(role1);
	}

}
