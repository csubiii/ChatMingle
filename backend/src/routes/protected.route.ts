import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";

const protectedRouter = express.Router();

protectedRouter.get('/protected', authenticateToken, (req, res) => {
 
  res.json({ message: 'Authenticated route accessed'});
});

export default protectedRouter;