export enum CHARACTER {
  M = "Masculino",
  F = "Femenino",
  O = "Otro",
}

export interface Persona {
  id: number;
  dni: BigInt;
  cuit: String[30];
  nombre: String[90];
  apellido: String[90];
  titulo: String[90];
  sexo: CHARACTER;
  domicilio: String[90];
  telefono: String[30];
}
