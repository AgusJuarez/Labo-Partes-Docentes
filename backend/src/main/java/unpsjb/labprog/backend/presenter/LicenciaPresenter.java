package unpsjb.labprog.backend.presenter;

import java.sql.Date;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import unpsjb.labprog.backend.business.ControlLicencia.ValidacionLicencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("licencia")
public class LicenciaPresenter {
    
    @Autowired
    LicenciaService service;
    
    @Autowired
    ValidacionLicencia validadorLicencia;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Licencia licenciaOrNull = service.findById(id);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Licencia Licencia) {

        if (Licencia.getId() == 0) {
            return Response.error("la Licencia no existe, imposible modificar");
        }
        return Response.ok(service.save(Licencia), "Datos de la Licencia actualizados correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Licencia licencia) {
        try {
            String response = validadorLicencia.validador(licencia);
            return Response.response(HttpStatus.OK, response, null);          
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "Licencia no se pudo otorgar. Error", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    Licencia licencia = service.findById(id);
    return (licencia != null) ? Response.ok(service.delete(id), "licencia eliminada") : Response.error("algo salio mal");
    }

    @RequestMapping(value="/page", method=RequestMethod.GET)
  public ResponseEntity<Object> findByPage(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "7") int size,
    @RequestParam(required = false , defaultValue = "") String textoBusqueda) {
      return Response.ok(service.findByPage(page,size, textoBusqueda));
  }

   @RequestMapping(value = "/{persona}/{articulo}/{desde}/{hasta}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByPADH(@PathVariable("persona") int personaId, @PathVariable("articulo") int articuloId,
                                            @PathVariable("desde") Date desde, @PathVariable("hasta") Date hasta) {
        Optional<Licencia> licenciaOrNull = service.findByPADH(personaId, articuloId, desde, hasta);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/parteDiario/{fecha}", method = RequestMethod.GET)
    public ResponseEntity<Object> parteDiario(@PathVariable("fecha") String fecha) throws ParseException {
        List<Licencia> licenciaOrNull = service.parteDiario(fecha);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }
}