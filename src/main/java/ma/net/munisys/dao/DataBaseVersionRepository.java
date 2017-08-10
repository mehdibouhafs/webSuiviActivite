package ma.net.munisys.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.DataBaseVersion;

public interface DataBaseVersionRepository extends JpaRepository<DataBaseVersion,Long> {

}
