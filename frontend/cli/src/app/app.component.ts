import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal">
        Print the Parte docente
      </h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <div class="container">
          <div class="row">
            <div class="col">
              <a class="p-2 text-dark" href="/">Home</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/personas">Personas</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/division">Divisiones</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/cargo">Cargos</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/designacion">Designaciones</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/licencia">Licencias</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/parteDiario">Parte Diario</a>
            </div>
            <div class="col">
              <a class="p-2 text-dark" href="/calendario">Calendario</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "Bordero";
}
