package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Horario;

@Repository
public interface HorarioRepository extends CrudRepository<Horario, Integer>{

    @Query("SELECT h FROM Horario h WHERE h.dia BETWEEN 'Lunes' AND 'Viernes'")
    List<Horario> findSemana();
    
    @Query("SELECT h FROM Horario h WHERE h.dia = ?1")
    Horario dia(String dia);

    @Query("Select e.horaInicio FROM Horario e")
    List<LocalTime> horarios();
}