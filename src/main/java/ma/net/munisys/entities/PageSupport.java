package ma.net.munisys.entities;

import java.io.Serializable;
import java.util.List;

public class PageSupport implements Serializable {
	
	private List<Support> supports;
	private int page;
	private int nombresupport;
	private int totalPages;
	private Long totalsupports;
	public PageSupport() {
		super();
	}
	public PageSupport(int page, int nombresupport, int totalPages) {
		super();
		this.page = page;
		this.nombresupport = nombresupport;
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
	public List<Support> getPages() {
		return supports;
	}
	public void setsupport(List<Support> supports) {
		this.supports = supports;
	}
	public int getNombresupport() {
		return nombresupport;
	}
	public void setNombresupport(int nombresupport) {
		this.nombresupport = nombresupport;
	}
	public Long getTotalsupport() {
		return totalsupports;
	}
	public void setTotalsupport(Long totalsupports) {
		this.totalsupports = totalsupports;
	}
}
