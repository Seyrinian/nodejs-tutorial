import express from 'express';
import { PrismaClient } from '@prisma/client';
import { loggerMiddleware } from './common/logger.middleware';
import { userRouter } from './users/users.router';

const prisma = new PrismaClient();
export const app = express();
const port = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Mon serveur démarre sur le port ${port}`);
});
