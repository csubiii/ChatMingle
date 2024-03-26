import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { JwtPayload } from '../types/types';

dotenv.config();

export const generateToken = (payload: JwtPayload): string => {
  console.log("check Payload: ", payload);
  return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "15s" });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    console.log("jwt: ", decoded, decoded.email, decoded.username, decoded._id);
    return decoded;
  } catch (error: any) {
    return { expired: true };
  }
};

