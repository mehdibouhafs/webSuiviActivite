package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageTypes implements Serializable {
	
	private List<Type> types;
	private int page;
	private int nombreTypes;
	private int totalPages;
	private Long totalTypes;
	
	
	
	public PageTypes() {
		super();
	}
	
	
	
	public PageTypes(int page, int nombreTypes, int totalPages) {
		super();
		this.page = page;
		this.nombreTypes = nombreTypes;
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
	public List<Type> getTypes() {
		return types;
	}
	public void setTypes(List<Type> types) {
		this.types = types;
	}
	public int getNombreTypes() {
		return nombreTypes;
	}
	public void setNombreTypes(int nombreTypes) {
		this.nombreTypes = nombreTypes;
	}
	public Long getTotalTypes() {
		return totalTypes;
	}
	public void setTotalTypes(Long totalTypes) {
		this.totalTypes = totalTypes;
	}
	
	
	
	
	
	
	

}
