package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import unpsjb.labprog.backend.model.Horario;

@Service
public class HorarioService {
    
    @Autowired
    HorarioRepository repository;

    public List<Horario> findAll() {
        List<Horario> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Horario findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Horario save(Horario horario) {
        return repository.save(horario);
    }

    public List<Horario> findSemana() {
        return repository.findSemana();
    }

    public Horario findDiaSemana(String dia) {
        return repository.dia(dia);
    }

    public List<LocalTime> horarios(){
        return repository.horarios();
    }

    @Transactional
    public Horario delete(int id) {
        Horario horario = findById(id);

        if (horario != null)
            repository.delete(horario);

        return horario;
    }
}