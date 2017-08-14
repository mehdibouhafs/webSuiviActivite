package ma.net.munisys.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ma.net.munisys.dao.TypeRepository;
import ma.net.munisys.entities.PageTypes;
import ma.net.munisys.entities.Type;


@Service
public class TypeBusinessImp implements TypeBusiness {
	
	@Autowired
	private TypeRepository typeRepository;

	@Override
	public Type saveType(Type type) {
		
		return typeRepository.save(type);
	}

	@Override
	public List<Type> listTypes() {
		// TODO Auto-generated method stub
		return typeRepository.findAll();
	}

	@Override
	public Type updateType(Long id, Type type) {
		// TODO Auto-generated method stub
		type.setId(id);
		return typeRepository.save(type);
	}

	@Override
	public PageTypes listTypes(int page, int size) {
		PageTypes pageTypes= new PageTypes();
		Page<Type> pageNature = typeRepository.findTypes(new PageRequest(page-1, size));
		pageTypes.setTypes(pageNature.getContent());
		pageTypes.setNombreTypes(pageNature.getNumberOfElements());
		pageTypes.setPage(pageNature.getNumber());
		pageTypes.setTotalPages(pageNature.getTotalPages());
		pageTypes.setTotalTypes(pageNature.getTotalElements());
		return pageTypes;
	}

}
