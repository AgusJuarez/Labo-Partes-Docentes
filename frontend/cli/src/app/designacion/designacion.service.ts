import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Designacion } from "./designacion";
import { formatDate } from "@angular/common";
import { Cargo } from "../cargo/cargo";

@Injectable({
  providedIn: "root",
})
export class DesignacionService {
  private designacionUrl = "rest/designacion"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.designacionUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.designacionUrl + "/id/" + id);
  }

  save(designacion: Designacion): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.designacionUrl, designacion);
  }

  delete(designacion: Designacion): Observable<DataPackage> {
    return this.http.delete<DataPackage>(
      `${this.designacionUrl}/id/${designacion.id}`
    );
  }

  bypage(
    page: number,
    size: number,
    textoBusqueda: string
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.designacionUrl}/page?page=${
        page - 1
      }&size=${size}&textoBusqueda=${textoBusqueda}`
    );
  }

  existe(
    cargo: String,
    fechaInicio: Date,
    fechaFin: Date
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.designacionUrl}/existe?cargo=${cargo}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
  }
}
