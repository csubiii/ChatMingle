import express from "express";
import { acceptFriendRequest } from "../controllers/acceptFriendRequest.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const acceptFriendRequestRouter = express.Router();

acceptFriendRequestRouter.post("/friend-request/accept", authenticateToken, acceptFriendRequest);

export default acceptFriendRequestRouter;
