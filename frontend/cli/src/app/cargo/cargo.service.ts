import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Cargo } from "./cargo";

@Injectable({
  providedIn: "root",
})
export class CargoService {
  private cargoUrl = "rest/cargo"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.cargoUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.cargoUrl + "/id/" + id);
  }

  save(cargo: Cargo): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.cargoUrl, cargo);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.cargoUrl}/search/${text}`);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.cargoUrl}/id/${id}`);
  }

  bypage(
    page: number,
    size: number,
    textoBusqueda: string
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.cargoUrl}/page?page=${
        page - 1
      }&size=${size}&textoBusqueda=${textoBusqueda}`
    );
  }
}
