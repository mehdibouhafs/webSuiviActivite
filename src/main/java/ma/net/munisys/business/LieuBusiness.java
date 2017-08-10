package ma.net.munisys.business;

import java.util.List;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.Lieu;
import ma.net.munisys.entities.PageLieux;
import ma.net.munisys.entities.PageUsers;

public interface LieuBusiness {
	
	public Lieu saveLieu(Lieu lieu);
	public List<Lieu> listLieux();
	public Lieu updateLieu(Long id, Lieu lieu);
	public PageLieux listLieux(int page, int size);

}
