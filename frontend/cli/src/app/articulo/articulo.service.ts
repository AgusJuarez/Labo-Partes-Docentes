import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Articulo } from "./articulo";

@Injectable({
  providedIn: "root",
})
export class ArticuloService {
  private articuloUrl = "rest/articulo"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.articuloUrl); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.articuloUrl + "/id/" + id);
  }

  save(articulo: Articulo): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.articuloUrl, articulo);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.articuloUrl}/search/${text}`);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.articuloUrl}/id/${id}`);
  }
}
