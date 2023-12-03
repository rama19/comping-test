import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
  <mat-toolbar color="primary">
    <span>Comping test</span>
    <span class="spacer"></span>
    <span class="example-spacer"></span>
    <button mat-button routerLink="/">Home</button>
  </mat-toolbar>`,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
