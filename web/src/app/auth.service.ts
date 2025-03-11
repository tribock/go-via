import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Implement your login logic here
    // For example, validate the username and password
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful');
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}