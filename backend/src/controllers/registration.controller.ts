import { Request, Response } from "express"

export const registration = (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    console.log(`username: ${username}, email: ${email}, password: ${password}`)
  } catch (error: any) {
    console.error(error);
  }
}