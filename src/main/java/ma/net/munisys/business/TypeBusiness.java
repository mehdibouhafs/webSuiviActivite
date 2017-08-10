package ma.net.munisys.business;

import java.util.List;


import ma.net.munisys.entities.*;


public interface TypeBusiness {
	
	public Type saveType(Type type);
	public List<Type> listTypes();
	public Type updateType(Long id, Type type);
	
	public PageTypes listTypes(int page, int size);

}
