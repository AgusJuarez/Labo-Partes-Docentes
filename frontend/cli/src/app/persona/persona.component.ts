import { Component, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Persona } from "./persona";
import { PersonaService } from "./persona.service";
import { ModalService } from "../modal/modal.service";
import { ResultsPage } from "../results-page";
import { PaginationComponent } from "../pagination/pagination.component";
import { FormsModule } from "@angular/forms";
import { ReporteConcepto } from "./reporteConcepto";
import { Observable, forkJoin, map } from "rxjs";

@Component({
  selector: "app-personas",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2 class="mb-0">
        Personas&nbsp;
        <a routerLink="/personas/new" class="btn btn-success float-right"
          >Nueva</a
        >
        <div class="d-flex justify-content-end .align-items-center mb-2">
          <input
            type="text"
            [(ngModel)]="textoBusqueda"
            (input)="getPersonas()"
            class="form-control w-25"
            placeholder="Buscar..."
          />
        </div>
      </h2>

      <div
        *ngIf="errorMessage"
        class="alert alert-danger alert-dismissible fade show"
      >
        {{ errorMessage }}
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Dni</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Lic. Pedidas</th>
              <th>Lic. Otorgadas</th>
              <th>Desig. Pedidas</th>
              <th>Desig. Otorgadas</th>
              <th></th>
              <th></th>
              <th>Reporte Completo</th>
            </tr>
          </thead>
          <tbody>
            <tr
              align="center"
              *ngFor="let persona of resultsPage.content; index as i"
            >
              <td>{{ i + resultsPage.size * resultsPage.number + 1 }}</td>
              <td>{{ persona.dni }}</td>
              <!-- <td>{{ persona.cuit }}</td> -->
              <td>{{ persona.nombre }}</td>
              <td>{{ persona.apellido }}</td>
              <td>
                {{
                  persona.reporteConcepto.cantidadLicenciasOtorgadas +
                    persona.reporteConcepto.cantidadLicenciasNoOtorgadas
                }}
              </td>
              <td>{{ persona.reporteConcepto.cantidadLicenciasOtorgadas }}</td>
              <td>
                {{
                  persona.reporteConcepto.cantidadDesignacionesOtorgadas +
                    persona.reporteConcepto.cantidadDesignacionesNoOtorgadas
                }}
              </td>
              <td>
                {{ persona.reporteConcepto.cantidadDesignacionesOtorgadas }}
              </td>
              <!-- <td>{{ persona.domicilio }}</td>
              <td>{{ persona.telefono }}</td> -->
              <td>
                <a href="/personas/{{ persona.id }}">
                  <i class="fa fa-pencil mx-2"></i>
                </a>
                &nbsp;
              </td>
              <td>
                <button (click)="remove(persona.id)" class="btn btn-default">
                  <i class="fa fa-trash-o text-danger mx-2 "></i>
                </button>
              </td>
              <td>
                <button
                  (click)="getReporteConcepto(persona.id)"
                  class="btn btn-default"
                >
                  <i class="fa fa-info mx-2 "></i>
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
export class PersonasComponent {
  errorMessage: string | undefined;
  resultsPage: ResultsPage = <ResultsPage>{};
  currentPage: number = 1;
  atributoOrden: string = "apellido";
  textoBusqueda: string = "";
  reporteConcepto: ReporteConcepto | undefined;

  constructor(
    private personaService: PersonaService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService
      .bypage(this.currentPage, 5, this.atributoOrden, this.textoBusqueda)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.currentPage = 1;

        // Array de observables
        const observables = this.resultsPage.content.map((persona) => {
          return this.getReporteConceptoEnchant(persona.id);
        });

        // Combinar observables
        forkJoin(observables).subscribe((reporteConceptos) => {
          // reporteConceptos contendrá los resultados de todas las llamadas
          // Actualizar los reportes en las personas
          reporteConceptos.forEach((reporteConcepto, index) => {
            this.resultsPage.content[index].reporteConcepto = reporteConcepto;
          });
        });
      });
  }

  remove(id: number): void {
    let that = this;
    this.modalService
      .confirm(
        "Eliminar Persona",
        "¿Está seguro de que desea eliminar la Persona",
        "Si elimina la Persona no la podrá utilizar luego"
      )
      .then(function () {
        that.personaService.remove(id).subscribe((dataPackage) => {
          that.getPersonas();
          if (dataPackage.status === 406) {
            that.modalService.error(
              "Eliminar Persona",
              dataPackage.message,
              ""
            );
          }
        });
      });
  }

  getReporteConcepto(id: number): void {
    //let reporteDiario : ReporteDiario;
    this.personaService.getReporteConcepto(id).subscribe((dataPackage) => {
      this.reporteConcepto = <ReporteConcepto>dataPackage.data;
      this.modalService.reporteConcepto(this.reporteConcepto);
    });
  }

  getReporteConceptoEnchant(id: number): Observable<ReporteConcepto> {
    return this.personaService
      .getReporteConcepto(id)
      .pipe(map((dataPackage) => <ReporteConcepto>dataPackage.data));
  }

  onPageChangeRequested(page: number): void {
    this.currentPage = page;
    this.getPersonas();
  }
}
