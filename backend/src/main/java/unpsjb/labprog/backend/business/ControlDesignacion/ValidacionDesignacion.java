package unpsjb.labprog.backend.business.ControlDesignacion;
import unpsjb.labprog.backend.business.ControlLicencia.ValidadorArticulo;
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.business.PersonaService;
import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.business.CargoService;
import unpsjb.labprog.backend.business.DesignacionRepository;
import java.util.Enumeration;
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
import org.springframework.stereotype.Component;
import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.model.Cargo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.RestController;
import java.lang.*;
import java.io.IOException;

@Component
public class ValidacionDesignacion {

    @Autowired
    private DesignacionRepository repository;

    @Autowired
    private DesignacionService service; 

    @Autowired
    private PersonaService personaService;

    @Autowired
    private CargoService cargoService;

    @Autowired
    private LicenciaService licenciaService; 
     

    @Transactional
    public String validador(Designacion designacion) {
        List<String> responses = new ArrayList<String>();
        designacion.setEstado(false);

        designacion.setCargo(obtenerCargo(designacion.getCargo().getId()));
        designacion.setPersona(obtenerPersona(designacion.getPersona().getId()));
        

        List<Designacion> designaciones = consultarDisponibilidad(designacion);
        Designacion designacionExistente = new Designacion();
        for(Designacion d: designaciones) {
            designacionExistente = d;
        }

        responses = verificarFechaDesignacionDentroFechaCargo(designacion.getCargo(), designacion, responses);
        responses = existenciaLicenciaEnDesignacion(designaciones, designacionExistente, designacion, responses);
        
        if (responses.isEmpty()) {
            responses = otorgarDesignacion(designacionExistente, designacion, responses);
        }

        designacion.setAnotaciones(responses);
        
        Response.ok(service.save(designacion), responses.get(0));
        
        return responses.get(0).replaceFirst("^\\[\\d{4}-\\d{2}-\\d{2}\\]", "");

}

public List<Designacion> consultarDisponibilidad(Designacion designacion){
    return service.consultarFecha(designacion.getCargo(), designacion.getFechaInicio(), designacion.getFechaFin());
        
}

public boolean existeLicenciaEnDesignacion(Designacion designacionExistente, Designacion designacion) {
    return licenciaService.mismosDiasLicencia(designacionExistente.getPersona(), designacion.getFechaInicio(), designacion.getFechaFin());
}

public Persona obtenerPersona(int idPersona) {
    try {
      return personaService.findById(idPersona);
    } catch (Exception e) {
        return null;
    }   
}

public Cargo obtenerCargo(int idCargo) {
    try {
        return cargoService.findById(idCargo);
    } catch (Exception e) {
        return null;
    }
}

public List<String> verificarFechaDesignacionDentroFechaCargo(Cargo cargo, Designacion designacion, List<String> responses) {
    if((cargo.getFechaFin() == null || designacion.getFechaFin()==null) || (cargo.getFechaFin() == null && designacion.getFechaFin()==null)){
            if(!(cargo.getFechaInicio().before(designacion.getFechaInicio()))){
                responses.add("["+LocalDate.now()+"]" + "Las fechas asignadas no estan dentro del periodo del cargo asociado.");
            }
        } else {
            if(!((cargo.getFechaInicio().before(designacion.getFechaFin())) && (cargo.getFechaFin().after(designacion.getFechaInicio())))) {
                responses.add("["+LocalDate.now()+"]" + "Las fechas asignadas no estan dentro del periodo del cargo asociado.");
            }
        } 
    return responses;
}

public List<String> existenciaLicenciaEnDesignacion(List<Designacion> designaciones, Designacion designacionExistente, Designacion designacion, List<String> responses){
    if((designaciones != null)) {
        if(!(existeLicenciaEnDesignacion(designacionExistente, designacion))){
            for(Designacion d: designaciones) {
                if(designacion.getCargo().getDivision() == null){
                    responses.add("["+LocalDate.now()+"]" + designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() + " NO ha sido designado/a como " + designacion.getCargo().getNombre() + ". pues el cargo solicitado lo ocupa " + d.getPersona().getNombre() + " " + d.getPersona().getApellido() + " para el período");
                } else {
                    responses.add("["+LocalDate.now()+"]" + designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() + " NO ha sido designado/a debido a que la asignatura " + designacion.getCargo().getNombre() + " de la división " + designacion.getCargo().getDivision().getAnio() + "º " + designacion.getCargo().getDivision().getNumero() + "º turno " + designacion.getCargo().getDivision().getTurno() + " lo ocupa " + d.getPersona().getNombre() + " " + d.getPersona().getApellido() + " para el período");
                }     
            }
        }
    }
    return responses;
}

public List<String> otorgarDesignacion(Designacion designacionExistente, Designacion designacion, List<String> responses){
    try {
        if(existeLicenciaEnDesignacion(designacionExistente, designacion)){
            designacion.setEstado(true);
            responses.add("["+LocalDate.now()+"]" + designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() + " ha sido designado/a como " + designacion.getCargo().getNombre() + " exitosamente, en reemplazo de " + designacionExistente.getPersona().getNombre() + " " + designacionExistente.getPersona().getApellido());
        } else {
            if ((designacion.getCargo().getDivision() == null) && responses.isEmpty()) {
                designacion.setEstado(true);
                responses.add("["+LocalDate.now()+"]" + designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() + " ha sido designado/a como " + designacion.getCargo().getNombre() + " exitosamente");
            }else {
                designacion.setEstado(true);
                responses.add("["+LocalDate.now()+"]" + designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() + " ha sido designado/a a la asignatura " + designacion.getCargo().getNombre() + " a la división " + designacion.getCargo().getDivision().getAnio() + "º " + designacion.getCargo().getDivision().getNumero() + "º turno " + designacion.getCargo().getDivision().getTurno() + " exitosamente");
            }
        }
        }catch (DataIntegrityViolationException e) {
            responses.add("La Designacion con el id " + designacion.getId()
                + " ya existe");
        }
    return responses;
}
}