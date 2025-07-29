import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NavbarComponent], // ✅ include NavbarComponent
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalTransactions = 0;
  totalBalance = 0;

  chartLabels: string[] = ['Users', 'Transactions'];
  chartData: ChartData<'bar'> = {
    labels: this.chartLabels,
    datasets: [
      {
        label: 'Summary',
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Users vs Transactions'
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/users').subscribe(users => {
      this.totalUsers = users.length;
      this.totalBalance = users.reduce(
        (sum, user) => sum + parseFloat(user.balance || 0),
        0
      );
      this.chartData.datasets[0].data[0] = this.totalUsers;
    });

    this.http.get<any[]>('http://localhost:5000/transactions').subscribe(txns => {
      this.totalTransactions = txns.length;
      this.chartData.datasets[0].data[1] = this.totalTransactions;
    });
  }
}
