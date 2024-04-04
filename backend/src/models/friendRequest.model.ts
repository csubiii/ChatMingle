import mongoose from "mongoose";
import friendRequestSchema from "../schemas/friendRequest.schema";

export const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);