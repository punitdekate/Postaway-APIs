import express from 'express';
import PostsController from './posts.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
const postsRouter = express.Router();

const postsController = new PostsController();
postsRouter.get('/all', postsController.allPosts);
postsRouter.get('/:id', postsController.post)
postsRouter.post('/', upload.array('imageUrl'), postsController.addPost);
postsRouter.get('/', postsController.userPosts);
postsRouter.delete('/:id', postsController.removePost);
postsRouter.put('/:id', upload.array('imageUrl'), postsController.updatePost);

export default postsRouter;