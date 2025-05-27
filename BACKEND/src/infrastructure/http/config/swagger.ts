import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API pour e-commerce - vente de chaussure en ligne',
    },
    servers: [
      {
        url: 'http://localhost:3002/api',
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            priceExclTax: { type: 'number', format: 'float' },
            brand: { $ref: '#/components/schemas/Brand' },
            stockQty: { type: 'integer' },
            image: { type: 'string' },
            features: {
              type: 'array',
              items: { $ref: '#/components/schemas/ProductFeature' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Brand: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: { 
              type: 'string',
              format: 'uuid'
            },
            clientType: { 
              type: 'string',
              enum: ['particulier', 'entreprise']
            },
            email: { type: 'string' },
            telephone: { type: 'string' },
            adresse: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            companyName: { type: 'string' },
            nif: { type: 'string' },
            stat: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Feature: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ProductFeature: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            productId: { type: 'integer' },
            featureId: { type: 'integer' },
            feature: { $ref: '#/components/schemas/Feature' },
            value: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./src/infrastructure/http/routes/*.ts'],
};

export function setupSwagger(app: Express): void {
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}