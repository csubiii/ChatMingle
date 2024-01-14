
export interface UserDocument {
  username: string,
  email: string,
  password: string,
  profilePicture: string,
  bio: string | null,
  friends: string[],
}