export enum Turnos {
  manana = "mañana",
  tarde = "tarde",
  vespertino = "vespertino",
  noche = "noche",
}

export interface Division {
  id: number;
  anio: number;
  numero: number;
  orientacion: string;
  turno: Turnos;
}
