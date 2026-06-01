import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaxiTrio API',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(__dirname, '../modules/**/*.routes.ts'),
    path.join(__dirname, '../modules/**/*.routes.js'),
  ],
})

export { swaggerSpec }
