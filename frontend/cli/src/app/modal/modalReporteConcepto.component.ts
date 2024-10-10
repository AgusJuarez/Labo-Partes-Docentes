import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ReporteConcepto } from "../persona/reporteConcepto";
import { Licencia } from "../licencia/licencia";
import { Designacion } from "../designacion/designacion";

@Component({
  selector: "app-modalReporteConcepto",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      <div
        class="mx-auto px-4 py-4"
        style="background-color: rgb(255, 255, 255); border-radius: 10px"
      >
        <div *ngIf="hayDesignaciones == false && hayLicencias == false">
          <div align="center">
            <h6>No tiene Designaciones y tampoco Licencias</h6>
            <img
              src="../../assets/imagen_corazon(1).jpg"
              alt="Imagen fachera facherita"
            />
          </div>
        </div>
        <div *ngIf="hayDesignaciones">
          <h5>Designaciones OTORGADAS</h5>
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Fecha Desde</th>
                <th>Fechas Hasta</th>
                <th>Año</th>
                <th>Numero</th>
                <th>Turno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="
                  let designacion of reporteConcepto?.designaciones;
                  index as i
                "
              >
                <td>{{ i + 1 }}</td>
                <td>{{ designacion.cargo.nombre }}</td>
                <td>{{ designacion.cargo.tipo }}</td>
                <td>{{ designacion.fechaInicio }}</td>
                <td>{{ designacion.fechaFin }}</td>
                <td>{{ designacion.cargo.division?.anio }}</td>
                <td>{{ designacion.cargo.division?.numero }}</td>
                <td>{{ designacion.cargo.division?.turno }}</td>

                <td>
                  <a href="/designacion/{{ designacion.id }}">
                    <i class="fa fa-eye mx-2"></i>
                  </a>
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>
          <h6>
            Cantidad de Designaciones pedidas:
            {{ totalDesignacionesPedidas }}
          </h6>
          <h6>
            Cantidad de Designaciones otorgadas:
            {{ reporteConcepto?.cantidadDesignacionesOtorgadas }}
          </h6>
          <h6>
            Cantidad de Designaciones NO otorgadas:
            {{ reporteConcepto?.cantidadDesignacionesNoOtorgadas }}
          </h6>
        </div>
        &nbsp;
        <div *ngIf="hayLicencias">
          <h5>Licencias OTORGADAS</h5>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Articulo</th>
                  <th>Descripcion</th>
                  <th>Fecha Desde</th>
                  <th>Fecha Hasta</th>
                  <th>Certificado Medico</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let licencia of reporteConcepto?.licencias;
                    index as i
                  "
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ licencia.articulo.articulo }}</td>
                  <td>{{ licencia.articulo.descripcion }}</td>
                  <td>{{ licencia.pedidoDesde }}</td>
                  <td>{{ licencia.pedidoHasta }}</td>
                  <td>
                    <ng-container
                      *ngIf="licencia.certificadoMedico; else noCertificado"
                    >
                      Sí
                    </ng-container>
                    <ng-template #noCertificado> No </ng-template>
                  </td>

                  <td>
                    <a href="/licencia/{{ licencia.id }}">
                      <i class="fa fa-eye mx-2"></i>
                    </a>
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="reporteConcepto?.licencias">
              <h6>
                Cantidad de Licencias pedidas: {{ totalLicenciasPedidas }}
              </h6>
              <h6>
                Cantidad de Licencias otorgadas:
                {{ reporteConcepto?.cantidadLicenciasOtorgadas }}
              </h6>
              <h6>
                Cantidad de Licencias NO otorgadas:
                {{ reporteConcepto?.cantidadLicenciasNoOtorgadas }}
              </h6>
              <h6>
                Cantidad de Dias que estuvo de Licencia:
                {{ reporteConcepto?.cantidadDiasEnLicencia }}
              </h6>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                (click)="modal.close()"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModalReporteConceptoComponent {
  constructor(public modal: NgbActiveModal) {}
  title = "";
  reporteConcepto: ReporteConcepto | undefined;
  totalLicenciasPedidas: number = 0;
  totalDesignacionesPedidas: number = 0;
  hayLicencias: boolean = false;
  hayDesignaciones: boolean = false;
  ngOnInit(): void {
    if (this.reporteConcepto) {
      if (this.reporteConcepto?.licencias.length > 0) {
        this.hayLicencias = true;
      }
      this.totalLicenciasPedidas =
        this.reporteConcepto.cantidadLicenciasOtorgadas +
        this.reporteConcepto.cantidadLicenciasNoOtorgadas;
    } else {
      this.totalLicenciasPedidas = 0;
    }

    if (this.reporteConcepto) {
      if (this.reporteConcepto?.designaciones.length > 0) {
        this.hayDesignaciones = true;
      }
      this.totalDesignacionesPedidas =
        this.reporteConcepto.cantidadDesignacionesOtorgadas +
        this.reporteConcepto.cantidadDesignacionesNoOtorgadas;
    } else {
      this.totalDesignacionesPedidas = 0;
    }
  }
}
