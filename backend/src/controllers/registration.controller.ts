import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(`username: ${username}, email: ${email}, password: ${password}`);

    const user = new User({
      username,
      email,
      password,
      profilePicture: '',
      bio: '',
      friends: [],
    });
    await user.save();

    console.log(user.email);
    res.status(201).json(user); // Send the created user in the response

  } catch (error: any) {
    console.error(error);
    res.status(400).send(`Failed to create a new user. ${error.message}`);
  }
};
