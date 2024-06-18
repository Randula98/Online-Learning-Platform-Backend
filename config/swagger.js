import dotenv from "dotenv/config";

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coursework Node.js & Express API with Swagger',
            version: '1.0.0',
            description: 'API Documentation for AudiSence Node.js Express API with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Local server',
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
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./app/routers/routes/*.js'],
}