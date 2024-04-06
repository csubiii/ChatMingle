import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../../models/user.model";
import { hashPassword } from "../../utils/encryption";

dotenv.config();

export const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(`username: ${username}, email: ${email}`);

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Please provide an email, username, and password" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({
          message: "User already exists with the same email or username",
        });
    }
    const passwordRequirements = {
      minLength: 8,
      uppercase: /[A-Z]/,
      number: /[0-9]/,
    };

    const errors = [];

    if (password.length < passwordRequirements.minLength) {
      errors.push(
        `Password must be at least ${passwordRequirements.minLength} characters long.`
      );
    }
    if (!passwordRequirements.uppercase.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!passwordRequirements.number.test(password)) {
      errors.push("Password must contain at least one number.");
    }
  
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const user = new User({
      username,
      email,
      password: await hashPassword(password),
      profilePicture: "",
      bio: "",
      friends: [],
    });
    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(`Failed to create a new user. ${error.message}`);
  }
};
