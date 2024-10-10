package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Repository
public interface DesignacionRepository extends CrudRepository<Designacion, Integer>, PagingAndSortingRepository<Designacion,Integer>{
    @Query("SELECT e FROM Designacion e WHERE (e.cargo = ?1) " +
            "AND (e.fechaInicio <= COALESCE(?3, e.fechaInicio)) AND (?2 <= COALESCE(e.fechaFin, ?2)) AND e.estado = true ORDER BY e.id DESC LIMIT 1")
    List<Designacion> consultarFecha(Cargo cargo, Date fechaInicio, Date fechaFin);

    @Query("SELECT e FROM Designacion e WHERE lower(e.persona.nombre) LIKE ?1 OR lower(e.persona.apellido) LIKE ?1 OR lower(e.cargo.nombre) LIKE ?1 ORDER BY e.id DESC")
    Page<Designacion> findByNombreOrApellidoOrCargoContainingIgnoreCase(String textoBusqueda, PageRequest pageRequest);

    @Query("SELECT e FROM Designacion e WHERE e.persona.id = ?1 AND e.estado = true")
    List<Designacion> findAllByPersona(int idPersona);

    @Query("SELECT e FROM Designacion e WHERE e.persona.id = ?1 AND e.estado = false")
    List<Designacion> findAllByPersonaNoOtorgadas(int idPersona);

    @Query("SELECT e FROM Designacion e WHERE e.cargo = ?1 AND e.estado = true ORDER BY e.id ASC LIMIT 1")
    Designacion findByCargo(Cargo cargo);


    @Query("SELECT e FROM Designacion e WHERE (e.cargo = ?1) AND (e.persona.id != ?2) " +
            "AND (e.fechaInicio <= COALESCE(?3, e.fechaInicio)) AND (?3 <= COALESCE(e.fechaFin, ?3)) AND e.estado = true ORDER BY e.id ASC LIMIT 1")
    Designacion existeSuplencia(Cargo cargo, int idPersona, Date hoy);




}