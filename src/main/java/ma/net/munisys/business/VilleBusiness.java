package ma.net.munisys.business;

import java.util.List;
import ma.net.munisys.entities.Ville;

public interface VilleBusiness {
	
	public Ville saveVille(Ville ville);
	public List<Ville> listVilles();
	public Ville updateVille(Long id, Ville ville);

}
