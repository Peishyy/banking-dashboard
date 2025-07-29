import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './users.html',
  standalone: true,
})
export class UsersComponent implements OnInit {
  users: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/users')
      .subscribe({
        next: (data) => {
          console.log('✅ Users fetched:', data); 
          this.users = data; 
        },
        error: (error) => {
          console.error('❌ Error fetching users:', error);
        }
      });
  }
}



