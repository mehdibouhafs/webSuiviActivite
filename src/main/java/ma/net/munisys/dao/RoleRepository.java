package ma.net.munisys.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.net.munisys.entities.Role;

public interface RoleRepository extends JpaRepository<Role,String> {
	

}
