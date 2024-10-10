import { Component } from "@angular/core";
import { Licencia } from "./licencia";
import { LicenciaService } from "./licencia.service";
import { ModalService } from "../modal/modal.service";
import { ResultsPage } from "../results-page";
import { PaginationComponent } from "../pagination/pagination.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-licencias",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2>
        Licencias&nbsp;
        <a href="/licencia/new" class="btn btn-success float-right">Nuevo</a>
        <div class="d-flex justify-content-end .align-items-center mb-2">
          <input
            type="text"
            [(ngModel)]="textoBusqueda"
            (input)="getLicencias()"
            class="form-control w-25"
            placeholder="Buscar..."
          />
        </div>
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
              <th>certificado médico</th>
              <th>Otorgado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let licencia of resultsPage.content; index as i">
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
              <td>
                <ng-container
                  *ngIf="licencia.certificadoMedico; else noCertificado"
                >
                  Sí
                </ng-container>
                <ng-template #noCertificado> No </ng-template>
              </td>
              <td>
                <ng-container *ngIf="licencia.estado; else noOtorgado">
                  Sí
                </ng-container>
                <ng-template #noOtorgado> No </ng-template>
              </td>
              <td>
                <a href="/licencia/{{ licencia.id }}">
                  <i class="fa fa-pencil mx-2"></i>
                </a>

                <button
                  (click)="eliminarLicencia(licencia)"
                  class="btn btn-default"
                >
                  <i class="fa fa-trash-o text-danger mx-2 "></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <app-pagination
          [totalPages]="resultsPage.totalPages"
          [currentPage]="currentPage"
          (pageChangeRequested)="onPageChangeRequested($event)"
          [number]="resultsPage.number"
          [hidden]="resultsPage.numberOfElements < 1"
        >
        </app-pagination>

        <style>
          .fila-roja {
            background-color: red;
          }

          .fila-verde {
            background-color: green;
          }
        </style>
      </div>
    </div>
  `,
  styles: [],
})
export class LicenciaComponent {
  licencias: Licencia[] = [];
  errorMessage: string | undefined;
  resultsPage: ResultsPage = <ResultsPage>{};
  currentPage: number = 1;
  textoBusqueda: string = "";

  constructor(
    private licenciaService: LicenciaService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getLicencias();
  }

  getLicencias(): void {
    this.licenciaService
      .bypage(this.currentPage, 5, this.textoBusqueda)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
      });
    this.currentPage = 1;
  }

  eliminarLicencia(licencia: Licencia): void {
    this.modalService
      .confirm(
        "Eliminar licencia",
        "¿Está seguro de borrar esta licencia?",
        "El cambio no se confirmará hasta que no guarde el cargo."
      )
      .then(() => {
        this.licenciaService.delete(licencia).subscribe((dataPackage) => {
          this.licencias = this.licencias.filter((p) => p !== licencia);
          this.getLicencias();
        });
      });
  }

  onPageChangeRequested(page: number): void {
    this.currentPage = page;
    this.getLicencias();
  }
}
