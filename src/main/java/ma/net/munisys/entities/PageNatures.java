package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageNatures implements Serializable {
	
	private List<Nature> natures;
	private int page;
	private int nombreNatures;
	private int totalPages;
	private Long totalNatures;
	public PageNatures() {
		super();
	}
	public PageNatures(int page, int nombreNatures, int totalPages) {
		super();
		this.page = page;
		this.nombreNatures = nombreNatures;
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
	public List<Nature> getNatures() {
		return natures;
	}
	public void setNatures(List<Nature> natures) {
		this.natures = natures;
	}
	public int getNombreNatures() {
		return nombreNatures;
	}
	public void setNombreNatures(int nombreNatures) {
		this.nombreNatures = nombreNatures;
	}
	public Long getTotalNatures() {
		return totalNatures;
	}
	public void setTotalNatures(Long totalNatures) {
		this.totalNatures = totalNatures;
	}
	
	
	
	
	
	

}
