import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modalMessageError",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ message }}</strong>
      </p>
      <p *ngIf="description">
        <strong>{{ description }}</strong>
      </p>
      <!--<img
        src="../../assets/imagen_corazon(1).jpg"
        alt="Imagen fachera facherita"
      /> -->
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="modal.close()">
        Aceptar
      </button>
    </div>
  `,
  styles: ``,
})
export class ModalMessageErrorComponent {
  constructor(public modal: NgbActiveModal) {}

  title = "";
  message = "";
  description = "";
}
