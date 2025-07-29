import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  transactions: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.http.get(`http://localhost:5000/users/${userId}`).subscribe(data => {
      this.user = data;
    });

    this.http.get<any[]>(`http://localhost:5000/transactions/${userId}`).subscribe(data => {
      this.transactions = data;
    });
  }
}
