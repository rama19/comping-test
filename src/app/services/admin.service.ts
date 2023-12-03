import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'https://keycloak-tt-keycloak-stage.apps.ocp.thingstalk.eu/admin/realms/test-realm6';
  private users: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getToken() {
    return this.authService.getToken();
  }

  getUsers(): Observable<any[]> {
    const token = this.getToken();
    const url = `${this.baseUrl}/users`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http.get<any[]>(url, { headers });
  }

  uploadUser(user: any): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    });

    const body = this.createUserPayload(user);

    return this.http.post<any>(this.baseUrl + '/users', body, { headers });
  }

  private createUserPayload(user: any): any {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
    };
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    });
    return this.http.delete<any>(this.baseUrl + '/users/' + userId, { headers });
  }
}