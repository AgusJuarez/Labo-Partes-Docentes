import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpperCasePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarioService } from "./calendario.service";
import { HorariosDTO } from "./horariosDTO";
import { DivisionService } from "../division/division.service";
import { Division } from "../division/division";

@Component({
  selector: "app-calendario",
  standalone: true,
  imports: [CommonModule, UpperCasePipe, FormsModule, NgbTypeaheadModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <label for="turno">Turno:</label>
      <select
        [(ngModel)]="turno"
        id="turno"
        name="turno"
        required
        (ngModelChange)="onTurnoChange()"
      >
        <option value="mañana">Mañana</option>
        <option value="tarde">Tarde</option>
        <option value="vespertino">Vespertino</option>
        <option value="noche">Noche</option>
      </select>
      &nbsp;
      <label for="division">División:</label>
      <select
        [(ngModel)]="division"
        name="division"
        (ngModelChange)="onDivisionChange()"
      >
        <option [ngValue]="undefined">Todas</option>
        <option *ngFor="let division of divisiones" [ngValue]="division">
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
      &nbsp;
      <label class="text-danger">(L)= Licencia</label>
      &nbsp;
      <label class="text-warning">(R)= Reemplazo</label>

      <div class="grid-container">
        <div class="header row">
          <div class="cell"></div>
          <div class="cell" *ngFor="let dia of dias">
            {{ dia }}
          </div>
        </div>
        <div class="row" *ngFor="let horario of horarios; let i = index">
          <div class="cell">
            <ng-container *ngIf="horarios[i + 1] == undefined; else normal">
              Turno {{ i + 1 }} <br />
              {{ horario }}
            </ng-container>
            <ng-template #normal>
              Turno {{ i + 1 }}<br />
              {{ horario + " a " + horarios[i + 1] }}
            </ng-template>
          </div>
          <div class="cell" *ngFor="let dia of dias">
            <div *ngFor="let horarioDTO of getFilteredHorariosDTO()">
              <div *ngFor="let h of horarioDTO.cargo.horarios">
                <div
                  *ngIf="
                    h.dia === dia &&
                    isWithinHorario(horario, h.horaInicio, h.horaFin)
                  "
                  class="horario"
                >
                  <div class="row">
                    <div class="col">
                      {{ horarioDTO.cargo.division?.anio }}°
                      {{ horarioDTO.cargo.division?.numero }}°
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">{{ horarioDTO.cargo.nombre }}</div>
                  </div>
                  <div class="row">
                    <div class="col" *ngIf="horarioDTO.designacion">
                      {{ horarioDTO.designacion.persona.nombre }}
                      {{ horarioDTO.designacion.persona.apellido }}
                      <label
                        *ngIf="horarioDTO.estaDeLicencia"
                        class="text-danger"
                      >
                        (L)
                      </label>
                    </div>
                    <div *ngIf="horarioDTO.reemplazo">
                      <div class="col text-warning">
                        R:
                        {{
                          horarioDTO.reemplazo.persona.nombre +
                            " " +
                            horarioDTO.reemplazo.persona.apellido
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .grid-container {
        display: flex;
        flex-direction: column;
      }

      .header {
        font-weight: bold;
      }

      .row {
        display: flex;
      }

      .cell {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        flex: 1;
      }

      .header .cell {
        background-color: #f0f0f0;
      }

      .horario {
        border-top: 1px solid #ccc;
        margin: 5px 0;
        padding: 5px 0;
      }
    `,
  ],
})
export class CalendarioComponent {
  dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  turno: string = "mañana";
  horariosDTO: HorariosDTO[] = [];
  horarios: string[] = [];
  divisiones: Division[] = [];
  division?: Division;

  constructor(
    private calendarioService: CalendarioService,
    private divisionService: DivisionService
  ) {}

  ngOnInit() {
    this.onTurnoChange();
    this.getDivisiones();
  }

  onTurnoChange(): void {
    this.generarHorarios();
    this.getCalendario();
  }

  onDivisionChange(): void {
    if (this.division) {
      this.turno = this.division.turno;
      this.onTurnoChange();
    }
    this.getCalendario();
  }

  getCalendario(): void {
    const anio = this.division?.anio ? this.division.anio : null;
    const numero = this.division?.numero ? this.division.numero : null;
    this.calendarioService
      .getCargos(this.turno, anio, numero)
      .subscribe((dataPackage) => {
        this.horariosDTO = <HorariosDTO[]>dataPackage.data;
      });
  }

  getDivisiones(): void {
    this.divisionService.all().subscribe((dataPackage) => {
      if (Array.isArray(dataPackage.data)) {
        this.divisiones = dataPackage.data;
      }
    });
  }

  getFilteredHorariosDTO(): HorariosDTO[] {
    if (!this.division) {
      return this.horariosDTO.filter(
        (horarioDTO) => horarioDTO.cargo.division?.turno === this.turno
      );
    }
    return this.horariosDTO.filter(
      (horarioDTO) =>
        horarioDTO.cargo.division?.anio === this.division?.anio &&
        horarioDTO.cargo.division?.numero === this.division?.numero
    );
  }

  generarHorarios(): void {
    const startTime = new Date();
    this.horarios = [];

    switch (this.turno) {
      case "mañana":
        startTime.setHours(8, 0, 0, 0); // 8:00 AM
        break;
      case "tarde":
        startTime.setHours(13, 0, 0, 0); // 1:00 PM
        break;
      case "vespertino":
        startTime.setHours(15, 0, 0, 0); // 3:00 PM
        break;
      case "noche":
        startTime.setHours(19, 0, 0, 0); // 7:00 PM
        break;
    }

    for (let i = 0; i < 8; i++) {
      const horario = new Date(startTime.getTime() + i * 40 * 60 * 1000); // 40 minutos en milisegundos
      this.horarios.push(
        horario.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }

  formatTime(time: string | Date): string {
    if (time instanceof Date) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else if (typeof time === "string") {
      const [hours, minutes] = time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        return "";
      }
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      return "";
    }
  }

  isWithinHorario(horario: string, horaInicio: Date, horaFin: Date): boolean {
    const inicioFormateado = this.formatTime(horaInicio);
    const finalFormateado = this.formatTime(horaFin);
    const indexInicio = this.horarios.indexOf(inicioFormateado);
    const indexFinal = this.horarios.indexOf(finalFormateado);
    const indexHorarioActual = this.horarios.indexOf(horario);
    return indexHorarioActual >= indexInicio && indexHorarioActual < indexFinal;
  }

  parseTimeString(timeString: string): Date {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  quitarMilisegundos(fecha: Date): Date {
    const fechaSinMilisegundos = new Date(fecha);
    fechaSinMilisegundos.setMilliseconds(0);
    return fechaSinMilisegundos;
  }
}
