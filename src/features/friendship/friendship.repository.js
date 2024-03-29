import mongoose from "mongoose";
import FriendshipModel from "./friendship.schema.js";
import CustomError from "../../middlewares/custom-error.middleware.js";


export default class FriendshipRepository {

    async toggle(userId_1, userId_2) {
        try {
            const isFriend = await FriendshipModel.findOne({ userId_1: userId_1, userId_2: userId_2 });
            if (isFriend) {
                if (isFriend.status != "Pending") {
                    return { "success": true, "msg": "Already action taken on the request", "data": isFriend }
                } else {
                    await FriendshipModel.deleteOne({ userId_1: userId_1, userId_2: userId_2 });
                    return { "success": true, "msg": "Friend request unsend successfully" }
                }
            } else {
                const createFriendship = new FriendshipModel({
                    userId_1: userId_1,
                    userId_2: userId_2
                })
                const saveCreateFriendship = await createFriendship.save();
                return { "success": true, "msg": "Friend request sent successfully", "data": saveCreateFriendship }
            }
        } catch (error) {
            throw new CustomError("The toggle friendship failed. Please try again later.", 400, error);
        }
    }

    async changeStatus(userId_1, userId_2, status) {
        try {
            const friendship = await FriendshipModel.findOne({ userId_1: userId_1, userId_2: userId_2 });
            if (friendship) {
                if (friendship.status != "Pending") {
                    return { "success": false, "msg": "Already action taken" }
                }
                friendship.status = status;
                const savedFriendship = await friendship.save();
                return { "success": true, "msg": `Request ${status} successfully`, "data": savedFriendship };
            } else {
                return { "success": false, "msg": "Request not found" }
            }
        } catch (error) {
            throw new CustomError("The friendship status change failed. Please try again later.", 400, error);
        }
    }

    async friendList(userId_1) {
        try {
            const friends = await FriendshipModel.find({ userId_1: userId_1, status: "Accept" });
            if (friends.length <= 0) {
                return { "success": true, "msg": "Friends not found" };
            } else {
                return { "success": true, "msg": "Friend list", "data": friends };
            }
        } catch (error) {
            throw new CustomError("The friend list retrieval failed. Please try again later.", 400, error);
        }
    }

    async pendingRequests(userId_1) {
        try {
            const pendingRequests = await FriendshipModel.find({ userId_1: userId_1, status: "Pending" });
            if (pendingRequests.length <= 0) {
                return { "success": true, "msg": "Pending request not found" };
            } else {
                return { "success": true, "msg": "Pending requests", "data": pendingRequests };
            }
        } catch (error) {
            throw new CustomError("The friend list retrieval failed. Please try again later.", 400, error);
        }
    }
}