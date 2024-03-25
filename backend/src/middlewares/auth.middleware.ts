import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { JwtPayload } from '../types/types';
import { User } from '../models/user.model';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = verifyJwt(token) as JwtPayload;

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
