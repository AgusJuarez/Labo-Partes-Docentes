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
public class HorariosDTO {

    public HorariosDTO(Cargo cargo, Designacion designacion, boolean estaDeLicencia, Designacion reemplazo){
        this.cargo = cargo;
        this.designacion = designacion;
        this.estaDeLicencia = estaDeLicencia;
        this.reemplazo = reemplazo;
    }

    private boolean estaDeLicencia;
    private Designacion reemplazo;
    private Cargo cargo;
    private Designacion designacion;

}