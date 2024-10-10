package unpsjb.labprog.backend.model;

import java.sql.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReporteConcepto {

    private Persona persona;

    private List<Licencia> licencias;

    private List<Designacion> designaciones;

    private int cantidadDiasEnLicencia;
    private int cantidadLicenciasOtorgadas;
    private int cantidadLicenciasNoOtorgadas;
    private int cantidadDesignacionesOtorgadas;
    private int cantidadDesignacionesNoOtorgadas;

}