import { model } from 'mongoose';
import { userSchema } from './user.schema';
import { UserDocument } from '../types/types';

export const User = model<UserDocument>('User', userSchema);