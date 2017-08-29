package ma.net.munisys.business;

import java.util.List;

import org.springframework.data.repository.query.Param;
import ma.net.munisys.entities.PageSupport;
import ma.net.munisys.entities.Support;
public interface SupportBusiness {
	
	public Support saveSupport(Support support);
	public List<Support> listSupport();
	public Support updateSupport(String id,Support support);
	public PageSupport listSupport(int page, int size);
	public Support findSupport(String numDemande);

}
