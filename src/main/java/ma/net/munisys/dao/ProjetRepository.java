package ma.net.munisys.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.Projet;

public interface ProjetRepository extends JpaRepository<Projet,String> {
	
	@Query("select o from Projet o ORDER BY o.projet ASC")
	public Page<Projet> findProjet(Pageable page);
}
