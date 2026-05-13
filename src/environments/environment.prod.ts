export const environment = {
  production: true,

  api: {
    baseUrl: 'https://fns-maziapp-backend-qa-hbe6eya5arfna9ey.centralus-01.azurewebsites.net/api',
  },

  azure: {
    clientId: 'd5d696b8-5856-4d96-90d0-249eb10d20fe',
    tenantId: 'e0ccfa01-ef7c-4ce5-ac1c-b7eea9b006cb',
    redirectUri: 'https://lively-plant-04d3ad710.7.azurestaticapps.net',

    scopes: {
      api: 'api://73ace681-92a9-4062-846a-99e6104a772a/access_as_user',
      graph: 'User.Read',
    },
  },
};
