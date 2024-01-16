import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/encryption";

export const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: '',
      bio: '',
      friends: [],
    });
    await user.save();

    console.log(user.email, user?._id);
    res.status(201).json(user);

  } catch (error: any) {
    console.error(error);
    res.status(400).send(`Failed to create a new user. ${error}`);
  }
};
