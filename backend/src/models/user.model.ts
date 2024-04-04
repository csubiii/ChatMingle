import { model } from 'mongoose';
import { UserDocument } from '../types/types';
import userSchema from '../schemas/userSchema.schema';

export const User = model<UserDocument>('User', userSchema);