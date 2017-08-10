package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageUsers implements Serializable {
	
	private List<User> users;
	private int page;
	private int nombreUsers;
	private int totalPages;
	private Long totalUsers;
	public PageUsers() {
		super();
	}
	public PageUsers(int page, int nombreUsers, int totalPages) {
		super();
		this.page = page;
		this.nombreUsers = nombreUsers;
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
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public int getNombreUsers() {
		return nombreUsers;
	}
	public void setNombreUsers(int nombreUsers) {
		this.nombreUsers = nombreUsers;
	}
	public Long getTotalUsers() {
		return totalUsers;
	}
	public void setTotalUsers(Long totalUsers) {
		this.totalUsers = totalUsers;
	}
	
	
	
	

}
