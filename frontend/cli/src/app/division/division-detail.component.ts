import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Division } from "./division";
import { DivisionService } from "./division.service";
import { DataPackage } from "../data-package";
import { FormsModule } from "@angular/forms";
import { Location, UpperCasePipe } from "@angular/common";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "../modal/modal.service";

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
      <div *ngIf="division">
        <h2>Nueva División&nbsp;</h2>
        <form #form="ngForm">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="anio">Año:</label>
                  <input
                    [(ngModel)]="division.anio"
                    name="anio"
                    placeholder="Año"
                    class="form-control"
                    (input)="comprobarDivisionExistente()"
                    required
                    (keydown)="validarNumeros($event)"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="numero">Numero:</label>
                  <input
                    [(ngModel)]="division.numero"
                    name="numero"
                    placeholder="Numero"
                    class="form-control"
                    (input)="comprobarDivisionExistente()"
                    required
                    (keydown)="validarNumeros($event)"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="orientacion">Orientacion:</label>
                    <input
                      [(ngModel)]="division.orientacion"
                      name="orientacion"
                      placeholder="Orientacion"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="turno">Turno:</label>
                    <select
                      [(ngModel)]="division.turno"
                      class="form-control"
                      id="turno"
                      name="turno"
                      required
                    >
                      <option value="mañana">Mañana</option>
                      <option value="tarde">Tarde</option>
                      <option value="vespertino">Vespertino</option>
                      <option value="noche">Noche</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button (click)="goBack()" class="btn btn-danger">Atrás</button>
          &nbsp;

          <button
            (click)="save()"
            [disabled]="form.invalid || divisionExiste"
            class="btn btn-success"
          >
            Guardar
          </button>
          <div *ngIf="division">
            <div *ngIf="divisionExiste" class="alert alert-danger">
              La division {{ division.anio + "° " + division.numero + "° " }} ya
              existe.
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class DivisionDetailComponent {
  division!: Division;
  divisionExiste: Division | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private divisionService: DivisionService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.division = <Division>{};
    } else {
      this.divisionService
        .get(+id)
        .subscribe(
          (dataPackage) => (this.division = <Division>dataPackage.data)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    this.divisionService.save(this.division).subscribe((dataPackage) => {
      this.division = <Division>dataPackage.data;
      if (dataPackage.status == 200) {
        that.modalService.success(
          "Notificación",
          "Detalles sobre División",
          dataPackage.message
        );
      } else {
        this.goBack();
      }

      if (dataPackage.status != 200) {
        that.modalService.error(
          "Notificación",
          "Detalles sobre División",
          dataPackage.message
        );
      } else {
        this.goBack();
      }
    });
  }

  comprobarDivisionExistente() {
    this.divisionService
      .existe(this.division.anio, this.division.numero)
      .subscribe((dataPackage) => {
        this.divisionExiste = <Division>dataPackage.data;
      });
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
}
