import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  paginatedTransactions: any[] = [];

  searchQuery = '';
  sortField: 'amount' | 'timestamp' | '' = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/transactions').subscribe(data => {
      this.transactions = data;
      this.applyFilters(); // Initial filter, sort, paginate
    });
  }

  applyFilters(): void {
    let txns = [...this.transactions];

    // 🔍 Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      txns = txns.filter(txn =>
        txn.sender_id?.toString().includes(query) ||
        txn.receiver_id?.toString().includes(query) ||
        txn.note?.toLowerCase().includes(query)
      );
    }

    // ↕️ Sorting
    if (this.sortField) {
      txns.sort((a, b) => {
        const valA = this.sortField === 'timestamp' ? new Date(a.timestamp).getTime() : a[this.sortField];
        const valB = this.sortField === 'timestamp' ? new Date(b.timestamp).getTime() : b[this.sortField];

        return this.sortOrder === 'asc' ? valA - valB : valB - valA;
      });
    }

    this.filteredTransactions = txns;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTransactions = this.filteredTransactions.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
  }

  exportToCSV(): void {
    const headers = ['Id', 'Sender ID', 'Receiver ID', 'Amount', 'Note', 'Timestamp'];
    const rows = this.filteredTransactions.map(txn => {
      const formattedDate = new Date(txn.timestamp).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return [
        txn.id,
        txn.sender_id,
        txn.receiver_id,
        txn.amount,
        txn.note || '-',
        formattedDate
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Triggered by sort buttons in UI
  toggleSort(field: 'amount' | 'timestamp'): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }
}
