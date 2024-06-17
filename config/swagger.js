import dotenv from "dotenv/config";

export const options = {
    definition: {
        info: {
            title: 'Coursework Node.js & Express API with Swagger',
            version: '1.0.0',
            description: 'API Documentation for AudiSence Node.js Express API with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./app/routers/routes/*.js'],
}