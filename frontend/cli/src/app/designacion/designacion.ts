import { Cargo } from "../cargo/cargo";
import { Persona } from "../persona/persona";

export interface Designacion {
  id: number;
  situacionRevista: String[45];
  fechaInicio: Date;
  fechaFin: Date;
  persona: Persona;
  cargo: Cargo;
  estado: boolean;
  anotacion: string;
  anotaciones: [];
}
