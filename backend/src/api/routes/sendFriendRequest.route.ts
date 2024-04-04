import express from "express";
import { sendFriendRequest } from "../controllers/sendFriendRequest.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const sendFriendRequestRouter = express.Router();

sendFriendRequestRouter.post("/friend-request", authenticateToken, sendFriendRequest);

export default sendFriendRequestRouter;
