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
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.User;

public interface ActiviterEmployerRepository extends JpaRepository<ActiviterEmployer,Integer> {
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterEmployer(@Param("x") String email);
	
	
	@Query("select o from ActiviterEmployer o where o.id = :x")
	public ActiviterEmployer findActiviterEmployer(@Param("x") Long id);
	
	@Transactional
	@Modifying
	@Query("delete from ActiviterEmployer o where o.id = :x")
	public void deleteActiviterEmployer(@Param("x") Long id);
	
	@Query("select o from ActiviterEmployer o ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterEmployer();
	
	
	@Query("select count(distinct e.client) from ActiviterEmployer e where e.user.username = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countClientActiviteEmp(String email,String type,Date dateDebut,Date dateFin);
	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1 and e.type.type = ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countTypeActiviteEmp(String email,String type,Date dateDebut,Date dateFin);
	
	@Query("select distinct e.client from ActiviterEmployer e where e.user.username = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public List<Client> distinctClientForUser(String email,String type,Date dateDebut,Date dateFin);
	
	@Query("select distinct e.nature from ActiviterEmployer e where e.user.username = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public List<Nature> distinctNatureForUser(String email,String type,Date dateDebut,Date dateFin);
	
	
	@Query("select count(distinct e.nature) from ActiviterEmployer e where e.user.username = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countNatureActiviteEmp(String email,String type,Date dateDebut,Date dateFin);
	
	@Query("select count(distinct e.nature) from ActiviterEmployer e where e.type.type= ?1 and (e.dateDebut > ?2  and e.dateFin < ?3)")
	public int countNatureActiviteEmp2(String type,Date dateDebut,Date dateFin);

	
	@Query("select count(distinct e.client) from ActiviterEmployer e where e.type.type= ?1 and (e.dateDebut > ?2  and e.dateFin < ?3) ")
	public int countClientActiviteEmp2(String type,Date dateDebut,Date dateFin);
	
	@Query("select count(e) from ActiviterEmployer e where e.type.type = ?1 and (e.dateDebut > ?2  and e.dateFin < ?3)")
	public int countTypeActiviteEmp2(String type,Date dateDebut,Date dateFin);
	
	@Query("select distinct e.client from ActiviterEmployer e where e.type.type= ?1 and (e.dateDebut > ?2  and e.dateFin < ?3)")
	public List<Client> distinctClientForUser2(String type,Date dateDebut,Date dateFin);
	
	@Query("select distinct e.nature from ActiviterEmployer e where e.type.type= ?1 and (e.dateDebut > ?2  and e.dateFin < ?3)")
	public List<Nature> distinctNatureForUser2(String type,Date dateDebut,Date dateFin);
	
	
	@Query("select distinct e.user from ActiviterEmployer e where e.type.type= ?1 and (e.dateDebut > ?2  and e.dateFin < ?3)")
	public List<User> distinctUserForUser2(String type,Date dateDebut,Date dateFin);
	
	@Query("select o from ActiviterEmployer o where o.type.type = :a and (o.dateDebut > :y  and o.dateFin < :z)")
	public List<ActiviterEmployer>  findByDatesAfterBefore2(@Param("a")String type,@Param("y")Date DateDebut,@Param("z") Date DateFin);
	
	@Query("select e from ActiviterEmployer e where e.nature.nature = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate2(String nature,String type,Date DateDebut,Date DateFin);
	
	
	@Query("select count(e) from ActiviterEmployer e where e.client.client = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countActiviterEmployerByEmailByClient2(String client,String type,Date DateDebut,Date DateFin);
	
	@Query("select count(e) from ActiviterEmployer e where e.nature.nature = ?1 and e.type.type= ?2 and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countActiviterEmployerByEmailByNature2(String nature,String type,Date DateDebut,Date DateFin);
	
	public List<ActiviterEmployer> findByUser(User user);
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterByUser(@Param("x")String email);
	
	
	@Query( "select o from ActiviterEmployer o where o.user.username in :ids" )
	public List<ActiviterEmployer> findByUserUsernameIn(@Param("ids") List<String> usersIdList);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and (o.dateDebut between :y and :z or o.dateFin between :y and :z)")
	public List<ActiviterEmployer>  findByDatesBetween(@Param("x")String username,@Param("y")Date nouvelleDateDebut,@Param("z") Date nouvelleDateFin);

	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1")
	public int countActiviterEmployerByEmail(String email);
	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1 and e.client.client = ?2 and e.type.type= ?3")
	public int countActiviterEmployerByEmailByClient(String email,String client,String type);
	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1 and e.nature.nature = ?2 and e.type.type= ?3")
	public int countActiviterEmployerByEmailByNature(String email,String nature,String type);
	
	
	@Query("select e from ActiviterEmployer e where e.user.username = ?1 and e.nature.nature = ?2 and e.type.type= ?3 and (e.dateDebut > ?4  and e.dateFin < ?5)")
	public List<ActiviterEmployer> activiterEmployerByEmailByNatureByDate(String email,String nature,String type,Date DateDebut,Date DateFin);
	
	@Query("select count(e) from ActiviterEmployer e where e.user.username = ?1 and e.client.client = ?2  and (e.dateDebut > ?3  and e.dateFin < ?4)")
	public int countActiviterEmployerByClientEtDate(String email,String client,Date DateDebut,Date DateFin);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.type.type = :a and (o.dateDebut > :y  and o.dateFin < :z)")
	public List<ActiviterEmployer>  findByDatesAfterBefore(@Param("x")String username,@Param("a")String type,@Param("y")Date DateDebut,@Param("z") Date DateFin);
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.client.client = :y and (o.dateDebut > :a  and o.dateFin < :b)")
	public List<ActiviterEmployer> findActiviterByUserAndClientAfterBefore(@Param("x")String email,@Param("y") String client,@Param("a")Date DateDebut,@Param("b") Date DateFin);
	
	
	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.nature.nature = :y and (o.dateDebut > :a  and o.dateFin < :b) ")
	public List<ActiviterEmployer> findActiviterByUserAndNatureAfterBefore(@Param("x")String email,@Param("y") String nature,@Param("a")Date DateDebut,@Param("b") Date DateFin);

	@Query("select o from ActiviterEmployer o where o.user.username = :x and o.type.type = :y  and (o.dateDebut > :a  and o.dateFin < :b)")
	public List<ActiviterEmployer> findActiviterByUserAfterBefore(@Param("x")String email,@Param("y") String statut,@Param("a")Date DateDebut,@Param("b") Date DateFin);

	@Query("select o from ActiviterEmployer o where o.user.groupe.codeGroupe = :x ORDER BY o.dateDebut DESC")
	public List<ActiviterEmployer> findActiviterByGroupe(@Param("x")Long codeGroupe);

}
