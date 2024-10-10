package unpsjb.labprog.backend.presenter;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.business.PersonaService;
import unpsjb.labprog.backend.business.DivisionService;
import unpsjb.labprog.backend.business.CargoService;
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.TipoDesignacion;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import unpsjb.labprog.backend.business.ControlDesignacion.ValidacionDesignacion;

@RestController
@RequestMapping("designacion") // por este nos conectamos medio internes
public class DesignacionPresenter {

    @Autowired
    DesignacionService service;
    @Autowired
    PersonaService personaService;
    @Autowired
    DivisionService divisionService;
    @Autowired
    CargoService cargoService;
    @Autowired
    LicenciaService licenciaService;

    @Autowired
    ValidacionDesignacion validadorDesignacion;

    private static final Logger logger = LoggerFactory.getLogger(DesignacionPresenter.class);

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value="/page", method=RequestMethod.GET)
  public ResponseEntity<Object> findByPage(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "7") int size,
    @RequestParam(required = false , defaultValue = "") String textoBusqueda) {
      return Response.ok(service.findByPage(page,size, textoBusqueda));
  }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Designacion designacionOrNull = service.findById(id);
        return (designacionOrNull != null) ? Response.ok(designacionOrNull) : Response.notFound();
    }


    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Designacion designacion) {
        if (designacion.getId() == 0) {
            return Response.error("Designacion no existe, imposible modificar");
        }
        return Response.ok(service.save(designacion), "Datos de Designacion actualizada correctamente");

    }

    @RequestMapping(value="/existe", method=RequestMethod.GET)
    public ResponseEntity<Object> existeDesignacion(
    @RequestParam(defaultValue = "") String cargo,
    @RequestParam(defaultValue = "") Date fechaInicio,
    @RequestParam(defaultValue = "") Date fechaFin) {
        Cargo cargoExiste = cargoService.findByName(cargo);
      return Response.ok(service.consultarFecha(cargoExiste, fechaInicio, fechaFin));
  }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Designacion designacion) {
        try {
            String response = validadorDesignacion.validador(designacion);
            return Response.response(HttpStatus.OK, response, null);          
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "Designacion no se pudo otorgar. Error", null);
        }

    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    Designacion aDesignacionOrNull = service.findById(id);
    return (aDesignacionOrNull != null) ? Response.ok(service.delete(id), "Designacion eliminada exitosamente.") :
    Response.notFound("No se puede eliminar.");
    }
}