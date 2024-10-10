package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import unpsjb.labprog.backend.model.Persona;

@Repository
public interface PersonaRepository extends CrudRepository<Persona, Integer>, PagingAndSortingRepository<Persona,Integer>{
    
    @Query("SELECT e FROM Persona e WHERE e.cuit = ?1") 
    Optional<Persona> findByCuit(String cuit);

    @Query("SELECT e FROM Persona e WHERE e.dni = ?1") 
    Optional<Persona> findByDni(String dni);

    @Query("SELECT e FROM Persona e WHERE UPPER(e.nombre) LIKE ?1 OR e.cuit LIKE ?1 OR UPPER(e.apellido) LIKE ?1")
    List<Persona> search(String string);

     @Query("SELECT e FROM Persona e WHERE lower(e.nombre) LIKE ?1 OR lower(e.apellido) LIKE ?1")
    Page<Persona> findByNombreOrApellidoContainingIgnoreCase(String textoBusqueda, PageRequest pageRequest);

}