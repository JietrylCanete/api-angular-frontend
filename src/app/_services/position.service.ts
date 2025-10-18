// src/app/_services/position.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private baseUrl = `${environment.apiUrl}/positions`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(this.baseUrl, params);
  }

  update(id: number, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
