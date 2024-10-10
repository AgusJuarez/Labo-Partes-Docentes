import { Component } from "@angular/core";
import { CargoService } from "./cargo.service";
import { Cargo } from "./cargo";
import { ModalService } from "../modal/modal.service";
import { ResultsPage } from "../results-page";
import { PaginationComponent } from "../pagination/pagination.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-cargo",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],

  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2>
        Cargos&nbsp;
        <a href="/cargo/new" class="btn btn-success float-right">Nuevo</a>
        <div class="d-flex justify-content-end .align-items-center mb-2">
          <input
            type="text"
            [(ngModel)]="textoBusqueda"
            (input)="getCargos()"
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
              <th>nombre</th>
              <th>tipo designado</th>
              <th>fecha desde</th>
              <th>fecha hasta</th>
              <th>carga horaria</th>
              <th>año</th>
              <th>numero</th>
              <th>turno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cargo of resultsPage.content; index as i">
              <td>{{ i + 1 }}</td>
              <td>{{ cargo.nombre }}</td>
              <td>{{ cargo.tipo }}</td>
              <td>{{ cargo.fechaInicio }}</td>
              <td>{{ cargo.fechaFin }}</td>
              <td>{{ cargo.cargaHoraria }}</td>
              <td>{{ cargo.division?.anio }}</td>
              <td>{{ cargo.division?.numero }}</td>
              <td>{{ cargo.division?.turno }}</td>
              <td>
                <a href="/cargo/{{ cargo.id }}">
                  <i class="fa fa-pencil mx-2"></i>
                </a>

                <button (click)="remove(cargo.id)" class="btn btn-default">
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
export class CargoComponent {
  cargos: Cargo[] = [];
  errorMessage: string | undefined;
  resultsPage: ResultsPage = <ResultsPage>{};
  currentPage: number = 1;
  textoBusqueda: string = "";

  constructor(
    private cargoService: CargoService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getCargos();
  }

  getCargos(): void {
    this.cargoService
      .bypage(this.currentPage, 5, this.textoBusqueda)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
      });
  }

  remove(id: number): void {
    let that = this;
    this.modalService
      .confirm(
        "Eliminar Cargo",
        "¿Está seguro de que desea eliminar el cargo",
        "Si elimina el Cargo no lo podrá utilizar luego"
      )
      .then(function () {
        that.cargoService.remove(id).subscribe((dataPackage) => {
          that.getCargos();
          if (dataPackage.status === 406) {
            that.modalService.error("Eliminar Cargo", dataPackage.message, "");
          }
        });
      });
  }

  onPageChangeRequested(page: number): void {
    this.currentPage = page;
    this.getCargos();
  }
}
