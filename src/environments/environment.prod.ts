export const environment = {
  production: true,

  api: {
    baseUrl: 'https://fns-maziapp-backend-qa-hbe6eya5arfna9ey.centralus-01.azurewebsites.net/api'
  },

  azure: {
    clientId: 'd5d696b8-5856-4d96-90d0-249eb10d20fe',
    tenantId: 'e0ccfa01-ef7c-4ce5-ac1c-b7eea9b006cb',
    redirectUri: 'https://lively-plant-04d3ad710.7.azurestaticapps.net',

    scopes: {
      api: 'api://d5d696b8-5856-4d96-90d0-249eb10d20fe/access_as_user',
      graph: 'User.Read'
    }
  }
};