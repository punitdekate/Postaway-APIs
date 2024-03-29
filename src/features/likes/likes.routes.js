import express from 'express';
import LikesController from './likes.controller.js';
const likesRouter = express.Router();

const likesController = new LikesController();
likesRouter.get('/:postId', (req, res, next) => {
    likesController.getPostAllLikes(req, res, next);
});
likesRouter.get('/toggle/:id', (req, res, next) => {
    likesController.toggleLikes(req, res, next);
})

export default likesRouter;