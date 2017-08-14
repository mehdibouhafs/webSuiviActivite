package ma.net.munisys.dao;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.User;

public interface ActiviterEmployerRepository extends JpaRepository<ActiviterEmployer,Integer> {
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public Page<ActiviterEmployer> findActiviterEmployer(@Param("x") String email,Pageable page);
	
	
	@Query("select o from ActiviterEmployer o where o.id = :x")
	public ActiviterEmployer findActiviterEmployer(@Param("x") Long id);
	
	@Transactional
	@Modifying
	@Query("delete from ActiviterEmployer o where o.id = :x")
	public void deleteActiviterEmployer(@Param("x") Long id);
	
	@Query("select o from ActiviterEmployer o ORDER BY o.dateDebut DESC")
	public Page<ActiviterEmployer> findActiviterEmployer(Pageable page);
	
	
	@Query("select count(distinct e.client) from ActiviterEmployer e where e.user.username = ?1")
	public int countClientActiviteEmp(String email);
	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1 and e.type.type = ?2")
	public int countTypeActiviteEmp(String email,String type);
	
	
	@Query("select count(distinct e.nature) from ActiviterEmployer e where e.user.username = ?1")
	public int countNatureActiviteEmp(String email);
	
	public List<ActiviterEmployer> findByUser(User user);
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterByUser(@Param("x")String email);
	
	
	@Query( "select o from ActiviterEmployer o where o.user.username in :ids" )
	public List<ActiviterEmployer> findByUserUsernameIn(@Param("ids") List<String> usersIdList);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and (o.dateDebut between :y and :z or o.dateFin between :y and :z)")
	public List<ActiviterEmployer>  findByDatesBetween(@Param("x")String username,@Param("y")Date nouvelleDateDebut,@Param("z") Date nouvelleDateFin);

	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1")
	public int countActiviterEmployerByEmail(String email);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and (o.dateDebut > :y  and o.dateFin < :z)")
	public List<ActiviterEmployer>  findByDatesAfterBefore(@Param("x")String username,@Param("y")Date DateDebut,@Param("z") Date DateFin);
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.client.client = :y and (o.dateDebut > :a  and o.dateFin < :b)")
	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(@Param("x")String email,@Param("y") String client,@Param("a")Date DateDebut,@Param("b") Date DateFin);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.nature.nature = :y and (o.dateDebut > :a  and o.dateFin < :b) ")
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(@Param("x")String email,@Param("y") String nature,@Param("a")Date DateDebut,@Param("b") Date DateFin);
}
