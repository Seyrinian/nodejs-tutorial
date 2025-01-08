import { Router } from 'express';
import { createUser, getUser, getUsers } from './users.controller';

export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);

userRouter.post('/', createUser);
