package ma.net.munisys.business;


import java.util.List;

import ma.net.munisys.entities.DataBaseVersion;

public interface DataBaseVersionBusiness {
	
	public DataBaseVersion saveDataBaseVersion(DataBaseVersion dataBaseVersion);
	public DataBaseVersion updateDataBaseVersion(Long id, DataBaseVersion dataBaseVersion);
	public DataBaseVersion getDbVersion();
	

}
