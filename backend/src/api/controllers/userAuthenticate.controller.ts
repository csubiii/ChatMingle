import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../../models/user.model";
import { comparePasswords } from "../../utils/encryption";
import { generateToken } from "../../utils/jwt.utils";
import { JwtPayload } from "../../types/types";

dotenv.config();

export const userAuthenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({email}).exec();

    if (!isUserExist) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    const matchPassword = await comparePasswords(password, isUserExist.password);

    if (!matchPassword) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Incorrect password",
      });
    }

    const payload: JwtPayload = {
      _id: isUserExist?._id,
      username: isUserExist?.username,
      email: isUserExist?.email,
    };

   
    // Generate the access token
    const accessToken = generateToken(payload);

    // Set the access token in the cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 45 * 1000,
    });

    // If token verification succeeds, send the response
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
