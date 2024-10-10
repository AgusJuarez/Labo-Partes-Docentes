import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataPackage } from "../data-package";
import { Division } from "./division";
import { Data } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class DivisionService {
  private divisionUrl = "rest/division"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.divisionUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.divisionUrl}/id/${id}`); //
  }

  save(division: Division): Observable<DataPackage> {
    return division.id
      ? this.http.put<DataPackage>(this.divisionUrl, division)
      : this.http.post<DataPackage>(this.divisionUrl, division);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.divisionUrl}/id/${id}`);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.divisionUrl}/search/${text}`);
  }

  bypage(
    page: number,
    size: number,
    textoBusqueda: string
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.divisionUrl}/page?page=${
        page - 1
      }&size=${size}&textoBusqueda=${textoBusqueda}`
    );
  }

  existe(anio: number, numero: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.divisionUrl}/division?anio=${anio}&numero=${numero}`
    );
  }
}
