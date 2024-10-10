package unpsjb.labprog.backend.business.ControlLicencia;
import unpsjb.labprog.backend.business.ControlLicencia.ValidadorArticulo;
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.business.LicenciaRepository;
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
import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.business.ControlLicencia.ValidacionArticulo5A;
import unpsjb.labprog.backend.business.ControlLicencia.ValidacionArticulo23A;
import unpsjb.labprog.backend.business.ControlLicencia.ValidacionArticulo36A;
import unpsjb.labprog.backend.model.Persona;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.RestController;
import java.lang.*;
import java.io.IOException;

@Component
public class ValidacionLicencia {

    @Autowired
    private LicenciaRepository repository;

    @Autowired
    private LicenciaService service; 
    
    
    private static final Logger logger = LoggerFactory.getLogger(ValidacionLicencia.class);
    @Transactional
    public String validador(Licencia licencia) {
        List<String> responses = new ArrayList<String>();
        licencia.setEstado(false);
        
        ValidadorArticulo validacionArticulo = validacionArticuloFactory(licencia);

        if(validacionArticulo == null) {
            responses.add("Articulo no implementado.");
            return responses.get(0);
        }
        
        responses = validacionArticulo.validador(licencia);

        if (responses.isEmpty()) {
            try {
                licencia.setEstado(true);
                responses.add("["+LocalDate.now()+"]" + " " + "Se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                        + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido());
                
            }catch (DataIntegrityViolationException e) {
                Response.response(HttpStatus.CONFLICT, "Licencia no se pudo otorgar", null);
                responses.add("Licencia no se pudo otorgar. Error.");
               
            }
        }

        licencia.setAnotaciones(responses);
        Response.ok(service.save(licencia), responses.get(0));

        return responses.get(0).replaceFirst("^\\[\\d{4}-\\d{2}-\\d{2}\\]", "");
    }

    public ValidadorArticulo validacionArticuloFactory(Licencia licencia) {
        if(licencia.getArticulo().getArticulo().equals("5A")) {
            return new ValidacionArticulo5A(repository);
        }
        
        if(licencia.getArticulo().getArticulo().equals("23A")) {
            return new ValidacionArticulo23A(repository);
        }

        if(licencia.getArticulo().getArticulo().equals("36A")) { 
            return new ValidacionArticulo36A(repository);    
        }

        return null;
    }

    

}