package ma.net.munisys.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;

public interface LieuRepository extends JpaRepository<Lieu,Long> {
	
	@Query("select o from Lieu o ORDER BY o.id DESC")
	public Page<Lieu> findLieux(Pageable page);
}
