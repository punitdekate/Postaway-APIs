import express from 'express';
import CommentsController from './comments.controller.js';
const commentsRouter = express.Router();

const commentsController = new CommentsController();
commentsRouter.get('/:postId', commentsController.getPostAllComments);
commentsRouter.post('/:postId', commentsController.addComment);
commentsRouter.delete('/:commentId', commentsController.deleteComment);
commentsRouter.put('/:commentId', commentsController.updateComment);

export default commentsRouter;