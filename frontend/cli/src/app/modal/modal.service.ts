import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";
import { ModalMessageErrorComponent } from "./modalMessageError.component";
import { ModalSuccessMessageComponent } from "./modalSuccessMessage.component";
import { ReporteConcepto } from "../persona/reporteConcepto";
import { ModalReporteConceptoComponent } from "./modalReporteConcepto.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  confirm(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }

  error(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalMessageErrorComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }

  success(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalSuccessMessageComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }

  reporteConcepto(reporteConcepto: ReporteConcepto): Promise<any> {
    const modal = this.modalService.open(ModalReporteConceptoComponent, {
      size: "xl",
    });
    modal.componentInstance.title =
      "Reporte de Concepto de " +
      reporteConcepto.persona.nombre +
      " " +
      reporteConcepto.persona.apellido;
    modal.componentInstance.reporteConcepto = reporteConcepto;
    return modal.result;
  }
}
