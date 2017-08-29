package ma.net.munisys.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Support;



public interface SupportRepository extends JpaRepository<Support,String> {
	

	@Query("select o from Support o")
	public Page<Support> findSupport(Pageable page);
	
	
	@Query("select o from Support o where o.numDemande = :x")
	public Support findSupport(@Param("x") String numDemande);
	
}
