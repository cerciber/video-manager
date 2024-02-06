module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Video manager',
    description:
      'Technical challenge to be a Node.js Backend Developer in BeMaster. Final phase. Node.js.',
    termsOfService: '',
    contact: {
      email: 'cerciber@hotmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0.1',
  },
  externalDocs: {
    description: 'Find out more about Node clean architecture',
    url: 'https://github.com/cerciber/node-solid-architecture',
  },
  servers: [],
  tags: [
    {
      name: 'Auth',
      description: 'Auth requests.',
    },
    {
      name: 'Users',
      description: 'Users requests.',
    },
    {
      name: 'Videos',
      description: 'Videos requests.',
    },
  ],
  components: {
    schemas: {},
    responses: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Video-Manager-Authorization',
        in: 'header',
      },
    },
  },
};
