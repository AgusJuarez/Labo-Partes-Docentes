package unpsjb.labprog.backend.presenter;

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
import unpsjb.labprog.backend.business.PersonaService;
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.model.ReporteConcepto;

@RestController
@RequestMapping("personas") // por este nos conectamos medio internes
public class PersonaPresenter {

    @Autowired
    PersonaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value="/page", method=RequestMethod.GET)
  public ResponseEntity<Object> findByPage(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "5") int size,
    @RequestParam(defaultValue = "apellido") String atributo,
    @RequestParam(required = false , defaultValue = "") String textoBusqueda) {
      return Response.ok(service.findByPage(page,size, atributo,textoBusqueda));
  }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Persona personaOrNull = service.findById(id);
        return (personaOrNull != null) ? Response.ok(personaOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/dni/{dni}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByDni(@PathVariable("dni") String dni) {
        Persona personaOrNull = service.findByDni(dni);
        return (personaOrNull != null) ? Response.ok(personaOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByCuit(@PathVariable("code") String cuit) {
        Persona personaOrNull = service.findByCuit(cuit);
        return (personaOrNull != null) ? Response.ok(personaOrNull, "Persona encontrada correctamente")
                : Response.notFound("La persona no existe");
    }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Persona persona) {
        if (persona.getId() == 0) {
            return Response.error("Persona no existe, imposible modificar");
        }
        return Response.ok(service.save(persona), "Datos de persona actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Persona persona) {
        try {
            return Response.ok(service.save(persona),
                    persona.getNombre() + " " + persona.getApellido() + " con DNI "
                            + persona.getDni() + " ingresado/a correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "La persona con el id " + persona.getId()
                    + " ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    Persona apersonaOrNull = service.findById(id);
    return (apersonaOrNull != null) ? Response.ok(service.delete(id), "Persona eliminada exitosamente.") :
    Response.notFound("No se puede eliminar.");
    }

    @RequestMapping(value = "/reporteConcepto/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> crearReporteConcepto(@PathVariable("id") int id) {
        ReporteConcepto reporteOrNull = service.reporteConcepto(id);
        return (reporteOrNull != null) ? Response.ok(reporteOrNull) : Response.notFound();
    }
}