import { model } from 'mongoose';
import { userSchema } from '../db/user.schema';
import { UserDocument } from '../types/types';

export const User = model<UserDocument>('User', userSchema);