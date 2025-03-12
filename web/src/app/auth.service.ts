import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Promise<boolean> {
    const url = 'https://localhost:8443/v1/login';
    const body = { username, password };

    return this.http.post<{ success: boolean }>(url, body).toPromise()
      .then(response => {
        if (response.success) {
          console.log('Login successful');
          this.isAuthenticated = true;
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.error('Login failed', error);
        return false;
      });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}