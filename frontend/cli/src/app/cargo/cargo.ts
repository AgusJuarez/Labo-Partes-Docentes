import { Division } from "../division/division";
import { Horario } from "../horario/horario";

export enum TIPOS {
  cargo = "CARGO",
  espacio = "ESPACIO CURRICULAR",
}

export interface Cargo {
  id: number;
  nombre: String;
  tipo: TIPOS;
  fechaInicio: Date; //probar a cambiar calendar
  fechaFin: Date;
  cargaHoraria: number;
  division: Division | null;
  horarios: Horario[];
}
