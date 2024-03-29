import CustomError from "../../middlewares/custom-error.middleware.js";
import PostsModel from "../posts/posts.model.js";
export default class CommentsModel {
    constructor(userId, postId, content) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static delete(commentId, userId) {
        try {
            const commentIndex = comments.findIndex(comment => comment.id == commentId && comment.userId == userId);
            if (commentIndex >= 0) {
                comments.splice(commentIndex, 1);
                return { "success": true, "message": "deleted successfully!" };
            } else {
                const commentIndex = comments.findIndex(comment => comment.id == commentId);
                if (commentIndex >= 0) {
                    let postId = comments[commentIndex].postId;
                    const validTodelete = PostsModel.getAll().posts.find(post => post.id == postId && post.userId == userId);
                    if (validTodelete) {
                        comments.splice(commentIndex, 1);
                        return { "success": true, "message": "deleted successfully!" };
                    } else {
                        return { "success": false, "message": "not authorize to delete!" };
                    }
                } else {
                    return { "success": false, "message": "comment not found" };
                }

            }
        } catch (error) {
            throw new CustomError("There is some issue in deleting the comment please try later", 400);
        }
    }

    static update(userId, commentId, content) {
        const commentIndex = comments.findIndex(comment => comment.id == commentId && comment.userId == userId);
        if (commentIndex >= 0) {
            const updatedComment = {
                'id': comments[commentIndex].id,
                'userId': userId,
                'postId': comments[commentIndex].postId,
                'content': content
            }
            comments[commentIndex] = updatedComment;
            return { "success": true, "message": "comment updated!", "comment": updatedComment };
        }
        return { "success": true, "message": "comment not found!" };
    }
}