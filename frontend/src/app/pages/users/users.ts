import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.html',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  currentPage: number = 1;
  usersPerPage: number = 10;
  searchQuery: string = '';
  errorMessage: string = ''; // ✅ for displaying API errors

  constructor(private http: HttpClient, private router: Router) {
    // Refresh user list when navigated back to this route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchUsers();
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:5000/users')
      .subscribe({
        next: (data) => {
          this.users = data;
          this.applyFilters();
          this.errorMessage = ''; // clear any previous error
        },
        error: (error) => {
          console.error('❌ Error fetching users:', error);
          this.errorMessage = 'Failed to load users. Please try again later.';
        }
      });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.id?.toString().includes(query)
    );
  }

  get paginatedUsers(): any[] {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(start, start + this.usersPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  exportToCSV(): void {
    let csv = 'Id,Name,Email,Balance,Account Type\n';
    this.filteredUsers.forEach(user => {
      csv += `${user.id},${user.name},${user.email},${user.balance},${user.accountType || '-'}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  isLowBalance(balance: number): boolean {
    return balance < 300;
  }
}
