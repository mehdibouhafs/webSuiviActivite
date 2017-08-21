package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageDateExlcuded implements Serializable {
	
	private List<DateExcluded> dateExlcudeds;
	private int page;
	private int nombreDateExlcuded;
	private int totalPages;
	private Long totalDateExlcudeds;
	public PageDateExlcuded() {
		super();
	}
	public PageDateExlcuded(int page, int nombreDateExlcuded, int totalPages) {
		super();
		this.page = page;
		this.nombreDateExlcuded = nombreDateExlcuded;
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
	public List<DateExcluded> getPages() {
		return dateExlcudeds;
	}
	public void setProjet(List<DateExcluded> dateExlcudeds) {
		this.dateExlcudeds = dateExlcudeds;
	}
	public int getNombreDateExlcuded() {
		return nombreDateExlcuded;
	}
	public void setNombreDateExlcuded(int nombreDateExlcuded) {
		this.nombreDateExlcuded = nombreDateExlcuded;
	}
	public Long getTotalDateExlcudeds() {
		return totalDateExlcudeds;
	}
	public void setTotalDateExlcudeds(Long totalDateExlcudeds) {
		this.totalDateExlcudeds = totalDateExlcudeds;
	}
}