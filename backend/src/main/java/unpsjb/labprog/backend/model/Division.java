package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "division", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "anio", "numero"})
})
@Getter
@Setter
@NoArgsConstructor
public class Division {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    private String anio;

    private String numero;

    private String orientacion;

    private String turno;
}