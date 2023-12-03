import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.show(message, 'success-toast');
  }

  showError(message: string): void {
    this.show(message, 'error-toast');
  }

  private show(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // duration ms
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }
}