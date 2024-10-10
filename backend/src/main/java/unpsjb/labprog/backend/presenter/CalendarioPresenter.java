package unpsjb.labprog.backend.presenter;

import java.util.List;

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
import unpsjb.labprog.backend.business.CargoService;
import unpsjb.labprog.backend.business.CalendarioService;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.TipoDesignacion;
import unpsjb.labprog.backend.model.HorariosDTO;
@RestController
@RequestMapping("calendario")
public class CalendarioPresenter {
    
    @Autowired
    CargoService cargoService;

    @Autowired
    CalendarioService calendarioService;

@RequestMapping(value = "/{turno}/{anio}/{numero}", method = RequestMethod.GET)
public ResponseEntity<Object> getCalendario(@PathVariable("turno") String turno, 
                                            @PathVariable(value = "anio", required = false) String anio, 
                                            @PathVariable(value = "numero", required = false) String numero) {
    List<HorariosDTO> horariosOrNull = calendarioService.findByTurno(turno, anio, numero);
    return (horariosOrNull != null) ? Response.ok(horariosOrNull) : Response.notFound();
}

@RequestMapping(value = "/{turno}", method = RequestMethod.GET)
public ResponseEntity<Object> getCalendario(@PathVariable("turno") String turno){
    List<HorariosDTO> horariosOrNull = calendarioService.findByTurno(turno, null, null);
    return (horariosOrNull != null) ? Response.ok(horariosOrNull) : Response.notFound();
}




    
}