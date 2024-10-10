package unpsjb.labprog.backend.business.ControlLicencia;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.model.Licencia;
import java.util.List;

public interface ValidadorArticulo {
    
    public List<String> validador(Licencia licencia);
}