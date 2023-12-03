import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        await this.keycloakService.login();
        return reject(false);
      }

      const requiredRoles = route.data['roles'] as string[];

      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      }

      const realmAccess = this.keycloakService.getUserRoles();

      if (
        requiredRoles.every((role) => realmAccess.includes(role))
      ) {
        return resolve(true);
      } else {
        this.router.navigate(['unauthorized']);
        return reject(false);
      }
    });
  }
}