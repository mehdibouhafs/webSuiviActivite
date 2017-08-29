package ma.net.munisys.business;

import java.util.List;

import ma.net.munisys.entities.Nature;
import ma.net.munisys.entities.PageNatures;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.User;

public interface NatureBusiness {
	
	public Nature saveNature(Nature nature);
	public List<Nature> listNaturess();
	public Nature updateNature(Long id, Nature nature);
	
	public PageNatures listNatures(int page, int size);
	
	public List<Nature> findNaturesIn();
	
	public List<Nature> findNaturesNotIn();

}
