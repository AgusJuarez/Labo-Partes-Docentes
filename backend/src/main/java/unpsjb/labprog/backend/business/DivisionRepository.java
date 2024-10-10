package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import unpsjb.labprog.backend.model.Division;

@Repository
public interface DivisionRepository extends CrudRepository<Division, Integer>, PagingAndSortingRepository<Division,Integer>{

    @Query("SELECT e FROM Division e WHERE UPPER(e.anio) LIKE ?1")
    List<Division> search(String string);

    @Query("SELECT e FROM Division e ORDER BY e.anio")
    List<Division> findAllOrder();
    
    @Query("SELECT e FROM Division e WHERE e.anio = ?1 and e.numero = ?2") // convierte fila en objetos
    Optional<Division> findByAnioNumero(String anio, String numero);

     @Query("SELECT e FROM Division e WHERE e.anio LIKE ?1")
    Page<Division> findByAnioContainingIgnoreCase(String textoBusqueda, PageRequest pageRequest);

}