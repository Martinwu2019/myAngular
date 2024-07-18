import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
    // return this.http.post('http://127.0.0.1:8000/api/signup', data);
  }
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  getUserProfile(): any {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }
  updatePassword(data: any): any {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${this.apiUrl}/user/password`, data, { headers });
  }
}
