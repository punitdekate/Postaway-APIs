import express from 'express';
import PostsController from './posts.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
const postsRouter = express.Router();

const postsController = new PostsController();


//To retrive all posts
postsRouter.get('/all', (req, res, next) => {
    postsController.allPosts(req, res, next);
});

//To retrieve the specific post from the post id
postsRouter.get('/:postId', (req, res, next) => {
    postsController.getPost(req, res, next);
})

//To create new post 
postsRouter.post('/', upload.array('imageUrl'), (req, res, next) => {
    postsController.addPost(req, res, next);
});

postsRouter.get('/', (req, res, next) => {
    postsController.userPosts(req, res, next);
});


postsRouter.delete('/:postId', (req, res, next) => {
    postsController.removePost(req, res, next);
});


postsRouter.put('/:postId', upload.array('imageUrl'), (req, res, next) => {
    postsController.updatePost(req, res, next)
});

export default postsRouter;