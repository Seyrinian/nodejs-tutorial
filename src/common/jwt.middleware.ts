import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, 'SECRET_TOKEN') as {
        userId: string;
      };
      const userId = decodedToken.userId;
      req.query = {
        userId: userId,
      };
      next();
    } else {
      res.sendStatus(401); // Pas de token fourni
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
