import { Schema } from 'mongoose';
import { UserDocument } from '../types/types';

export const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
