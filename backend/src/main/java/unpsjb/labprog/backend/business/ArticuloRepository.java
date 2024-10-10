package unpsjb.labprog.backend.business;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.ArticuloLicencia;

@Repository
public interface ArticuloRepository extends CrudRepository<ArticuloLicencia, Integer>{

    @Query("SELECT e FROM ArticuloLicencia e WHERE e.articulo = ?1")
    Optional<ArticuloLicencia> findByArticulo(String articulo);
    
    @Query("SELECT e FROM ArticuloLicencia e WHERE UPPER(e.articulo) LIKE ?1 OR UPPER(e.descripcion) LIKE ?1")
    List<ArticuloLicencia> search(String string);
}