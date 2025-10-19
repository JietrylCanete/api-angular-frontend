import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/requests`;

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  add(params: any): Observable<any> {
    return this.http.post(baseUrl, params);
  }

  update(id: number, params: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // ✅ Get all requests assigned to the logged-in manager
  getForApproval(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/approver/${accountId}`);
  }

  // ✅ Approve / Reject endpoint
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/status`, { status });
  }
}
