import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Horario } from "./horario";

@Injectable({
  providedIn: "root",
})
export class HorarioService {
  private horarioUrl = "rest/horario"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.horarioUrl + "/horarios"); // REST
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.horarioUrl + "/id/" + id);
  }

  save(horario: Horario): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.horarioUrl, horario);
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.horarioUrl}/search/${text}`);
  }
}
