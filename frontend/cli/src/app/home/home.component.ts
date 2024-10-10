import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Bienvenido a Print the Parte Docente!</h1>
        <p class="lead">Do Re Mi Fa Sol La Si, eso es el amor para mi</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
