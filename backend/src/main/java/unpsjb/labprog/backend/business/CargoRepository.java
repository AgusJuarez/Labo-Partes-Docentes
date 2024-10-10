package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;

import unpsjb.labprog.backend.model.Cargo;

@Repository
public interface CargoRepository extends CrudRepository<Cargo, Integer>, PagingAndSortingRepository<Cargo,Integer>{

    @Query("SELECT e FROM Cargo e WHERE e.nombre = ?1")
    Optional<Cargo> findAllByName(String nombre);

    @Query("SELECT e FROM Cargo e WHERE UPPER(e.nombre) LIKE ?1 OR UPPER(e.tipo) LIKE ?1")
    List<Cargo> search(String string); 

    @Query("SELECT e from Cargo e WHERE e.tipo = ?1")
    List<Cargo> findAllByType(String tipo);

    @Query("SELECT e FROM Cargo e WHERE lower(e.nombre) LIKE ?1")
    Page<Cargo> findByNombreContainingIgnoreCase(String textoBusqueda, PageRequest pageRequest);

    @Query("SELECT e from Cargo e WHERE e.division != null AND (e.division.anio = ?2 AND e.division.numero = ?3 AND lower(e.division.turno) = ?1) ORDER BY e.division.anio")
    List<Cargo> findByTurnoAnioNumero(String turno, String anio, String numero);

    @Query("SELECT e from Cargo e WHERE e.division != null AND lower(e.division.turno) = ?1 ORDER BY e.division.anio")
    List<Cargo> findByTurno(String turno);

}