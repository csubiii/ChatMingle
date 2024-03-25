import { ObjectId } from "mongodb";

export interface UserDocument {
  username: string,
  email: string,
  password: string,
  profilePicture: string,
  bio: string | null,
  friends: string[],
}

export interface JwtPayload {
  _id: ObjectId;
  username: string;
  email: string;
}