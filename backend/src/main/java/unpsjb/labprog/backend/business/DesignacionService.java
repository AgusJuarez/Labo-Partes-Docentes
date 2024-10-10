package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import java.text.SimpleDateFormat;

@Service
public class DesignacionService {
    
    @Autowired
    DesignacionRepository repository;

    public List<Designacion> findAll() {
        List<Designacion> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Designacion findById(int id) {
        return repository.findById(id).orElse(null);
    }

   /*  public Page<Designacion> findByPage2(int page, int size) {
        return repository.findAll(
            PageRequest.of(page, size));
    } */

    public Page<Designacion> findByPage(int page, int size, String textoBusqueda) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (textoBusqueda == null || textoBusqueda.trim().isEmpty()) {
            return repository.findAll(pageRequest);
        } else {
            return repository.findByNombreOrApellidoOrCargoContainingIgnoreCase("%" + textoBusqueda.toLowerCase() + "%", pageRequest);
        }
    }

    @Transactional
    public Designacion save(Designacion Designacion) {
        return repository.save(Designacion);
    }

    @Transactional
    public Designacion delete(int id) {
        Designacion designacion = findById(id);
        if (designacion != null)
            repository.delete(designacion);

        return designacion;
    }

    public List<Designacion> consultarFecha(Cargo nombre, Date fechaInicio, Date fechaFin) {
        return repository.consultarFecha(nombre, fechaInicio, fechaFin);
    }

    public List<Designacion> findAllByPersona(int idPersona) {
        return repository.findAllByPersona(idPersona);
    }

    public List<Designacion> findAllByPersonaNoOtorgadas(int idPersona) {
        return repository.findAllByPersonaNoOtorgadas(idPersona);
    }

    public Designacion findByCargo(Cargo cargo) {
        return repository.findByCargo(cargo);
    }

    public Designacion existeSuplencia(Cargo cargo, int idPersona, String hoy) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");  
        try{
            return repository.existeSuplencia(cargo, idPersona, dateFormat.parse(hoy));
        } catch(Exception e) {
            return null;
        }
      
    }

     
}