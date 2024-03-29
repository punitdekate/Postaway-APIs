import CustomError from "../../middlewares/custom-error.middleware.js";
import CommentsRepository from "./comments.repository.js";
import CommentsModel from "./comments.model.js";

export default class CommentsController {
    constructor() {
        this.commentsRepository = new CommentsRepository()
    }
    async getPostAllComments(req, res, next) {
        try {
            let postId = req.params.postId;
            const result = await this.commentsRepository.getComments(postId);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There is some issue in retrieving the comments please try later", 400);
            }
        }
    }

    async addComment(req, res, next) {
        try {
            let postId = req.params.postId;
            let userId = req.id;
            const { content } = req.body;
            const commentData = new CommentsModel(userId, postId, content);
            const result = await this.commentsRepository.add(commentData);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There is some issue in add comment please try later");
            }
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            let userId = req.id;
            const result = await this.commentsRepository.delete(commentId, userId);
            if (result.success) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There is some issue in delting the comment please try later", 400, "deleteComment");

            }
        }

    }

    async updateComment(req, res) {
        const commentId = req.params.commentId;
        let userId = req.id;
        const { content } = req.body;
        if (!content) {
            return res.status(400).send({ "success": false, "msg": "Content is required" });
        }
        const result = await this.commentsRepository.update(commentId, userId, content);
        if (result.success) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send(result);
        }
    }
}