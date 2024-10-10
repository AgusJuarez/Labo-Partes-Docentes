import { Component } from "@angular/core";
import { DivisionService } from "./division.service";
import { ModalService } from "../modal/modal.service";
import { ResultsPage } from "../results-page";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "../pagination/pagination.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-Divisions",
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2>
        Division&nbsp;
        <a routerLink="/division/new" class="btn btn-success float-right"
          >Nueva División</a
        >
        <div class="d-flex justify-content-end .align-items-center mb-2">
          <input
            type="text"
            [(ngModel)]="textoBusqueda"
            (input)="getDivision()"
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
              <th>Año</th>
              <th>Numero</th>
              <th>Orientación</th>
              <th>Turno</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let division of resultsPage.content; index as i">
              <td>{{ i + resultsPage.size * resultsPage.number + 1 }}</td>
              <td>{{ division.anio }}</td>
              <td>{{ division.numero }}</td>
              <td>{{ division.orientacion }}</td>
              <td>{{ division.turno }}</td>
              <td>
                <a href="/division/{{ division.id }}">
                  <i class="fa fa-pencil mx-2"></i>
                </a>
                &nbsp;

                <button (click)="remove(division.id)" class="btn btn-default">
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
export class DivisionComponent {
  errorMessage: string | undefined;
  resultsPage: ResultsPage = <ResultsPage>{};
  currentPage: number = 1;
  textoBusqueda: string = "";

  constructor(
    private divisionService: DivisionService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getDivision();
  }

  getDivision(): void {
    this.divisionService
      .bypage(this.currentPage, 5, this.textoBusqueda)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
      });
  }

  remove(id: number): void {
    let that = this;
    this.modalService
      .confirm(
        "Eliminar Division",
        "¿Está seguro de que desea eliminar la Division?",
        "Si elimina la Division no la podrá utilizar luego"
      )
      .then(function () {
        that.divisionService.remove(id).subscribe((dataPackage) => {
          that.getDivision();
          if (dataPackage.status === 406) {
            that.modalService.error(
              "Eliminar Division",
              dataPackage.message,
              ""
            );
          }
        });
      });
  }

  onPageChangeRequested(page: number): void {
    this.currentPage = page;
    this.getDivision();
  }
}
