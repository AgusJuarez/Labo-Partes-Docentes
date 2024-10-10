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
import unpsjb.labprog.backend.business.DivisionService;
import unpsjb.labprog.backend.model.Division;

@RestController
@RequestMapping("division") // por este nos conectamos medio internes
public class DivisionPresenter {

    @Autowired
    DivisionService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value="/page", method=RequestMethod.GET)
  public ResponseEntity<Object> findByPage(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "5") int size,
    @RequestParam(required = false , defaultValue = "") String textoBusqueda) {
      return Response.ok(service.findByPage(page,size ,textoBusqueda));
  }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Division divisionOrNull = service.findById(id);
        return (divisionOrNull != null) ? Response.ok(divisionOrNull) : Response.notFound();
    }

    @RequestMapping(value="/division", method=RequestMethod.GET)
  public ResponseEntity<Object> findByAnioNumero(
    @RequestParam(defaultValue = "") String anio,
    @RequestParam(defaultValue = "") String numero) {
        Division divisionOrNull = service.findByAnioNumero(anio, numero);
        return (divisionOrNull != null) ? Response.ok(divisionOrNull, "Division encontrada correctamente")
                : Response.notFound("La Division no existe");
  }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Division division) {
        if (division.getId() == 0) {
            return Response.error("Division no existe, imposible modificar");
        }
        return Response.ok(service.save(division), "Datos de Division actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Division division) {
        try {
            return Response.ok(service.save(division),
                    "División " + division.getAnio() + "º " + division.getNumero() + "º turno " + division.getTurno() + " ingresada correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "División " + division.getAnio() + "º " + division.getNumero() + "º turno " + division.getTurno() + " ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    try {
      return Response.ok(service.delete(id),"Division " + id + " borrada con exito");
    } catch(DataIntegrityViolationException e) {
      return Response.error("No se puede eliminar la division porque esta siendo utilizado en otro lugar.");
   }
    //Division aDivisionOrNull = service.findById(id);
    //return (aDivisionOrNull != null) ? Response.ok(service.delete(id), "Division eliminada") :
    //Response.notFound("No se puede eliminar");
    }
}