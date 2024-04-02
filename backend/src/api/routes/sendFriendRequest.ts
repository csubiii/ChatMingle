import express from "express";
import { sendFriendRequest } from "../controllers/sendFriendRequest.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const putFriendRequest = express.Router();

putFriendRequest.post("/send-friend-request", authenticateToken, sendFriendRequest, (req, res) => {
    res.json({ message: "friend req sent" });
  }
);

export default putFriendRequest;
