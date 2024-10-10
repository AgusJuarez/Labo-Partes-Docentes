import { Component } from "@angular/core";
import { DesignacionService } from "./designacion.service";
import { Designacion } from "./designacion";
import { ModalService } from "../modal/modal.service";
import { ResultsPage } from "../results-page";
import { PaginationComponent } from "../pagination/pagination.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-designacion",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2>
        Designaciones&nbsp;
        <a href="/designacion/new" class="btn btn-success float-right">Nuevo</a>
        <div class="d-flex justify-content-end .align-items-center mb-2">
          <input
            type="text"
            [(ngModel)]="textoBusqueda"
            (input)="getDesignaciones()"
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
              <th>nombre</th>
              <th>tipo designado</th>
              <th>fecha desde</th>
              <th>fecha hasta</th>
              <th>año</th>
              <th>numero</th>
              <th>turno</th>
              <th>Otorgado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let designacion of resultsPage.content; index as i">
              <td>{{ i + 1 }}</td>
              <td>
                {{
                  designacion.persona.nombre +
                    " " +
                    designacion.persona.apellido
                }}
              </td>
              <td>{{ designacion.cargo.nombre }}</td>
              <td>{{ designacion.cargo.tipo }}</td>
              <td>{{ designacion.fechaInicio }}</td>
              <td>{{ designacion.fechaFin }}</td>
              <td>{{ designacion.cargo.division?.anio }}</td>
              <td>{{ designacion.cargo.division?.numero }}</td>
              <td>{{ designacion.cargo.division?.turno }}</td>
              <td>
                <ng-container *ngIf="designacion.estado; else noOtorgado">
                  Sí
                </ng-container>
                <ng-template #noOtorgado> No </ng-template>
              </td>
              <td>
                <a href="/designacion/{{ designacion.id }}">
                  <i class="fa fa-pencil mx-2"></i>
                </a>

                <button
                  (click)="eliminarDesignacion(designacion)"
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
      </div>
    </div>
  `,
  styles: [],
})
export class DesignacionComponent {
  designaciones: Designacion[] = [];
  errorMessage: string | undefined;
  resultsPage: ResultsPage = <ResultsPage>{};
  currentPage: number = 1;
  textoBusqueda: string = "";

  constructor(
    private designacionService: DesignacionService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getDesignaciones();
  }

  getDesignaciones(): void {
    this.designacionService
      .bypage(this.currentPage, 5, this.textoBusqueda)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
      });
    this.currentPage = 1;
  }

  eliminarDesignacion(designacion: Designacion): void {
    this.modalService
      .confirm(
        "Eliminar Designacion",
        "¿Está seguro de borrar esta Designacion?",
        "El cambio no se confirmará hasta que no guarde el cargo."
      )
      .then(() => {
        this.designacionService.delete(designacion).subscribe((dataPackage) => {
          this.designaciones = this.designaciones.filter(
            (p) => p !== designacion
          );
          this.getDesignaciones();
        });
      });
  }
  onPageChangeRequested(page: number): void {
    this.currentPage = page;
    this.getDesignaciones();
  }
}
