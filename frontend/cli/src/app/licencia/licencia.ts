import { Articulo } from "../articulo/articulo";
import { Designacion } from "../designacion/designacion";
import { Persona } from "../persona/persona";

export interface Licencia {
  id: number;
  pedidoDesde: Date;
  pedidoHasta: Date;
  domicilio: String[90];
  certificadoMedico: boolean;
  persona: Persona;
  articulo: Articulo;
  designacion: Designacion;
  estado: boolean;
  anotacion: string;
  anotaciones: [];
}
