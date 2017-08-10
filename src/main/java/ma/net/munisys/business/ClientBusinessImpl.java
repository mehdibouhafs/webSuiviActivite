package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.net.munisys.dao.ClientRepository;
import ma.net.munisys.entities.ActiviterEmployer;
import ma.net.munisys.entities.Client;
import ma.net.munisys.entities.PageActiviterEmployer;
import ma.net.munisys.entities.PageClients;

@Service
public class ClientBusinessImpl implements ClientBusiness {
	
	
	@Autowired
	private ClientRepository clientRepository;

	@Override
	public Client saveClient(Client client) {
		// TODO Auto-generated method stub
		return clientRepository.save(client);
	}

	@Override
	public List<Client> listClients() {
		// TODO Auto-generated method stub
		return clientRepository.findAll();
	}

	@Override
	public Client updateClient(Long id, Client client) {
		client.setId(id);
		return clientRepository.save(client);
	}

	@Override
	public PageClients listClients(int page, int size) {
		PageClients pageClients= new PageClients();
		Page<Client> pageClient = clientRepository.findClients(new PageRequest(page-1, size));
		pageClients.setClients(pageClient.getContent());
		pageClients.setNombreClients(pageClient.getNumberOfElements());
		pageClients.setPage(pageClient.getNumber());
		pageClients.setTotalPages(pageClient.getTotalPages());
		pageClients.setTotalClients(pageClient.getTotalElements());
		return pageClients;
	}

	@Override
	public List<Client> getClients(String client) {
		// TODO Auto-generated method stub
		return clientRepository.getClients(client);
	}

}
