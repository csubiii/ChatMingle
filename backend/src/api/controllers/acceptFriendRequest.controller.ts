import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { FriendRequest } from "../../models/friendRequest.model";

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.body;

    console.log(await FriendRequest.findById(requestId))
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found or you are not the receiver." });
    }
    friendRequest.status = 'accepted';
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.senderId, { $push: { friends: friendRequest.receiverId } });
    await User.findByIdAndUpdate(friendRequest.receiverId, { $push: { friends: friendRequest.senderId } });

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
