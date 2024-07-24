const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'API documentation for Express application',
      },
      servers: [
        {
          url: 'http://localhost:400',
        },
      ],
    },
    apis: ['./routes/*.js','./app.js','./controllers/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
  module.exports = { swaggerUi, swaggerDocs };