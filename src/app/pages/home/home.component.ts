import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UsersTableComponent } from 'src/app/components/users-table/users-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<app-header></app-header> <app-users-table></app-users-table>`,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeaderComponent, UsersTableComponent],
})
export class HomeComponent {
  constructor() {}
}
