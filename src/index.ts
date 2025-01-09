import express from 'express';
import { loggerMiddleware } from './common/logger.middleware';
import { userRouter } from './users/users.router';
import { authRouter } from './auth/auth.router';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const app = express();
const port = 3000;

// Charger la spécification Swagger
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// Serveur Swagger UI à l'adresse /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(loggerMiddleware);

app.use('/users', userRouter);
app.use('/auth', authRouter);

const server = app.listen(port, () => {
  console.log(`Mon serveur démarre sur le port ${port}`);
});

export function stopServer() {
  server.close();
}
