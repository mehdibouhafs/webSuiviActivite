package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageActiviterEmployer implements Serializable {
	
	private List<ActiviterEmployer> activitesEmployers;
	private int page;
	private int nombreActivitesEmployers;
	private int totalPages;
	private Long totalActivitesEmployers;
	public PageActiviterEmployer() {
		super();
	}
	public PageActiviterEmployer(int page, int nombreActivitesEmployers, int totalPages) {
		super();
		this.page = page;
		this.nombreActivitesEmployers = nombreActivitesEmployers;
		this.totalPages = totalPages;
	}
	public List<ActiviterEmployer> getActivitesEmployer() {
		return activitesEmployers;
	}
	public void setActivitesEmployers(List<ActiviterEmployer> activitesEmployer) {
		this.activitesEmployers = activitesEmployer;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getNombreOperations() {
		return nombreActivitesEmployers;
	}
	public void setNombreOperations(int nombreActivitesEmployers) {
		this.nombreActivitesEmployers = nombreActivitesEmployers;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public Long getTotalActiviterEmployer() {
		return totalActivitesEmployers;
	}
	public void setTotalActiviterEmployer(Long totalActivitesEmployers) {
		this.totalActivitesEmployers = totalActivitesEmployers;
	}
	
	
	

}
