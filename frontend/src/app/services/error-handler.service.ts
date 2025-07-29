import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() {}

  handle(error: any): string {
    if (!error.status) {
      return '❌ Cannot connect to the server.';
    } else if (error.status >= 400 && error.status < 500) {
      return `⚠️ Client error (${error.status}): ${error.error?.message || error.message}`;
    } else if (error.status >= 500) {
      return `🔥 Server error (${error.status}). Please try again later.`;
    } else {
      return '❓ An unexpected error occurred.';
    }
  }
}
