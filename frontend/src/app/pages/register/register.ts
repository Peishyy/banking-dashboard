import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  accountType = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';

    if (!this.name || !this.email || !this.password || !this.accountType) {
      this.error = 'All fields are required';
      return;
    }

    this.http.post<any>('http://localhost:5000/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password,
      accountType: this.accountType 
    }).subscribe({
      next: () => {
        this.success = 'Registration successful. Redirecting to login...';
        // Optional: Trigger full reload to ensure fresh data
        setTimeout(() => {
          this.router.navigate(['/login']).then(() => {
            window.location.reload(); // Ensures the UsersComponent fetches new data
          });
        }, 1500);
      },
      
      error: (err) => {
        console.error('Registration error:', err);
        this.error = err.error?.error || 'Registration failed';
      }
    });
  }
}
