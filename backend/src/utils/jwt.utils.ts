import jwt, { SignOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload: object): string => {
  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "", signInOptions);
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
    console.log(decoded)
    return decoded;
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("JWT token expired") }
  }
};