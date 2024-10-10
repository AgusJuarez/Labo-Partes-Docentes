package unpsjb.labprog.backend.business.ControlLicencia;

import java.util.ArrayList;
import java.util.List;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.ControlLicencia.ValidadorArticulo;
import unpsjb.labprog.backend.model.Licencia;

import unpsjb.labprog.backend.business.LicenciaService;
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
import unpsjb.labprog.backend.model.Persona;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.RestController;


@Component
public class ValidacionArticulo36A implements ValidadorArticulo{

    private LicenciaRepository repository;

    public ValidacionArticulo36A(LicenciaRepository repository){
        this.repository = repository; 
    }

    @Override
    public List<String> validador(Licencia licencia) {
        String response = "";
        List<String> responses = new ArrayList<String>();

        response = validacionMismosDiasLicencia(licencia);
        if(!response.isEmpty()) {
            responses.add("["+LocalDate.now()+"]" + " " + response);
            response = "";
        }
        response = validacionPersonaTieneCargo(licencia);
        if(!response.isEmpty()) {
            responses.add("["+LocalDate.now()+"]" + " " + response);
            response = "";
        }

       /*  response = validacionMismosDiasLicencia(licencia) != "" ? responses.add("["+LocalDate.now()+"]" + " " + validacionMismosDiasLicencia(licencia)) : "";
        response = validacionPersonaTieneCargo(licencia) != "" ? responses.add("["+LocalDate.now()+"]" + " " + validacionMismosDiasLicencia(licencia)) : "";
         */
        int cantDiasLicenciasAño = cantidadDiasLicenciaEnAnio(licencia) != null ? cantidadDiasLicenciaEnAnio(licencia) : 0;

        int totalDiasLicencias = cantDiasLicenciasAño + cantidadDiasEntreFechas(licencia.getPedidoDesde().toLocalDate(), licencia.getPedidoHasta().toLocalDate());
        
        int cantDiasPorMes = cantidadDiasLicenciaEnMes(licencia) != null ? cantidadDiasLicenciaEnMes(licencia) : 0;
        int cantDiasPedidos = cantidadDiasEntreFechas(licencia.getPedidoDesde().toLocalDate(), licencia.getPedidoHasta().toLocalDate()) + 1;
        int totalDiasEnMes = cantDiasPorMes + cantDiasPedidos;

        if (cantDiasPedidos >= 2){
                responses.add("["+LocalDate.now()+"]" + " " + "NO se otorga Licencia artículo "
                    + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                    + licencia.getPersona().getApellido()
                    + " debido a que pide mas de 1 dia para la licencia");
        }

        if (!(totalDiasEnMes <= 2)) {
            responses.add("["+LocalDate.now()+"]" + " " + "NO se otorga Licencia artículo "
                + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                + licencia.getPersona().getApellido()
                + " debido a que supera el tope de 2 dias de licencias por mes");
        }

        if(!(totalDiasLicencias<=6)){
            responses.add("["+LocalDate.now()+"]" + " " + "NO se otorga Licencia artículo "
                + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                + licencia.getPersona().getApellido()
                + " debido a que supera el tope de 6 dias de licencias por año");
        }

        return responses;
    }

    public String validacionMismosDiasLicencia(Licencia licencia) {
        if(repository.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta())) {  
            return "NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido() + " debido a que ya posee una licencia en el mismo período";
        }
        return "";
    }

    public String validacionPersonaTieneCargo(Licencia licencia) {
        if(!(repository.tieneCargo(licencia.getPersona()))) {
            return "NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido() + " debido a que el agente no posee ningún cargo en la institución"; 
        }
        return "";
    }

    public Integer cantidadDiasLicenciaEnAnio(Licencia licencia) {
        return repository.cantDiasXLicenciasEnAño(licencia.getPersona(), licencia.getPedidoDesde().toString().substring(0, 4), licencia.getArticulo());
    }

    public Integer cantidadDiasEntreFechas(LocalDate pedidoDesde, LocalDate pedidoHasta) {
        return (int)ChronoUnit.DAYS.between(pedidoDesde, pedidoHasta);
    }

    public Integer cantidadDiasLicenciaEnMes(Licencia licencia) {
        return repository.cantDiasXLicenciasEnMes(licencia.getPersona(), licencia.getPedidoDesde().toString().substring(5, 7), licencia.getPedidoDesde().toString().substring(0, 4));
    }

}
