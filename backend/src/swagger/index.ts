import swaggerJsdoc from 'swagger-jsdoc'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaxiTrio API',
      version: '1.0.0',
    },
  },
  apis: ['./src/modules/**/*.routes.ts'],
})

export { swaggerSpec }
