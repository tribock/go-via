import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  version: any;

  constructor(private apiService: ApiService, public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.apiService.getVersion().subscribe((data: any) => {
      this.version = data;
      console.log(this.version);
    });

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}


