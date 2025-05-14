import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Startup } from '../models/startup.model';
import { RejectedStartup } from '../models/rejected-startup.model';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  registerStartup(startup: Startup): Observable<Startup> {
    return this.http.post<Startup>(`${this.apiUrl}/startups`, startup);
  }

  getUserStartups(userId: string): Observable<Startup[]> {
    return this.http.get<Startup[]>(`${this.apiUrl}/startups/user/${userId}`);
  }

  getStartupById(id: string): Observable<Startup> {
    return this.http.get<Startup>(`${this.apiUrl}/startups/${id}`);
  }

  // Admin methods
  getAllStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(`${this.apiUrl}/admin/startups`);
  }

  approveStartup(id: string): Observable<Startup> {
    return this.http.put<Startup>(`${this.apiUrl}/admin/startups/${id}/approve`, {});
  }

  rejectStartup(id: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/startups/${id}/reject`, { rejectionReason: reason });
  }

  getRejectedStartups(): Observable<RejectedStartup[]> {
    return this.http.get<RejectedStartup[]>(`${this.apiUrl}/admin/rejected-startups`);
  }
}