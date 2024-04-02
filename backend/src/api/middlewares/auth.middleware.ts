import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../../utils/jwt.utils';
import { JwtPayload } from '../../types/types';
import { User } from '../../models/user.model';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = verifyJwt(token) as JwtPayload;
    
    console.log(Object.keys(decodedToken))

    const userId = decodedToken._id;

    if (decodedToken && decodedToken.expired) {
      return res.status(403).json({ message: 'Forbidden: Token expired or Invalid' });
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(403).json({ message: 'Forbidden: Invalid user' });
    }

    res.cookie('user_id', userId, {
      secure: true,
    });

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
