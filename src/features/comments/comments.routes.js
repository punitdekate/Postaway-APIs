import express from 'express';
import CommentsController from './comments.controller.js';
const commentsRouter = express.Router();

const commentsController = new CommentsController();
commentsRouter.get('/:postId', (req, res, next) => {
    commentsController.getPostAllComments(req, res, next);
});
commentsRouter.post('/:postId', (req, res, next) => {
    commentsController.addComment(req, res, next);
});
commentsRouter.delete('/:commentId', (req, res, next) => {
    commentsController.deleteComment(req, res, next);
});
commentsRouter.put('/:commentId', (req, res, next) => {
    commentsController.updateComment(req, res, next)
});

export default commentsRouter;