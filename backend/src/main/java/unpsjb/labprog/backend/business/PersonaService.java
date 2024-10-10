package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.model.ReporteConcepto;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Designacion;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Sort;

import java.time.temporal.ChronoUnit;

@Service
public class PersonaService {

    @Autowired
    PersonaRepository repository;

    @Autowired
    LicenciaService licenciaService;

    @Autowired
    DesignacionService designacionService;

    public List<Persona> findAll() {
        List<Persona> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    /* public Page<Persona> findByPage2(int page, int size, String atributo) {
        Sort.Order order = Sort.Order.asc(atributo); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        return repository.findAll(
            PageRequest.of(page, size, sort));
    } */
    
    public Page<Persona> findByPage(int page, int size, String atributo, String textoBusqueda) {
        Sort.Order order = Sort.Order.asc(atributo); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        if (textoBusqueda == null || textoBusqueda.trim().isEmpty()) {
            return repository.findAll(pageRequest);
        } else {
            return repository.findByNombreOrApellidoContainingIgnoreCase("%" + textoBusqueda.toLowerCase() + "%", pageRequest);
        }
    }

    public Persona findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Persona findByDni(String dni) {
        return repository.findByDni(dni).orElse(null);
    }

    public Persona findByCuit(String cuit) {
        return repository.findByCuit(cuit).orElse(null);
    }
 
    @Transactional
    public Persona save(Persona Persona) {
        return repository.save(Persona);
    }

    @Transactional
    public Persona delete(int id) {
        Persona Persona = findById(id);
        if (Persona != null)
            repository.delete(Persona);

        return Persona;
    }

    public List<Persona> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }

    public ReporteConcepto reporteConcepto(int idPersona) {
        Persona persona = repository.findById(idPersona).orElse(null);

        List<Licencia> licencias = licenciaService.findAllByPersona(idPersona);
        List<Designacion> designaciones = designacionService.findAllByPersona(idPersona);
        
        int cantidadLicenciasOtorgadas = licencias.size();
        int cantidadLicenciasNoOtorgadas = licenciaService.findAllByPersonaNoOtorgadas(idPersona).size();

        int cantidadDesignacionesOtorgadas = designaciones.size();
        int cantidadDesignacionesNoOtorgadas = designacionService.findAllByPersonaNoOtorgadas(idPersona).size();

        int cantidadDiasEnLicencia = 0;

        for(Licencia l : licencias) {
            cantidadDiasEnLicencia += (int)ChronoUnit.DAYS.between(l.getPedidoDesde().toLocalDate(), l.getPedidoHasta().toLocalDate()) + 1;
        }

        ReporteConcepto response = new ReporteConcepto();

        response.setPersona(persona);
        response.setLicencias(licencias);
        response.setDesignaciones(designaciones);
        response.setCantidadLicenciasOtorgadas(cantidadLicenciasOtorgadas);
        response.setCantidadDiasEnLicencia(cantidadDiasEnLicencia);
        response.setCantidadLicenciasNoOtorgadas(cantidadLicenciasNoOtorgadas);
        response.setCantidadDesignacionesOtorgadas(cantidadDesignacionesOtorgadas);
        response.setCantidadDesignacionesNoOtorgadas(cantidadDesignacionesNoOtorgadas);
        
        return response;
    }

    
    
}