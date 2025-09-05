export const environment = {
    production: false,
    version: '1.1.0',
    authorizationUrl: 'https://ssodesenv.go.gov.br/api/identity/entitlement/decision',
    // apiUrl: 'http://localhost:8080/smart/clientes/v1.0',
    apiUrl: 'https://apidesenv.go.gov.br/smart/clientes/v1.0',
    apiPortalAcessos: 'https://apidesenv.go.gov.br/portal/acessos-usuarios/v1.0',
    apiPortalMenusSistemas: 'https://apidesenv.go.gov.br/portal/menus-sistemas/v1.0',
    apiRhVinculos: 'https://apidesenv.go.gov.br/rh/vinculos/v1.0',
    apiUnidadesAcesso: 'https://apidesenv.go.gov.br/portal/unidades-acessos/v1.0',
    idSistemaPortal: 'SMART-PNG',
    sso: {
      clientId: 'Fgs8mBMfn52NiVL2KUz07BQpDf4a',
      serverUrl: 'https://ssodesenv.go.gov.br',
      issuer: '/oauth2/oidcdiscovery',
      redirectUri: window.location.origin,
      scope: 'openid profile email offline_access',
      showDebugInformation: true,
      urlCheckSession: '/oidc/checksession',
      responseType: 'code',
    }
  };
