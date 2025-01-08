import { Router } from 'express';
import { login } from './auth.controller';

export const authRouter = Router();

authRouter.post('/', login);
