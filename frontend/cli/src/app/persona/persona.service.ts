import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Persona } from "./persona";
import { Data } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PersonaService {
  private personaUrl = "rest/personas"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.personaUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.personaUrl}/id/${id}`);
  }

  save(persona: Persona): Observable<DataPackage> {
    return persona.id
      ? this.http.put<DataPackage>(this.personaUrl, persona)
      : this.http.post<DataPackage>(this.personaUrl, persona);
  }

  existe(cuit: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.personaUrl}/${cuit}`);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.personaUrl}/id/${id}`);
  }

  getReporteConcepto(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.personaUrl}/reporteConcepto/${id}`
    );
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.personaUrl}/search/${text}`);
  }

  bypage(
    page: number,
    size: number,
    atributo: string,
    textoBusqueda: string
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.personaUrl}/page?page=${
        page - 1
      }&size=${size}&atributo=${atributo}&textoBusqueda=${textoBusqueda}`
    );
  }
}
