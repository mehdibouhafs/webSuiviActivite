package ma.net.munisys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.net.munisys.entities.Groupe;
import ma.net.munisys.entities.User;


public interface GroupeRepository extends JpaRepository<Groupe,String> {
	
	
	
	
}
