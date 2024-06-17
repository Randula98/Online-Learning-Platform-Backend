import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv/config";

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { options } from './config/swagger.js'
import { sessionMiddleware } from './app/middlewares/session.middleware.js'

import routers from "./app/routers/index.js";

const swaggerEndpoint = '/api-docs'

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

app.use(swaggerEndpoint, swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

routers(app);

app.use(sessionMiddleware); 

const URL = process.env.REACT_APP_MONGODB_URI;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Backend Node Service is up and running on port ${PORT}`);
    console.log(`Swagger is running on http://localhost:${PORT}${swaggerEndpoint}`)
});
