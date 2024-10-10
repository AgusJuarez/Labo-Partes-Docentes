import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modalSuccessMessage",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header" style="background-color: #28a745; color: white;">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ message }}</strong>
      </p>
      <p *ngIf="description">
        <strong>{{ description }}</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="modal.close()">
        Aceptar
      </button>
    </div>
  `,
  styles: ``,
})
export class ModalSuccessMessageComponent {
  constructor(public modal: NgbActiveModal) {}

  title = "";
  message = "";
  description = "";
}
