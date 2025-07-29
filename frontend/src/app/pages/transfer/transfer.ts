import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.html',
  styleUrls: ['./transfer.css'],
})
export class TransferComponent implements OnInit {
  users: any[] = [];
  fromUser = '';
  toUser = '';
  amount: number = 0;
  note = '';
  message = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/users').subscribe(data => {
      this.users = data;
    });
  }

  transfer(): void {
    this.message = '';
    this.error = '';

    if (!this.fromUser || !this.toUser || this.fromUser === this.toUser || this.amount <= 0) {
      this.error = 'Please provide valid input.';
      return;
    }

    const body = {
      from: this.fromUser,
      to: this.toUser,
      amount: this.amount,
      note: this.note
    };

    this.http.post('http://localhost:5000/transactions/transfer', body).subscribe({
      next: () => {
        this.message = 'Transfer successful ✅';
        this.fromUser = '';
        this.toUser = '';
        this.amount = 0;
        this.note = '';
        setTimeout(() => this.router.navigate(['/transactions']), 2000);
      },
      error: err => {
        this.error = err.error?.error || 'Transfer failed';
      },
    });
  }
}
