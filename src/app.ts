import express from 'express';
import cors from 'cors';
import { middlewareController } from './useCases/Middleware';
import { userRoutes } from './routes/userRoutes';
import { publicRoutes } from './routes/publicRoutes';
// import fs from 'fs'; 
// import swaggerUi from 'swagger-ui-express';

const app = express();

// const swaggerFile = ('./src/swagger/swagger.json');
// const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
// const swaggerDocument = JSON.parse(swaggerData);

app.use(cors());
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, null, null));

// Middleware
app.use('/v1', (request, response, next) => {
    return middlewareController.handle(request, response, next);
});

app.use(publicRoutes);
app.use(userRoutes);

export { app }