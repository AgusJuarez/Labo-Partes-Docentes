package unpsjb.labprog.backend.model;

import java.sql.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cargo", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "nombre" })
})
@Getter
@Setter
@NoArgsConstructor
public class Cargo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String nombre;
    private int cargaHoraria;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date fechaFin;

    @ManyToOne(optional=true)
    private Division division;

    @Enumerated(EnumType.STRING)
    private TipoDesignacion tipo;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<Horario> horarios;
    
}