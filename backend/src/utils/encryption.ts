import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  const match: boolean = await bcrypt.compare(password, hashedPassword);
  return match;
};