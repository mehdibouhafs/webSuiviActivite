package ma.net.munisys.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import ma.net.munisys.entities.Nature;

public interface NatureRepository extends JpaRepository<Nature,Long> {
	
	@Query("select o from Nature o ORDER BY o.id DESC")
	public Page<Nature> findNatures(Pageable page);
}
