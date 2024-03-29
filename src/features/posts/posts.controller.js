import CustomError from "../../middlewares/custom-error.middleware.js";
import PostRepository from "./post.repository.js";
import PostsModel from "./posts.model.js";

export default class PostsController {
    constructor() {
        this.postRepository = new PostRepository();
    }
    async addPost(req, res, next) {
        try {
            const files = req.files;
            const { caption } = req.body;
            const userId = req.id
            const postData = new PostsModel(userId, caption);
            if (files.length <= 0 || !caption) {
                return res.status(400).send({ "success": false, "msg": "Caption and Files required to create new post" });
            }
            files.forEach(file => {
                postData.imageUrl.push(file.filename);
            })
            const result = await this.postRepository.createNewPost(postData);
            return res.status(201).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with create new post. We'll fix it. Please try again later.", 400, error);
            }
        }
    }

    async allPosts(req, res, next) {
        try {
            const posts = await this.postRepository.getAllPosts();
            return res.status(200).send(posts);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with retrieving posts. We'll fix it. Please try again later.", 400, error);
            }
        }
    }

    async getPost(req, res, next) {
        try {
            const post = await this.postRepository.getSpecificPost(req.params.postId);
            return res.status(200).send(post);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with retrieving post. We'll fix it. Please try again later.", 400, error);
            }
        }
    }

    async userPosts(req, res, next) {
        try {
            let userId = req.id;
            const userPosts = await this.postRepository.getUserPosts(userId);
            return res.status(200).send(userPosts);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with retrieving user posts. We'll fix it. Please try again later.", 400, error);
            }
        }
    }

    async removePost(req, res, next) {
        try {
            const postId = req.params.postId;
            let userId = req.id;
            const result = await this.postRepository.deleteSpecificPost(postId, userId);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with deleting post. We'll fix it. Please try again later.", 400, error);
            }
        }
    }
    async updatePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const { caption } = req.body;
            let userId = req.id;
            const files = req.files;
            const postData = new PostsModel(userId, caption);
            if (files.length > 0) {
                files.forEach(url => {
                    postData.imageUrl.push(url.filename);
                })
            }
            const result = await this.postRepository.updateSepecificPost(postId, postData);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with updating post. We'll fix it. Please try again later.", 400, error);
            }
        }
    }
}