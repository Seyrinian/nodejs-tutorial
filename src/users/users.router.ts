import { Router } from 'express';
import { createUser, getUser, getUsers } from './users.controller';
import { verifyJWT } from '../common/jwt.middleware';

export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);

userRouter.post('/', verifyJWT, createUser);
