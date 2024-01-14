import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../types/types';

const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default userSchema;
