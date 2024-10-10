package unpsjb.labprog.backend.business;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.business.ControlLicencia.ValidacionLicencia;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class LicenciaService {

    @Autowired
    LicenciaRepository repository;

    @Autowired
    ArticuloService ArticuloService;

    public List<Licencia> findAll() {
        List<Licencia> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    /* public Page<Licencia> findByPage2(int page, int size) {
        return repository.findAll(
            PageRequest.of(page, size));
    } */

     public Page<Licencia> findByPage(int page, int size, String textoBusqueda) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (textoBusqueda == null || textoBusqueda.trim().isEmpty()) {
            return repository.findAll(pageRequest);
        } else {
            return repository.findByNombreOrApellidoOrArticuloContainingIgnoreCase("%" + textoBusqueda.toLowerCase() + "%", pageRequest);
        }
    }

    public Licencia findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Licencia save(Licencia licencia) {
        return repository.save(licencia);
    }

    @Transactional
    public Licencia delete(int id) {
        Licencia licencia = findById(id);
        if (licencia != null)
            repository.delete(licencia);

        return licencia;
    }

    public boolean mismosDiasLicencia(Persona persona, Date desde, Date hasta){
        return repository.mismosDiasLicencia(persona, desde, hasta);
    }

    public Optional<Licencia> findByPADH(int personaId, int articuloId, Date desde, Date hasta) {
        return repository.findAllByPADH(personaId, articuloId, desde, hasta);
    }

    public List<Licencia> parteDiario(String fecha) throws ParseException{
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return repository.parteDiario(dateFormat.parse(fecha));
    }

    public List<Licencia> findAllByPersona(int idPersona){
        return repository.findAllByPersona(idPersona);
    }

    public List<Licencia> findAllByPersonaNoOtorgadas(int idPersona){
        return repository.findAllByPersonaNoOtorgadas(idPersona);
    }

    public boolean estaDeLicencia(int idPersona, String fechaHoy){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try{
            return repository.estaDeLicencia(idPersona, dateFormat.parse(fechaHoy));
        } catch(Exception e) {
            return false;
        }
    }
    
    
}

