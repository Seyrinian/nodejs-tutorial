import { Request, Response } from 'express';
import prisma from '../client';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.status(200).send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      posts: true,
    },
  });
  if (!user) {
    res.status(404).send('Utilisateur non trouvé');
    return;
  }
  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
    },
  });
  res.status(201).send(user);
};
