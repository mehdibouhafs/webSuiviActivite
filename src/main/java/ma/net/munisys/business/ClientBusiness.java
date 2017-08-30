package ma.net.munisys.business;

import java.util.List;

import org.springframework.data.repository.query.Param;

import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.PageClients;
import ma.net.munisys.entities.PageUsers;
import ma.net.munisys.entities.Projet;

public interface ClientBusiness {
	
	public Client saveClient(Client client);
	public List<Client> listClients();
	public Client updateClient(Long id, Client client);
	public PageClients listClients(int page, int size);
	public  List<Client> getClients(String client);
	public List<Projet> findByclientProjet(String codeClient,int tag);

}
