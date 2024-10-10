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

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Licencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date pedidoDesde;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date pedidoHasta;

    private boolean certificadoMedico;

    @ManyToOne
    private Persona persona;

    @ManyToOne
    private ArticuloLicencia articulo;

    @JsonIgnore
    @ManyToMany
    private List<Designacion> designacion;

    private boolean estado;

    private String anotacion;

    private List<String> anotaciones;
}