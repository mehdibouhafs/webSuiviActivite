package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.DataBaseVersionRepository;
import ma.net.munisys.entities.DataBaseVersion;

@Service
public class DataBaseVersionBusinessImpl implements DataBaseVersionBusiness {
	
	@Autowired
	private DataBaseVersionRepository dataBaseVersionRepository;

	@Override
	public DataBaseVersion saveDataBaseVersion(DataBaseVersion dataBaseVersion) {
		// TODO Auto-generated method stub
		return dataBaseVersionRepository.save(dataBaseVersion);
	}

	@Override
	public DataBaseVersion updateDataBaseVersion(Long id, DataBaseVersion dataBaseVersion) {
		// TODO Auto-generated method stub
		dataBaseVersion.setId(id);
		
		return dataBaseVersionRepository.save(dataBaseVersion);
	}

	@Override
	public DataBaseVersion getDbVersion() {
		// TODO Auto-generated method stub
		return dataBaseVersionRepository.findOne(1L);
	}


}
