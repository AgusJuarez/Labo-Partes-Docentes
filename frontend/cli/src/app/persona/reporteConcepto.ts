import { Designacion } from "../designacion/designacion";
import { Licencia } from "../licencia/licencia";
import { Persona } from "./persona";

export interface ReporteConcepto {
  persona: Persona;
  licencias: Licencia[];
  designaciones: Designacion[];
  cantidadDiasEnLicencia: number;
  cantidadLicenciasOtorgadas: number;
  cantidadLicenciasNoOtorgadas: number;
  cantidadDesignacionesOtorgadas: number;
  cantidadDesignacionesNoOtorgadas: number;
}
