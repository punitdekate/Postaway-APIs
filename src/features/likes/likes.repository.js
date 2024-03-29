import LikesModel from "./likes.schema.js";
import CommentsModel from "../comments/comments.schema.js";
import mongoose from "mongoose";
import PostModel from "../posts/post.schema.js";
export default class LikesRepository {

    async getLikes(postId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return { "success": false, "msg": "Post Id is not valid" };
            }
            const likes = await LikesModel.find({ likeable: postId });
            if (likes.length <= 0) {
                return { "success": true, "msg": "Likes not found" }
            } else {
                return { "success": true, "msg": "Likes", "data": likes };
            }
        } catch (error) {
            throw new CustomError("The like retrieval failed. Please try again later.", 400, error);
        }
    }

    async togglePostLike(postId, userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return { "success": false, "msg": "Post Id is not valid" };
            }
            const like = await LikesModel.deleteOne({ likeable: postId, userId: userId });
            console.log(like);
            if (like.deletedCount > 0) {
                return { "success": true, "msg": "Like removed from post successfully" }
            } else {
                const likeAdded = new LikesModel({
                    userId: userId,
                    likeable: postId,
                    type: 'Post'
                })
                const savedLike = await likeAdded.save();
                const populatedPost = await LikesModel.find({ likeable: postId }).populate('likeable');
                console.log(populatedPost);
                return { "success": true, "msg": "Like added successfully", "data": savedLike };
            }
        } catch (error) {
            console.log(error)
        }
    }

    async toggleCommentsLike(commentId, userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(commentId)) {
                return { "success": false, "msg": "Post Id is not valid" };
            }
            const like = await LikesModel.deleteOne({ likeable: commentId, userId: userId });
            if (like.deletedCount > 0) {
                // return { "success": true, "msg": "Like removed from comment successfully" }
                // const populatedComment = await LikesModel.find({ likeable: commentId }).populate('Comment');
                return { "success": true, "msg": "Like removed from comment successfully" };
            } else {
                const likeAdded = new LikesModel({
                    userId: userId,
                    likeable: commentId,
                    type: 'Comment'
                })
                const savedLike = await likeAdded.save();
                // const populatedComment = await CommentsModel.findById(commentId).populate('Like');
                // const populatedComment = await LikesModel.find({ likeable: commentId }).populate('Comment');
                return { "success": true, "msg": "Like added successfully", "data": savedLike };
            }
        } catch (error) {
            console.log(error)
            if (error instanceof MongooseError) {
                throw new CustomError(error.message, 400, "toggleCommentsLike")
            } else {
                throw new CustomError("There is some issue in getting likes please try later", 400, "toggleCommentsLike");
            }
        }
    }
}