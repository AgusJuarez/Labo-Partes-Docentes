package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import unpsjb.labprog.backend.model.Cargo;

@Service
public class CargoService {
    
    @Autowired
    CargoRepository repository;

    public List<Cargo> findAll() {
        List<Cargo> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Cargo findById(int id) {
        return repository.findById(id).orElse(null);
    }
    
    public Cargo findByName(String nombre) {
        return repository.findAllByName(nombre).orElse(null);
    }

   /*  public Page<Cargo> findByPage2(int page, int size) {
        Sort.Order order = Sort.Order.asc("tipo"); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        return repository.findAll(
            PageRequest.of(page, size, sort));
    } */

    public Page<Cargo> findByPage(int page, int size, String textoBusqueda) {
        Sort.Order order = Sort.Order.asc("nombre"); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        if (textoBusqueda == null || textoBusqueda.trim().isEmpty()) {
            return repository.findAll(pageRequest);
        } else {
            return repository.findByNombreContainingIgnoreCase("%" + textoBusqueda.toLowerCase() + "%", pageRequest);
        }
    }

    @Transactional
    public Cargo save(Cargo cargo) {
        return repository.save(cargo);
    }

    @Transactional
    public List<Cargo> findByTurnoAnioNumero(String turno, String anio, String numero) {
        return repository.findByTurnoAnioNumero(turno.toLowerCase(), anio, numero);
    }

    @Transactional
    public List<Cargo> findByTurno(String turno) {
        return repository.findByTurno(turno.toLowerCase());
    }

    public List<Cargo> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }
    
    public List<Cargo> findByType(String tipo) {
        return repository.findAllByType(tipo);
    }

    @Transactional
    public Cargo delete(int id) {
        Cargo cargo = findById(id);
        if (cargo != null)
            repository.delete(cargo);

        return cargo;
    }
}