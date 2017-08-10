package ma.net.munisys.dao;

import java.util.Date;
import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.User;

public interface ActiviterEmployerRepository extends JpaRepository<ActiviterEmployer,Integer> {
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public Page<ActiviterEmployer> findActiviterEmployer(@Param("x") String email,Pageable page);
	
	@Query("select o from ActiviterEmployer o ORDER BY o.dateDebut DESC")
	public Page<ActiviterEmployer> findActiviterEmployer(Pageable page);
	
	public List<ActiviterEmployer> findByUser(User user);
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterByUser(@Param("x")String email);
	
	
	@Query( "select o from ActiviterEmployer o where o.user.username in :ids" )
	public List<ActiviterEmployer> findByUserUsernameIn(@Param("ids") List<String> usersIdList);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and (o.dateDebut between :y and :z or o.dateFin between :y and :z)")
	public List<ActiviterEmployer>  findByDatesBetween(@Param("x")String username,@Param("y")Date nouvelleDateDebut,@Param("z") Date nouvelleDateFin);

	
}
