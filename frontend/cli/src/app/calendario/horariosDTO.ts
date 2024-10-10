import { Cargo } from "../cargo/cargo";
import { Designacion } from "../designacion/designacion";

export interface HorariosDTO {
  cargo: Cargo;
  designacion: Designacion;
  estaDeLicencia: boolean;
  reemplazo: Designacion;
}
