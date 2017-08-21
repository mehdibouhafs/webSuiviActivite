package ma.net.munisys.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.DateExcluded;
import ma.net.munisys.entities.Projet;


public interface DateExcludedRepository extends JpaRepository<DateExcluded,Date> {
	
	@Query("select o from DateExcluded o where o.dateExcluded between :y and :z)")
	public List<DateExcluded> findByDatesBetween(@Param("y")Date nouvelleDateDebut,@Param("z") Date nouvelleDateFin);
	
	
	@Query("select o from DateExcluded o ORDER BY o.dateExcluded ASC")
	public Page<DateExcluded> findDateExcluded(Pageable page);
}
