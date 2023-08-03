const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for OLX project',
        version: '1.0.0',
        description:
          'These all are dummmy APIs ',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
      },
      servers: [
        {
          url: 'http://localhost:4000/',
          description: 'Development server',
        },
      ],
    }

export {swaggerDefinition};

