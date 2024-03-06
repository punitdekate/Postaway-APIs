import CustomError from "../../middlewares/custom-error.middleware.js";
import CommentsModel from "./comments.model.js";

export default class CommentsController {
    getPostAllComments(req, res) {
        try {
            let id = req.params.postId;
            if (!id) {
                return res.status(400).send({ "success": false, "message": "provide the required data" });
            }
            const result = CommentsModel.get(id);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            throw new CustomError("There is some issue in retrieving the comments please try later", 400);
        }
    }

    addComment(req, res) {
        try {
            let postId = req.params.postId;
            let userId = req.id;
            const { content } = req.body;
            if (!postId || !content) {
                return res.status(400).send({ "success": false, "message": "provide the required data" });
            }
            const result = CommentsModel.add(postId, userId, content);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            throw new CustomError("There is some issue in add comment please try later");
        }
    }

    deleteComment(req, res) {
        try {
            const commentId = req.params.commentId;
            let userId = req.id;
            const result = CommentsModel.delete(commentId, userId);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            throw new CustomError("There is some issue in delting the comment please try later", 400);
        }

    }

    updateComment(req, res) {
        const commentId = req.params.commentId;
        let userId = req.id;
        const { content } = req.body;
        const result = CommentsModel.update(userId, commentId, content);
        if (result.success) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send(result);
        }
    }
}