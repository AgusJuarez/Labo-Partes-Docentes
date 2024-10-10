package unpsjb.labprog.backend.presenter;

import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.HorarioService;
import unpsjb.labprog.backend.model.Horario;

@RestController
@RequestMapping("horario")
public class HorarioPresenter {
    
    @Autowired
    HorarioService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Horario horarioOrNull = service.findById(id);
        return (horarioOrNull != null) ? Response.ok(horarioOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/semana", method = RequestMethod.GET)
    public ResponseEntity<Object> findSemana() {
        List<Horario> horarioOrNull = service.findSemana();
        return Response.ok(horarioOrNull);
    }

    @RequestMapping(value = "/horarios", method = RequestMethod.GET)
    public ResponseEntity<Object> horarios() {
        List<LocalTime> horarioOrNull = service.horarios();
        return Response.ok(horarioOrNull);
    }

    @RequestMapping(value = "/dia/{dia}", method = RequestMethod.GET)
    public ResponseEntity<Object> findDiaSemana(@PathVariable("dia") String dia) {
        Horario horarioOrNull = service.findDiaSemana(dia);
        return Response.ok(horarioOrNull);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Horario horario) {
        return Response.ok(service.save(horario), "Dia ingresado correctamente");
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        Horario horario = service.findById(id);
        return (horario != null) ? Response.ok(service.delete(id), "horario eliminado")
                : Response.error("algo salio mal");
    }
}