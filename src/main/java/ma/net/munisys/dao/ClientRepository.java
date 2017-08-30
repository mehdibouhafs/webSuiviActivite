package ma.net.munisys.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Projet;
public interface ClientRepository extends JpaRepository<Client,Long> {

	
	@Query("select o from Client o ORDER BY o.id DESC")
	public Page<Client> findClients(Pageable page);
	
	
	@Query("select p from Client p where p.client like :x")
	public List<Client> getClients(@Param("x")String client);
	
	
	@Query("select o.projets from Client o inner join o.projets c where c.statutProjet = :y and o.codeClient = :x ")
	public List<Projet> findByclientProjet(@Param("x")String codeClient,@Param("y") int tag);
}
