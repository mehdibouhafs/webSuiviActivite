package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageClients implements Serializable {
	
	private List<Client> clients;
	private int page;
	private int nombreClients;
	private int totalPages;
	private Long totalClients;
	public PageClients() {
		super();
	}
	public PageClients(int page, int nombreClients, int totalPages) {
		super();
		this.page = page;
		this.nombreClients = nombreClients;
		this.totalPages = totalPages;
	}
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public List<Client> getClients() {
		return clients;
	}
	public void setClients(List<Client> clients) {
		this.clients = clients;
	}
	public int getNombreClients() {
		return nombreClients;
	}
	public void setNombreClients(int nombreClients) {
		this.nombreClients = nombreClients;
	}
	public Long getTotalClients() {
		return totalClients;
	}
	public void setTotalClients(Long totalClients) {
		this.totalClients = totalClients;
	}
	
	
	
	
	

}
