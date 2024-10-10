package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Repository
public interface LicenciaRepository extends CrudRepository<Licencia, Integer>, PagingAndSortingRepository<Licencia,Integer>{

    @Query("SELECT COUNT(c) > 0 FROM Licencia c WHERE c.persona = ?1 AND (c.pedidoDesde <= ?3 AND c.pedidoHasta >= ?2) AND c.estado = true")
    Boolean mismosDiasLicencia(Persona persona, Date desde, Date hasta);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1 AND d.estado = true")
    Boolean tieneCargo(Persona persona);

    @Query("SELECT SUM(ABS(EXTRACT(DAY FROM l.pedidoHasta) - EXTRACT(DAY FROM l.pedidoDesde)) + 1) FROM Licencia l WHERE l.persona = ?1 AND TO_CHAR(l.pedidoDesde, 'MM') = ?2 AND TO_CHAR(l.pedidoDesde, 'YYYY') = ?3 AND l.estado = true")
    Integer cantDiasXLicenciasEnMes(Persona persona, String mes, String año);

    @Query("SELECT SUM(ABS(EXTRACT(DAY FROM l.pedidoHasta) - EXTRACT(DAY FROM l.pedidoDesde)) + 1) FROM Licencia l WHERE l.persona = ?1 AND l.articulo = ?3 AND TO_CHAR(l.pedidoDesde, 'YYYY') = ?2 AND l.estado = true")
    Integer cantDiasXLicenciasEnAño(Persona persona, String año, ArticuloLicencia articulo);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1 AND ?2 >= d.fechaInicio AND (d.fechaFin IS NULL OR ?2 <= d.fechaFin)")
    Boolean desigXDia(Persona persona, Date fechaLicencia);

    @Query("SELECT l FROM Licencia l where l.persona.id = ?1 AND l.articulo.id = ?2 AND l.pedidoDesde = ?3 AND l.pedidoHasta = ?4 AND l.estado = true")
    Optional<Licencia> findAllByPADH(int persona, int articulo, Date desde, Date hasta);

    @Query("SELECT e FROM Licencia e WHERE lower(e.persona.nombre) LIKE ?1 OR lower(e.persona.apellido) LIKE ?1 OR lower(e.articulo.articulo) LIKE ?1")
    Page<Licencia> findByNombreOrApellidoOrArticuloContainingIgnoreCase(String textoBusqueda, PageRequest pageRequest);

    @Query("SELECT l FROM Licencia l WHERE (?1 >= l.pedidoDesde AND ?1 <= l.pedidoHasta) AND l.estado = true")
    List<Licencia> parteDiario(Date fecha);

    @Query("SELECT l FROM Licencia l WHERE l.persona.id = ?1 and l.estado = true")
    List<Licencia> findAllByPersona(int idPersona);

    @Query("SELECT l FROM Licencia l WHERE l.persona.id = ?1 and l.estado = false")
    List<Licencia> findAllByPersonaNoOtorgadas(int idPersona);

    @Query("SELECT COUNT(l) > 0 FROM Licencia l WHERE l.persona.id = ?1 AND (?2 >= l.pedidoDesde AND ?2 <= l.pedidoHasta) AND l.estado = true")
    boolean estaDeLicencia(int Idpersona, Date hoy);


}