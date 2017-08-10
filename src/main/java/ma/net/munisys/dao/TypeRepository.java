package ma.net.munisys.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.net.munisys.entities.Type;



public interface TypeRepository extends JpaRepository<Type,Long> {
	

	@Query("select o from Type o ORDER BY o.id DESC")
	public Page<Type> findTypes(Pageable page);
}
