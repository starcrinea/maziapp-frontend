export const environment = {
  production: false,

  api: {
    baseUrl: 'http://localhost:7071/api',
  },

  azure: {
    clientId: 'd5d696b8-5856-4d96-90d0-249eb10d20fe',
    tenantId: 'e0ccfa01-ef7c-4ce5-ac1c-b7eea9b006cb',
    redirectUri: 'http://localhost:4200',

    scopes: {
      api: 'api://73ace681-92a9-4062-846a-99e6104a772a/access_as_user',
      graph: 'User.Read',
    },
  },
};
