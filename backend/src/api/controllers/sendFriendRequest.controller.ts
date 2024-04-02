import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { FriendRequest } from "../../models/friendRequest.model";

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const senderId = req.cookies.user_id;
    const { username } = req.body;
    const receiver = await User.findOne({ username });

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const receiverId = receiver._id;

    const existingRequest = await FriendRequest.findOne({ senderId, receiverId });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    const friendRequest = new FriendRequest({ senderId, receiverId });
    await friendRequest.save();
    
    res.status(200).json({ success: true, message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
