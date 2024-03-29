import mongoose, { MongooseError } from "mongoose";
import CommentsModel from "./comments.schema.js";
import CustomError from "../../middlewares/custom-error.middleware.js";
export default class CommentsRepository {
    async getComments(postId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return { "success": false, "msg": "Post Id is not valid" };
            }
            const comments = await CommentsModel.find({ postId: postId });
            if (comments.length <= 0) {
                return { "success": false, "msg": "Comments not found" };
            } else {
                return { "success": true, "msg": "Post comments", "data": comments };
            }
        } catch (error) {
            if (error instanceof MongooseError) {
                throw new CustomError(error.message, 400, "getComments")
            } else {
                throw new CustomError("There is some issue in getting post comments please try later", 400, "getComments");
            }
        }
    }

    async add(commentData) {
        try {
            const newComment = new CommentsModel(commentData);
            const savedComment = await newComment.save();
            return { "success": true, "msg": "Comment added successfully", "data": savedComment };
        } catch (error) {
            if (error instanceof MongooseError) {
                throw new CustomError(error.message, 400, "add")
            } else {
                throw new CustomError("There is some issue in adding comments please try later", 400, "add");
            }
        }
    }

    async delete(commentId, userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(commentId)) {
                return { "success": false, "msg": "Comment Id is not valid" };
            }
            const result = await CommentsModel.deleteOne({ _id: commentId, userId: userId });
            if (result.deletedCount > 0) {
                return { "success": true, "msg": "Comment deleted successfully" };
            }
            return { "success": false, "msg": "Comment not found" };

        } catch (error) {
            console.log(error)
            if (error instanceof MongooseError) {
                throw new CustomError(error.message, 400, "delete")
            } else {
                throw new CustomError("There is some issue in deleting comment please try later", 400, "delete");
            }
        }
    }

    async update(commentId, userId, content) {
        try {
            if (!mongoose.Types.ObjectId.isValid(commentId)) {
                return { "success": false, "msg": "Comment Id is not valid" };
            }
            const comment = await CommentsModel.findById(commentId);
            if (comment) {
                if (comment.userId != userId) {
                    return { "success": false, "msg": "Not authorize" };
                } else {
                    comment.content = content;
                    const savedComment = await comment.save();
                    return { "success": true, "msg": "Comment updated successfully", "data": savedComment };
                }
            } else {
                return { "success": false, "msg": "Comment not found" };
            }
        } catch (error) {
            console.log(error)
            if (error instanceof MongooseError) {
                throw new CustomError(error.message, 400, "update")
            } else {
                throw new CustomError("There is some issue in updating the comment please try later", 400, "update");
            }
        }

    }
}