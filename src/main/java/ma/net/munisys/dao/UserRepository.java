package ma.net.munisys.dao;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.User;

public interface UserRepository  extends JpaRepository<User,String> {
	
	
	@Query("select o from User o where o.username = :x and o.password = :y")
	public User findByEmailAndPassword(@Param("x")String email,@Param("y")String password);
	
	@Query("select o from User o ORDER BY o.id DESC")
	public Page<User> findUsers(Pageable page);

}
