package ma.net.munisys.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.Projet;
import ma.net.munisys.entities.User;

public interface ProjetRepository extends JpaRepository<Projet,String> {
	
	@Query("select o from Projet o ORDER BY o.projet ASC")
	public Page<Projet> findProjet(Pageable page);
	
	
	
	@Query("select o from Projet o inner join o.client c where c.codeClient = :x and o.statutProjet = :y")
	public List<Projet> findProjetByClient(@Param("x")String codeClient,@Param("y") int tag);
	
	@Query("select o from Projet o where o.statutProjet = :y")
	public List<Projet> findProjetByClient(@Param("y") int tag);
	
}
