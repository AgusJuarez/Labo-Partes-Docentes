package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.HorariosDTO;
import unpsjb.labprog.backend.model.Designacion;

@Service
public class CalendarioService {
    
    @Autowired
    CargoService cargoService;

    @Autowired
    DesignacionService designacionService;

    @Autowired
    LicenciaService licenciaService;

    

    @Transactional
    public List<HorariosDTO> findByTurno(String turno, String anio, String numero) {
        List<Cargo> cargos = new ArrayList<Cargo>();

        if(anio == null || anio.isEmpty() && (numero == null || numero.isEmpty())) {
            cargos = cargoService.findByTurno(turno.toLowerCase());
        } else {
            cargos = cargoService.findByTurnoAnioNumero(turno.toLowerCase(), anio, numero);
        }

        List<HorariosDTO> response = new ArrayList<HorariosDTO>();
        
        LocalDate fechaActual = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fechaFormateada = fechaActual.format(formatter);
        
        for(Cargo cargo : cargos) {
            Designacion designacion = designacionService.findByCargo(cargo);
            
            if(designacion == null){
                response.add(new HorariosDTO(cargo, designacion, false, null));
            } else {
                response.add(new HorariosDTO(cargo, designacion, licenciaService.estaDeLicencia(designacion.getPersona().getId(), fechaFormateada), designacionService.existeSuplencia(designacion.getCargo(), designacion.getPersona().getId(), fechaFormateada)));
            }
            
        }

        return response;
    }

    
}