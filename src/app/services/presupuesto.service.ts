import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Presupuesto {
  id?: string;
  categoria: string;
  descripcion: string;
  monto: number;
  mes: string;
}

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private apiUrl = 'https://l9bsklxzjb.execute-api.us-east-1.amazonaws.com/presupuesto'; // Ajusta la región si es distinta

  constructor(private http: HttpClient) {}

  getPresupuestos(): Observable<Presupuesto[]> {
    return this.http.get<Presupuesto[]>(this.apiUrl);
  }

  createPresupuesto(data: Presupuesto): Observable<Presupuesto> {
    return this.http.post<Presupuesto>(this.apiUrl, data);
  }

  updatePresupuesto(id: string, data: Presupuesto): Observable<Presupuesto> {
    return this.http.put<Presupuesto>(`${this.apiUrl}/${id}`, data);
  }

  deletePresupuesto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
