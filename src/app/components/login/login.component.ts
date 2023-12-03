import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  username: string = '';
  password: string = '';

  constructor(private keycloakService: KeycloakService) {}

  login() {
    this.keycloakService.logout();
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
