import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";

@Injectable({
  providedIn: "root",
})
export class CalendarioService {
  private calendarioUrl = "rest/calendario"; // URL to web api

  constructor(private http: HttpClient) {}

  getCargos(
    turno: string,
    anio?: number | null,
    numero?: number | null
  ): Observable<DataPackage> {
    let url = `${this.calendarioUrl}/${turno}`;
    if (
      anio !== null &&
      anio !== undefined &&
      numero !== null &&
      numero !== undefined
    ) {
      url += `/${anio}/${numero}`;
    }
    return this.http.get<DataPackage>(url);
  }
}
