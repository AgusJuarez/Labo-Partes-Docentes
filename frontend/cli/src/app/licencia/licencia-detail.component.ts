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
import { Licencia } from "./licencia";
import { LicenciaService } from "./licencia.service";
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
import { Articulo } from "../articulo/articulo";
import { ArticuloService } from "../articulo/articulo.service";

@Component({
  selector: "app-detail",
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule, NgbTypeaheadModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div *ngIf="licencia">
        <h2>
          Nueva Licencia&nbsp;
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
        <div
          *ngIf="alertMessage"
          class="alert"
          [ngClass]="'alert-' + alertType"
        >
          {{ alertMessage }}
        </div>
        <form #form="ngForm">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="name">Persona:</label>
                  <br />
                  <input
                    [(ngModel)]="licencia.persona"
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
                    <div>{{ licencia.persona.dni }}</div>
                  </div>
                  <div class="col">
                    <div>{{ licencia.persona.nombre }}</div>
                  </div>
                  <div class="col">
                    <div>{{ licencia.persona.apellido }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>&nbsp;</div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="name">Licencia:</label>
                  <br />
                  <input
                    [(ngModel)]="licencia.articulo"
                    name="articulo"
                    placeholder="Articulo"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchArticulo"
                    [editable]="false"
                    [resultFormatter]="resultFormatArticulo"
                    [inputFormatter]="inputFormatArticulo"
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
                    <div>Articulo</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>{{ licencia.articulo.articulo }}</div>
                  </div>
                  <div class="col">
                    <div>{{ licencia.articulo.descripcion }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="pedidoDesde">Vigente desde: </label>
                  <label>
                    <input
                      [(ngModel)]="licencia.pedidoDesde"
                      type="date"
                      name="pedido desde"
                      pattern="yyyy-MM-dd"
                      [max]="licencia.pedidoHasta"
                    />
                  </label>
                  <label for="pedidoHasta ">Vigente hasta: </label>
                  <label>
                    <input
                      [(ngModel)]="licencia.pedidoHasta"
                      type="date"
                      name="vigente desde"
                      pattern="yyyy-MM-dd"
                      [min]="licencia.pedidoDesde"
                    />
                  </label>
                </div>
              </div>
              <div>&nbsp;</div>
            </div>
            <div class="row">
              <div class="col">
                <label for="certificadoMedico"
                  >Presenta Certificado Médico:&nbsp;</label
                >
                <input
                  type="checkbox"
                  [(ngModel)]="licencia.certificadoMedico"
                  name="certificadoMedico"
                />
              </div>
              <!-- <div class="col">
                <label for="otorgarDeTodasManeras"
                  >Otorgar de todas maneras:&nbsp;</label
                >
                <input
                  type="checkbox"
                  [(ngModel)]="otorgarDeTodasManeras"
                  name="otorgarDeTodasManeras"
                />
              </div> -->
            </div>
            <div>&nbsp;</div>
            <div
              class="row"
              *ngFor="let anotacion of licencia.anotaciones; index as i"
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
        </form>
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
export class LicenciaDetailComponent {
  licencia!: Licencia;
  personas: Persona[] = [];
  cargos: Cargo[] = [];
  licenciaes: Licencia[] = [];

  searching: boolean = false;
  searchFailed: boolean = false;
  respuesta: string | undefined;
  dataError!: DataPackage;
  licenciasExiste: Licencia[] = [];
  licenciaExiste: Licencia | undefined;
  alertMessage: string = "";
  alertType: string = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private licenciaService: LicenciaService,
    private personaService: PersonaService,
    private cargoService: CargoService,
    private modalService: ModalService,
    private articuloService: ArticuloService
  ) {
    this.respuesta = "";
  }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.licencia = <Licencia>{};
    } else {
      this.licenciaService
        .get(+id)
        .subscribe(
          (dataPackage) => (this.licencia = <Licencia>dataPackage.data)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    if (
      this.licencia.pedidoDesde &&
      this.licencia.pedidoHasta &&
      this.licencia.pedidoHasta <= this.licencia.pedidoDesde
    ) {
      this.alertMessage =
        "La fecha de fin debe ser posterior a la fecha de inicio.";
      this.alertType = "danger";
      return;
    }
    this.licenciaService.save(this.licencia).subscribe((dataPackage) => {
      if (dataPackage.status == 200) {
        this.alertMessage = dataPackage.message;
        this.alertType = "success";
        this.modalService.success(
          "Notificación",
          "Detalles sobre Licencia",
          dataPackage.message
        );
      } else {
        this.alertMessage = dataPackage.message;
        this.alertType = "danger";
        this.modalService.error(
          "Notificación",
          "Detalles sobre Licencia",
          dataPackage.message
        );
      }
      /* if (dataPackage.status == 200) {
        that.modalService.error(
          "Notificación",
          "Detalles sobre Licencia",
          dataPackage.message
        );
      } else {
        this.goBack();
      } */
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

  searchArticulo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.articuloService
          .search(term)
          .pipe(map((response) => <Articulo[]>response.data))
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

  resultFormatArticulo(value: any) {
    return `${value.articulo} - ${value.descripcion}`;
  }

  inputFormatArticulo(value: any) {
    return `${value?.articulo} - ${value?.descripcion}`;
  }
}
