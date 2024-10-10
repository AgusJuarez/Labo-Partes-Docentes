package unpsjb.labprog.backend.model;

import java.sql.Date;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Designacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String situacionRevista;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date fechaFin;

    @ManyToOne
    private Cargo cargo;

    @ManyToOne
    private Persona persona;

    private boolean estado;

    private String anotacion;

    private List<String> anotaciones;
}