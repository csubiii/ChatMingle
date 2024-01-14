import { Request, Response } from "express"
import userSchema from "../db/user.schema"
import mongoose, { model, connect } from 'mongoose';
import { UserDocument } from "../types/types";
import * as dotenv from "dotenv";

dotenv.config();

const User = model<UserDocument>('User', userSchema);

export const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    console.log(`username: ${username}, email: ${email}, password: ${password}`)

    mongoose.connect(process.env.DB_CONN_STRING || '');

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    console.log(user.email);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(`Failed to create a new user. ${error.message}`);
  }
}