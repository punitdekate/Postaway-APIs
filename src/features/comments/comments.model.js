import CustomError from "../../middlewares/custom-error.middleware.js";
import PostsModel from "../posts/posts.model.js";

const comments = [{
    "id": 1,
    "userId": 1,
    "postId": 1,
    "content": "Chhapri dikh raha bhai"
}, {
    "id": 2,
    "userId": 1,
    "postId": 3,
    "content": "cool"
}, {
    "id": 3,
    "userId": 2,
    "postId": 3,
    "content": "awesome"
}, {
    "id": 4,
    "userId": 2,
    "postId": 4,
    "content": "awesome"
}]
export default class CommentsModel {
    constructor(userId, postId, content) {
        this.id = comments.length + 1;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static get(postId) {
        try {
            //Check the postId exist
            const result = PostsModel.getAll();
            const postFound = result.posts.find(post => post.id == postId);
            if (postFound) {
                const allComments = [];
                comments.forEach(comment => {
                    if (comment.postId == postId) {
                        allComments.push(comment.content);
                    }
                })
                if (allComments.length > 0) {
                    return { "success": true, "massage": "all comments", "comments": allComments };
                } else {
                    return { "success": true, "message": "no comment found" };
                }
            } else {
                return { "success": false, "message": "no post found" };
            }
        } catch (error) {
            throw new CustomError("There is some issue in retriving the posyt comments please try later", 400);
        }
    }

    static add(postId, userId, content) {
        try {
            //Check the postId exist
            const result = PostsModel.getAll();
            const postFound = result.posts.find(post => post.id == postId);
            if (postFound) {
                const newComment = new CommentsModel(userId, postId, content);
                comments.push(newComment);
                return { "success": true, "message": "comment added!", "comment": newComment };
            } else {
                return { "success": false, "message": "no post found" };
            }
        } catch (error) {
            throw new CustomError("There is some issue in retriving the posyt comments please try later", 400);
        }
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