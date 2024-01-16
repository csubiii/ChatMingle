import { Request, Response } from "express";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";
import { comparePasswords } from "../utils/encryption";

dotenv.config();

export const userAuthenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({email}).exec();

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const matchPassword = await comparePasswords(password, isUserExist.password);

    if (!matchPassword) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    const payload = () => ({
      _id: isUserExist?._id,
      username: isUserExist?.username,
      email: isUserExist?.email,
    });
    
    const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET || "", {expiresIn: '15s'});

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login success",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(`Failed to login. ${error}`);
  }
};
