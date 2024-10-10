package unpsjb.labprog.backend.model;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String cuit;

    private String dni;
    private String nombre;
    private String apellido;
    private String titulo;
    private String sexo;
    private String domicilio;
    private String telefono;

    @JsonIgnore
    @OneToMany
    List<Designacion> designaciones;
}