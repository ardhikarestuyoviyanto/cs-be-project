import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { responseHandler } from './middlewares/response.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

dotenv.config();

const app = express();
app.use(express.json());
// attach response helpers (res.success / res.error)
app.use(responseHandler);

// serve swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', router);

export default app;
