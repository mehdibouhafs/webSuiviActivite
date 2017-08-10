package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageLieux implements Serializable {
	
	private List<Lieu> lieux;
	private int page;
	private int nombreLieux;
	private int totalPages;
	private Long totalLieux;
	public PageLieux() {
		super();
	}
	public PageLieux(int page, int nombreLieux, int totalPages) {
		super();
		this.page = page;
		this.nombreLieux = nombreLieux;
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
	public List<Lieu> getLieux() {
		return lieux;
	}
	public void setLieux(List<Lieu> lieux) {
		this.lieux = lieux;
	}
	public int getNombreLieux() {
		return nombreLieux;
	}
	public void setNombreLieux(int nombreLieux) {
		this.nombreLieux = nombreLieux;
	}
	public Long getTotalLieux() {
		return totalLieux;
	}
	public void setTotalLieux(Long totalLieux) {
		this.totalLieux = totalLieux;
	}
	
	
	
	
	
	

}
