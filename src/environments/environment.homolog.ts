export const environment = {
    production: false,
    version: '1.1.0',
    authorizationUrl: 'https://ssohomolog.go.gov.br/api/identity/entitlement/decision',
    apiUrl: 'https://apihomolog.go.gov.br/smart/clientes/v1.0',
    apiPortalAcessos: 'https://apihomolog.go.gov.br/portal/acessos-usuarios/v1.0',
    apiPortalMenusSistemas: 'https://apihomolog.go.gov.br/portal/menus-sistemas/v1.0',
    apiRhVinculos: 'https://apihomolog.go.gov.br/rh/vinculos/v1.0',
    apiUnidadesAcesso: 'https://apihomolog.go.gov.br/portal/unidades-acessos/v1.0',
    idSistemaPortal: 'SMART-PNG',
    sso: {
      clientId: 'XezPJnPSe9zBbtrFk2932Vf5CMAa',
      serverUrl: 'https://ssohomolog.go.gov.br',
      issuer: '/oauth2/oidcdiscovery',
      redirectUri: window.location.origin,
      scope: 'openid email profile',
      showDebugInformation: true,
      urlCheckSession: '/oidc/checksession',
      responseType: 'code',
    }
  };
