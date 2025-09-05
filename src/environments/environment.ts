export const environment = {
  production: false,
  version: '1.1.0',
  authorizationUrl: 'https://localhost:9444/api/identity/entitlement/decision',
  apiUrl: '/smart-api',
  apiPortalAcessos: '/portal-acessos',
  apiPortalMenusSistemas: '/portal-menus',
  apiRhVinculos: '/rh-vinculos',
  idSistemaPortal: 'SMART-PNG',
  apiUnidadesAcesso: '/portal/unidades-acessos',
  // siglaLegado - adicionar variável quando houver integração com sistema legado, exemplo do valor "SIOFI"
  sso: {
      clientId: 'Fgs8mBMfn52NiVL2KUz07BQpDf4a',
      serverUrl: 'https://localhost:9444',
      issuer: '/oauth2/oidcdiscovery',
      redirectUri: window.location.origin,
      scope: 'openid profile email offline_access',
      showDebugInformation: true,
      urlCheckSession: '/oidc/checksession',
      responseType: 'code',
  }
};
