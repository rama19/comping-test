import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models/user.model';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';

//mat imports
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { FileDownloadService } from 'src/app/services/file-download.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: 'users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  users: any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'username',
    'actions',
    'download',
  ];
  dataSource: User[] = [];
  filteredUsers: any[] = [];
  searchInput: string = '';

  constructor(
    private adminService: AdminService,
    private fileDownloadService: FileDownloadService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data) => {
      this.dataSource = data;
      this.filteredUsers = [...this.dataSource];
      this.cdr.detectChanges();
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.uploadUser(result);
        this.toastService.showSuccess('User updated');
      }
    });
  }

  deleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(userId: string): void {
    // Make API request to Keycloak to delete the user
    this.adminService.deleteUser(userId).subscribe(
      () => {
        this.toastService.showSuccess('User deleted');
      },
      (error: any) => {
        this.toastService.showError(error.message);
        console.error('Error deleting user:', error);
      }
    );
  }

  downloadFile(user: any): void {
    const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';

    this.fileDownloadService.downloadFile(fileUrl).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });

        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = 'downloaded_file.pdf'; 

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      },
      (error) => {
        console.error('Error downloading file:', error);
        this.toastService.showError(error.message);
      }
    );
  }

  onSearch(): void {
    const searchTerm = this.searchInput.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user: any) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
  }
}
