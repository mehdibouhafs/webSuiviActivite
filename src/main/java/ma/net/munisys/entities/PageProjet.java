package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageProjet implements Serializable {
	
	private List<Projet> projets;
	private int page;
	private int nombreProjet;
	private int totalPages;
	private Long totalProjets;
	public PageProjet() {
		super();
	}
	public PageProjet(int page, int nombreProjet, int totalPages) {
		super();
		this.page = page;
		this.nombreProjet = nombreProjet;
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
	public List<Projet> getPages() {
		return projets;
	}
	public void setProjet(List<Projet> projets) {
		this.projets = projets;
	}
	public int getNombreProjet() {
		return nombreProjet;
	}
	public void setNombreProjet(int nombreProjet) {
		this.nombreProjet = nombreProjet;
	}
	public Long getTotalProjet() {
		return totalProjets;
	}
	public void setTotalProjet(Long totalProjets) {
		this.totalProjets = totalProjets;
	}
}
