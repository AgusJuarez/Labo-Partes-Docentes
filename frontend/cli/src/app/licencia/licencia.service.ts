import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Licencia } from "./licencia";
import { formatDate } from "@angular/common";
import { Cargo } from "../cargo/cargo";

@Injectable({
  providedIn: "root",
})
export class LicenciaService {
  private licenciaUrl = "rest/licencia"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.licenciaUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.licenciaUrl + "/id/" + id);
  }

  save(licencia: Licencia): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.licenciaUrl, licencia);
  }

  delete(licencia: Licencia): Observable<DataPackage> {
    return this.http.delete<DataPackage>(
      `${this.licenciaUrl}/id/${licencia.id}`
    );
  }

  bypage(
    page: number,
    size: number,
    textoBusqueda: string
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.licenciaUrl}/page?page=${
        page - 1
      }&size=${size}&textoBusqueda=${textoBusqueda}`
    );
  }

  allFecha(fecha: Date): Observable<DataPackage> {
    const formattedFecha = formatDate(fecha, "yyyy-MM-dd", "en-US"); // Formatear la fecha en el formato esperado por el backend
    const url = `${this.licenciaUrl}/parteDiario/${formattedFecha}`; // Construir la URL de la solicitud

    return this.http.get<DataPackage>(url);
  }
}
