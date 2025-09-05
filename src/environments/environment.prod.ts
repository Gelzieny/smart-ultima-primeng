export const environment = {
    production: true,
    version: '1.1.0',
    authorizationUrl: 'https://sso.go.gov.br/api/identity/entitlement/decision',
    apiUrl: 'https://api.go.gov.br/smart/clientes/v1.0',
    apiPortalAcessos: 'https://api.go.gov.br/portal/acessos-usuarios/v1.0',
    apiPortalMenusSistemas: 'https://api.go.gov.br/portal/menus-sistemas/v1.0',
    apiRhVinculos: 'https://api.go.gov.br/rh/vinculos/v1.0',
    apiUnidadesAcesso: 'https://api.go.gov.br/portal/unidades-acessos/v1.0',
    idSistemaPortal: 'SMART-PNG',
    sso: {
        clientId: 'L4e90LOz6mnPQlf_SM7T_lnFOk0a',
        serverUrl: 'https://sso.go.gov.br',
        issuer: '/oauth2/oidcdiscovery',
        redirectUri: window.location.origin,
        scope: 'openid email profile',
        showDebugInformation: true,
        urlCheckSession: '/oidc/checksession',
        responseType: 'code',
    }
};
