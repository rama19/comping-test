import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  constructor(private keycloakService: KeycloakService) {}

  async getToken(): Promise<string> {
    this.keycloakService
      .isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          this.keycloakService
            .getToken()
            .then((token) => {
              this.token = token;
              console.log('Access Token:', token);
            })
            .catch((error) => {
              console.error('Error getting token:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
      });
      return this.token;
    }

}
