import { Component } from "@angular/core";
import { Licencia } from "./licencia";
import { LicenciaService } from "./licencia.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: "app-parteDiario",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div class="parte-info">
        <div style="display: inline-block;">
          <label for="parteDiario">Ingresar fecha de parte diario: </label>
          <label>
            <input
              [(ngModel)]="fechaParteDiario"
              type="date"
              name="pedido desde"
              required
              pattern="yyyy-MM-dd"
            />
            <span class="validity"></span>
          </label>
        </div>
        &nbsp;<button (click)="buscarLicencias()" class="btn btn-success">
          Buscar
        </button>
        &nbsp;<button (click)="resetFecha()" class="btn btn-danger">
          Reset
        </button>
      </div>

      <h2>
        Parte Diario&nbsp; &nbsp;&nbsp;{{
          fechaParteDiario | date : "dd/MM/YYYY"
        }}
      </h2>

      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>persona</th>
              <th>articulo</th>
              <th>fecha desde</th>
              <th>fecha hasta</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let licencia of licencias; index as i">
              <td>{{ i + 1 }}</td>
              <td>
                {{ licencia.persona.nombre + " " + licencia.persona.apellido }}
              </td>
              <td>
                {{
                  licencia.articulo.articulo +
                    "-" +
                    licencia.articulo.descripcion
                }}
              </td>
              <td>{{ licencia.pedidoDesde }}</td>
              <td>{{ licencia.pedidoHasta }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .parte-info {
        height: 90px;
      }
    `,
  ],
})
export class ParteDiarioComponent {
  fechaParteDiario: Date = new Date(); // Establecer una fecha predeterminada
  fechaParteDiarioInicial: Date = new Date();
  licencias: Licencia[] = [];

  constructor(private licenciaService: LicenciaService) {}

  ngOnInit() {
    this.fechaParteDiarioInicial = new Date();
    this.getlicencias();
  }

  getlicencias(): void {
    if (this.fechaParteDiario) {
      this.licenciaService
        .allFecha(this.fechaParteDiario)
        .subscribe((dataPackage) => {
          this.licencias = <Licencia[]>dataPackage.data;
        });
    } else {
      this.licencias = [];
    }
  }

  buscarLicencias(): void {
    this.getlicencias();
  }

  resetFecha(): void {
    this.fechaParteDiario = this.fechaParteDiarioInicial;
    this.getlicencias();
  }
}
