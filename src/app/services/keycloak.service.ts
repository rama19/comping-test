
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
    keycloak.init({
        config: {
          url: 'https://keycloak-tt-keycloak-stage.apps.ocp.thingstalk.eu/',
          realm: 'test-realm6',
          clientId: 'test-realm6',
        },
        initOptions: {
            onLoad: 'login-required',
        }
    });
}