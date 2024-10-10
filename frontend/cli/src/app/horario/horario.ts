import { Time } from "@angular/common";
import { Cargo } from "../cargo/cargo";

export interface Horario {
  id: number;
  dia: string;
  horaInicio: Date;
  horaFin: Date;
}
