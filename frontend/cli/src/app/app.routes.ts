import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PersonasComponent } from "./persona/persona.component";
import { PersonaDetailComponent } from "./persona/persona-detail.component";
import { DivisionDetailComponent } from "./division/division-detail.component";
import { DivisionComponent } from "./division/division.component";
import { CargoComponent } from "./cargo/cargo.component";
import { CargoDetailComponent } from "./cargo/cargo-detail.component";
import { DesignacionComponent } from "./designacion/designacion.component";
import { DesignacionDetailComponent } from "./designacion/designacion-detail.component";
import { LicenciaComponent } from "./licencia/licencia.component";
import { LicenciaDetailComponent } from "./licencia/licencia-detail.component";
import { ParteDiarioComponent } from "./licencia/parte-diario.component";
import { CalendarioComponent } from "./calendario/calendario.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "personas", component: PersonasComponent },
  { path: "personas/:id", component: PersonaDetailComponent },
  { path: "division", component: DivisionComponent },
  { path: "division/:id", component: DivisionDetailComponent },
  { path: "cargo", component: CargoComponent },
  { path: "cargo/:id", component: CargoDetailComponent },
  { path: "designacion", component: DesignacionComponent },
  { path: "designacion/:id", component: DesignacionDetailComponent },
  { path: "licencia", component: LicenciaComponent },
  { path: "licencia/:id", component: LicenciaDetailComponent },
  { path: "parteDiario", component: ParteDiarioComponent },
  { path: "calendario", component: CalendarioComponent },
];
