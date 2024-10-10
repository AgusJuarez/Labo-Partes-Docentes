import { Location, Time } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "../pagination/pagination.component";
import { RouterModule } from "@angular/router";
import { Cargo, TIPOS } from "./cargo";
import { DataPackage } from "../data-package";
import { CargoService } from "./cargo.service";
import { Division, Turnos } from "../division/division";
import { DivisionService } from "../division/division.service";
import { ModalService } from "../modal/modal.service";
import { Horario } from "../horario/horario";
import { HorarioService } from "../horario/horario.service";
import { UpperCasePipe } from "@angular/common";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";

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
      <div *ngIf="cargo">
        <h2>
          Nuevo Cargo&nbsp;
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
        <form #form="ngForm">
          <div class="container">
            <div class="row my-3">
              <div class="col">
                <div class="form-group">
                  <label for="nombre">Nombre:</label>
                  <input
                    [(ngModel)]="cargo.nombre"
                    name="nombre"
                    placeholder="nombre"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="name">Tipo</label>
                  <select
                    [(ngModel)]="cargo.tipo"
                    class="form-control"
                    name="tipo"
                    (change)="divisionDisabled = cargo.tipo === 'CARGO'"
                    required
                  >
                    <option value="CARGO">CARGO</option>
                    <option value="ESPACIO_CURRICULAR">
                      ESPACIO CURRICULAR
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="cargaHoraria">Carga horaria:</label>
                  <input
                    [(ngModel)]="cargo.cargaHoraria"
                    name="cargaHoraria"
                    placeholder="cargaHoraria"
                    class="form-control"
                    required
                    (keydown)="validarNumeros($event)"
                  />
                </div>
              </div>
            </div>

            <div class="row my-3">
              <div class="col">
                <div class="form-group">
                  <label for="vigente desde">Vigente desde: </label>
                  <input
                    [(ngModel)]="cargo.fechaInicio"
                    type="date"
                    name="vigente desde"
                    pattern="yyyy-MM-dd"
                    [max]="cargo.fechaFin"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="vigente hasta ">Vigente hasta: </label>
                  <input
                    [(ngModel)]="cargo.fechaFin"
                    type="date"
                    name="vigente desde"
                    pattern="yyyy-MM-dd"
                    [min]="cargo.fechaInicio"
                  />
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col">
                <div class="form-group">
                  <label for="division">División:</label>
                  <!-- <input
                    [(ngModel)]="cargo.division"
                    name="Division"
                    placeholder="Division"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchDivision"
                    [editable]="false"
                    [resultFormatter]="resultFormatDivision"
                    [inputFormatter]="inputFormatDivision"
                    type="text"
                  /> -->
                  <select
                    [(ngModel)]="cargo.division"
                    name="division"
                    class="form-control"
                    [disabled]="divisionDisabled"
                    (ngModelChange)="generarHorarios()"
                  >
                    <option
                      *ngFor="let division of divisiones"
                      [ngValue]="division"
                    >
                      {{
                        division.anio +
                          "° " +
                          division.numero +
                          "° " +
                          division.orientacion +
                          "-" +
                          division.turno
                      }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <div>año</div>
                  </div>
                  <div class="col">
                    <div>Numero</div>
                  </div>
                  <div class="col">
                    <div>Turno</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>°{{ cargo.division?.anio }}</div>
                  </div>
                  <div class="col">
                    <div>°{{ cargo.division?.numero }}</div>
                  </div>
                  <div class="col">
                    <div>{{ cargo.division?.turno }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <form>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dia</th>
                  <th>Hora inicio</th>
                  <th>Hora fin</th>
                  <th>
                    <button (click)="addHorario()" class="btn btn-success">
                      Agregar
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let h of cargo.horarios; index as i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <select
                      name="dia{{ i }}"
                      class="form-control horario-input"
                      [(ngModel)]="h.dia"
                      [ngModelOptions]="{ standalone: true }"
                      placeholder="Día"
                    >
                      <option>Lunes</option>
                      <option>Martes</option>
                      <option>Miércoles</option>
                      <option>Jueves</option>
                      <option>Viernes</option>
                      <option>Sábado</option>
                      <option>Domingo</option>
                    </select>
                  </td>
                  <td>
                    <select
                      [(ngModel)]="h.horaInicio"
                      type="time"
                      name="horaInicio{{ i }}"
                      [ngModelOptions]="{ standalone: true }"
                      placeholder="Hora"
                      class="form-control horario-input"
                    >
                      <option *ngFor="let hora of horas" [ngValue]="hora">
                        {{ hora }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      [(ngModel)]="h.horaFin"
                      type="time"
                      name="horaFin{{ i }}"
                      [ngModelOptions]="{ standalone: true }"
                      placeholder="Hora"
                      class="form-control horario-input"
                    >
                      <option *ngFor="let hora of horas" [ngValue]="hora">
                        {{ hora }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <button (click)="removeHorario(h)" class="btn btn-default">
                      <i class="fa fa-remove"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
export class CargoDetailComponent {
  cargo!: Cargo;
  divisionDisabled = false;
  divisiones: Division[] = [];
  turnoDivision: string | undefined;
  horarios: Date[] = [];
  horas: string[] = [];
  alertMessage: string = "";
  alertType: string = "";
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cargoService: CargoService,
    private divisionService: DivisionService,
    private modalService: ModalService,
    private horarioService: HorarioService
  ) {}

  ngOnInit() {
    this.get();
    this.getDivisiones();
    this.generarHorarios();
  }

  getDivisiones(): void {
    this.divisionService.all().subscribe((dataPackage) => {
      if (Array.isArray(dataPackage.data)) {
        this.divisiones = dataPackage.data;
      }
    });
  }

  generarHorarios(): void {
    const startTime = new Date();
    this.horarios.splice(0, this.horarios.length);
    this.horas.splice(0, this.horas.length);
    this.turnoDivision = this.cargo.division?.turno;

    if (this.turnoDivision === Turnos.manana) {
      startTime.setHours(8, 0, 0, 0); // 8:00 AM
    } else if (this.turnoDivision === Turnos.tarde) {
      startTime.setHours(13, 0, 0, 0); // 1:00 PM
    } else if (this.turnoDivision === Turnos.vespertino) {
      startTime.setHours(15, 0, 0, 0); // 3:00 PM
    } else if (this.turnoDivision === Turnos.noche) {
      startTime.setHours(19, 0, 0, 0); // 7:00 PM
    }

    for (let i = 0; i < 8; i++) {
      const horario = new Date(startTime.getTime() + i * 40 * 60 * 1000); // 40 minutos en milisegundos
      this.horarios.push(horario);
      this.horas.push(
        horario.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }

  getHorarios() {
    this.horarioService.all().subscribe();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.cargo = <Cargo>{};
      this.cargo.horarios = [];
    } else {
      this.cargoService.get(+id).subscribe((dataPackage) => {
        this.cargo = <Cargo>dataPackage.data;
        if (!this.cargo.horarios) {
          this.cargo.horarios = [];
        }
        // Cargar la división correspondiente
        this.loadDivision(this.cargo.division?.id);
        if (this.cargo.fechaInicio) {
          this.cargo.fechaInicio = new Date(this.cargo.fechaInicio);
        }
        if (this.cargo.fechaFin) {
          this.cargo.fechaFin = new Date(this.cargo.fechaFin);
        }
      });
    }
  }
  loadDivision(divisionId: number | undefined): void {
    if (divisionId) {
      this.divisionService.get(divisionId).subscribe((dataPackage) => {
        if (dataPackage.status === 200) {
          this.cargo.division = <Division>dataPackage.data;
          this.turnoDivision = this.cargo.division?.turno;
          this.generarHorarios();
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    if (
      this.cargo.fechaInicio &&
      this.cargo.fechaFin &&
      this.cargo.fechaFin <= this.cargo.fechaInicio
    ) {
      this.alertMessage =
        "La fecha de fin debe ser posterior a la fecha de inicio.";
      this.alertType = "danger";
      return;
    }
    this.cargoService.save(this.cargo).subscribe((dataPackage) => {
      this.cargo = <Cargo>dataPackage.data;
      if (dataPackage.status == 200) {
        this.alertMessage = dataPackage.message;
        this.alertType = "success";
        this.modalService.success(
          "Notificación",
          "Detalles sobre Cargo",
          dataPackage.message
        );
      } else {
        this.alertMessage = dataPackage.message;
        this.alertType = "danger";
        this.modalService.error(
          "Notificación",
          "Detalles sobre Cargo",
          dataPackage.message
        );
      }
    });
  }

  resultFormatDivision(value: any) {
    return `${value.anio}° ${value.numero}° - ${value.orientacion}`;
  }

  inputFormatDivision(value: any) {
    return `${value?.anio} ${value?.numero} - ${value?.orientacion}`;
  }

  addHorario(): void {
    console.log(this.cargo.horarios);
    this.cargo.horarios = this.cargo.horarios.concat([<Horario>{}]);
    console.log(this.cargo.horarios);
  }

  removeHorario(horario: Horario): void {
    this.modalService
      .confirm(
        "Eliminar horario",
        "¿Está seguro de borrar este horario?",
        "El cambio no se confirmará hasta que no guarde el cargo."
      )
      .then(
        () => {
          let horarios = this.cargo.horarios;
          horarios.splice(horarios.indexOf(horario), 1);
        },
        () => {}
      );
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

  searchDivision = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.divisionService
          .search(term)
          .pipe(map((response) => <Division[]>response.data))
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
}
