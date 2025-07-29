import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(public router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return this.isLoggedIn() && !hiddenRoutes.includes(this.router.url);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
