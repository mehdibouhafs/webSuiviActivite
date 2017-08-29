package ma.net.munisys.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Nature;

public interface NatureRepository extends JpaRepository<Nature,Long> {
	
	@Query("select o from Nature o ORDER BY o.id DESC")
	public Page<Nature> findNatures(Pageable page);
	
	
	@Query("select o from Nature o where o.nature not in ('Support','Support sur site','Support à distance')")
	public List<Nature> findNaturesNotIn();
	
	@Query("select o from Nature o where o.nature in ('Support','Support sur site','Support à distance')")
	public List<Nature> findNaturesIn();
}
