import {
  Location,
  JsonPipe,
  CommonModule,
  UpperCasePipe,
} from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataPackage } from "../data-package";
import { Designacion } from "./designacion";
import { DesignacionService } from "./designacion.service";
import { PersonaService } from "../persona/persona.service";
import { Persona } from "../persona/persona";
import { Cargo } from "../cargo/cargo";
import { CargoService } from "../cargo/cargo.service";
import { Observable, Subject, merge, OperatorFunction, of } from "rxjs";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import { ModalService } from "../modal/modal.service";

@Component({
  selector: "app-detail",
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule, NgbTypeaheadModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div *ngIf="designacion">
        <form #form="ngForm">
          <h2>
            Nueva designacion&nbsp;
            <button
              (click)="save()"
              [disabled]="!form.invalid"
              class="btn btn-success"
            >
              Guardar
            </button>
            &nbsp;
            <button (click)="goBack()" class="btn btn-danger">Atrás</button>
          </h2>
          <!-- Mensaje de alerta -->
          <div
            *ngIf="alertMessage"
            class="alert"
            [ngClass]="'alert-' + alertType"
          >
            {{ alertMessage }}
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="name">Persona:</label>
                  <br />
                  <input
                    [(ngModel)]="designacion.persona"
                    name="Persona"
                    placeholder="Persona"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchPersona"
                    [editable]="false"
                    [resultFormatter]="resultFormatPersona"
                    [inputFormatter]="inputFormatPersona"
                    type="text"
                  />
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div>DNI</div>
                  </div>
                  <div class="col">
                    <div>Nombre</div>
                  </div>
                  <div class="col">
                    <div>Apellido</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>{{ designacion.persona.dni }}</div>
                  </div>
                  <div class="col">
                    <div>{{ designacion.persona.nombre }}</div>
                  </div>
                  <div class="col">
                    <div>{{ designacion.persona.apellido }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>&nbsp;</div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="name">Cargo:</label>
                  <br />
                  <input
                    [(ngModel)]="designacion.cargo"
                    name="Cargo"
                    placeholder="Cargo"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchCargo"
                    [editable]="false"
                    [resultFormatter]="resultFormatCargo"
                    [inputFormatter]="inputFormatCargo"
                    type="text"
                  />
                </div>
              </div>

              <div class="col">
                <div class="row">
                  <div class="col">
                    <div>Tipo</div>
                  </div>
                  <div class="col">
                    <div>Nombre</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>{{ designacion.cargo.tipo }}</div>
                  </div>
                  <div class="col">
                    <div>{{ designacion.cargo.nombre }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>&nbsp;</div>
            <div class="row">
              <div class="col">
                <label
                  >Carga Horaria: {{ designacion.cargo.cargaHoraria }}</label
                >
              </div>
              <div class="col">
                <label>Año: {{ designacion.cargo.division?.anio }}</label>
              </div>
              <div class="col">
                <label>Numero: {{ designacion.cargo.division?.numero }}</label>
              </div>
              <div class="col">
                <label>Turno: {{ designacion.cargo.division?.turno }}</label>
              </div>
            </div>
            <div>&nbsp;</div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="vigenteDesde">Vigente desde: </label>
                  <label>
                    <input
                      [(ngModel)]="designacion.fechaInicio"
                      type="date"
                      name="vigente desde"
                      pattern="yyyy-MM-dd"
                      (input)="comprobarDesignacionExistente()"
                      [max]="designacion.fechaFin"
                    />
                  </label>
                  <label for="vigenteHasta ">Vigente hasta: </label>
                  <label>
                    <input
                      [(ngModel)]="designacion.fechaFin"
                      type="date"
                      name="vigente desde"
                      pattern="yyyy-MM-dd"
                      (input)="comprobarDesignacionExistente()"
                      [min]="designacion.fechaInicio"
                    />
                  </label>
                </div>
              </div>
              <div>&nbsp;</div>
            </div>
          </div>
        </form>
        <div
          class="row"
          *ngFor="let anotacion of designacion.anotaciones; index as i"
        >
          <div class="col">
            <div
              style="background-color: rgb(204, 194, 194); border-radius: 10px; padding: 10px; width:70%;"
            >
              <h5>{{ anotacion }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `.alert {
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  
  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }`,
})
export class DesignacionDetailComponent {
  designacion!: Designacion;
  personas: Persona[] = [];
  cargos: Cargo[] = [];
  designaciones: Designacion[] = [];

  searching: boolean = false;
  searchFailed: boolean = false;
  respuesta: string | undefined;
  dataError!: DataPackage;
  designacionesExiste: Designacion[] = [];
  designacionExiste: Designacion | undefined;
  alertMessage: string = "";
  alertType: string = "";
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private designacionService: DesignacionService,
    private personaService: PersonaService,
    private cargoService: CargoService,
    private modalService: ModalService
  ) {
    this.respuesta = "";
  }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.designacion = <Designacion>{};
    } else {
      this.designacionService
        .get(+id)
        .subscribe(
          (dataPackage) => (this.designacion = <Designacion>dataPackage.data)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    if (this.designacion.fechaFin <= this.designacion.fechaInicio) {
      this.alertMessage =
        "La fecha de fin debe ser posterior a la fecha de inicio.";
      this.alertType = "danger";
      return;
    }
    this.designacionService.save(this.designacion).subscribe((dataPackage) => {
      this.designacion = <Designacion>dataPackage.data;
      if (dataPackage.status == 200) {
        this.alertMessage = dataPackage.message;
        this.alertType = "success";
        this.modalService.success(
          "Notificación",
          "Detalles sobre Designación",
          dataPackage.message
        );
      } else {
        this.alertMessage = dataPackage.message;
        this.alertType = "danger";
        this.modalService.error(
          "Notificación",
          "Detalles sobre Designación",
          dataPackage.message
        );
      }
    });
  }

  searchPersona = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.personaService
          .search(term)
          .pipe(map((response) => <Persona[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatPersona(value: any) {
    return `${value.nombre} ${value.apellido} - ${value.cuit}`;
  }

  inputFormatPersona(value: any) {
    return `${value?.nombre} ${value?.apellido} - ${value?.cuit}`;
  }

  searchCargo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.cargoService
          .search(term)
          .pipe(map((response) => <Persona[]>response.data))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatCargo(value: any) {
    return `${value.nombre} - ${value.tipo}`;
  }

  inputFormatCargo(value: any) {
    return `${value?.nombre} - ${value?.tipo}`;
  }

  comprobarDesignacionExistente() {
    this.designacionService
      .existe(
        this.designacion.cargo.nombre,
        this.designacion.fechaInicio,
        this.designacion.fechaFin
      )
      .subscribe((dataPackage) => {
        this.designacionesExiste = <Designacion[]>dataPackage.data;
        this.designacionExiste = this.designacionesExiste.shift();
      });
  }
}
