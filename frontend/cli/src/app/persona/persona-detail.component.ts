import { Location, UpperCasePipe } from "@angular/common";
import { Component, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Persona } from "./persona";
import { PersonaService } from "./persona.service";
import { DataPackage } from "../data-package";
import { FormControl, FormsModule, Validators } from "@angular/forms";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "../modal/modal.service";

@Component({
  selector: "app-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UpperCasePipe,
    FormsModule,
    NgbTypeaheadModule,
  ],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div *ngIf="persona">
        <h2>Nueva Persona:</h2>
        <form #form="ngForm">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="nombre">Nombre:</label>
                  <input
                    [(ngModel)]="persona.nombre"
                    class="form-control"
                    placeholder="Nombre"
                    required
                    name="nombre"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="apellido">Apellido</label>
                  <input
                    [(ngModel)]="persona.apellido"
                    name="apellido"
                    placeholder="Apellido"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="dni">Dni:</label>
                    <input
                      [(ngModel)]="persona.dni"
                      name="dni"
                      placeholder="Dni"
                      class="form-control"
                      required
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="cuit">Cuit</label>
                    <input
                      [(ngModel)]="persona.cuit"
                      name="cuit"
                      placeholder="Cuit"
                      class="form-control"
                      (input)="comprobarPersonaExistente()"
                      required
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="sexo">Sexo</label>
                    <select
                      [(ngModel)]="persona.sexo"
                      class="form-control"
                      id="sexo"
                      name="Sexo"
                      required
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="titulo">Titulo:</label>
                    <input
                      [(ngModel)]="persona.titulo"
                      name="titulo"
                      placeholder="titulo"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="domicilio">Domicilio</label>
                    <input
                      [(ngModel)]="persona.domicilio"
                      name="domicilio"
                      placeholder="Domicilio"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="telefono">Telefono</label>
                    <input
                      [(ngModel)]="persona.telefono"
                      name="telefono"
                      placeholder="Telefono"
                      class="form-control"
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button (click)="goBack()" class="btn btn-danger">Atrás</button>
          &nbsp;

          <button
            (click)="save()"
            [disabled]="form.invalid || personaExiste"
            class="btn btn-success"
          >
            Guardar
          </button>
          <div *ngIf="persona">
            <div *ngIf="personaExiste" class="alert alert-danger">
              La persona con cuil {{ persona.cuit }} ya existe. Nombre:
              {{ personaExiste.nombre + " " + personaExiste.apellido }}
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class PersonaDetailComponent {
  persona!: Persona;
  personaExiste: Persona | undefined;
  mensaje!: { texto: string; tipo: string };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private personaService: PersonaService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.persona = <Persona>{};
    } else {
      this.personaService
        .get(+id)
        .subscribe((dataPackage) => (this.persona = <Persona>dataPackage.data));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    this.personaService.save(this.persona).subscribe((dataPackage) => {
      this.persona = <Persona>dataPackage.data;
      if (dataPackage.status == 200) {
        that.modalService.success(
          "Notificación",
          "Detalles sobre Persona",
          dataPackage.message
        );
      }
      if (dataPackage.status != 200) {
        that.modalService.error(
          "Notificación",
          "Detalles sobre Persona",
          dataPackage.message
        );
      } else {
        this.goBack();
      }
    });
  }

  comprobarPersonaExistente() {
    this.personaService.existe(this.persona.cuit).subscribe((dataPackage) => {
      this.personaExiste = <Persona>dataPackage.data;
    });
  }

  validarNumeros(event: KeyboardEvent) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
    ];
    if (
      allowedKeys.includes(event.key) ||
      // Permitir números del teclado numérico y las teclas de flecha
      (event.key >= "0" && event.key <= "9") ||
      (event.key >= "Numpad0" && event.key <= "Numpad9")
    ) {
      return;
    }
    event.preventDefault();
  }
}
