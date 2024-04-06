import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../../models/user.model";
import { comparePasswords } from "../../utils/encryption";
import { generateRefreshToken, generateToken } from "../../utils/jwt.utils";
import { JwtPayload } from "../../types/types";

dotenv.config();

export const userAuthenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Incorrect password or email",
      });
    }
    
    const matchPassword = await comparePasswords(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Incorrect password or email",
      });
    }

    const payload: JwtPayload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateToken(payload);

    const refreshToken = generateRefreshToken(payload);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login success",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(`Failed to login. ${error}`);
  }
};
