import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'password') {
    res.status(401).send('Identifiants invalides');
    return;
  }
  const token = jwt.sign(
    { username }, // Payload
    'SECRET_TOKEN', // Secret
    { expiresIn: '1d' } // Expiration
  );

  res.status(200).json({
    token,
  });
};
