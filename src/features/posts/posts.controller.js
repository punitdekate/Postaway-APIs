import CustomError from "../../middlewares/custom-error.middleware.js";
import PostsModel from "./posts.model.js";

export default class PostsController {
    addPost(req, res) {
        try {
            const files = req.files;
            const { userId, caption } = req.body;
            const result = PostsModel.post(userId, caption, files);
            return res.status(201).send(result);
        } catch (error) {
            throw new CustomError("There is some issue in post please try later", 400);
        }
    }

    allPosts(req, res) {
        try {
            const posts = PostsModel.getAll();
            return res.status(200).send(posts);
        } catch (error) {
            throw new CustomError("There is some issue in retrieving the posts please try later", 400);
        }
    }

    post(req, res) {
        try {
            const post = PostsModel.get(req.params.id);
            return res.status(200).send(post);
        } catch (error) {
            throw new CustomError("There is some issue in retieving post for the user please try later", 400);
        }
    }

    userPosts(req, res) {
        try {
            const userPosts = PostsModel.getUserPost(req.id);
            return res.status(200).send(userPosts);
        } catch (error) {
            throw new CustomError("There is some issue in retrieving the users posts please try later");
        }
    }

    removePost(req, res) {
        try {
            const id = req.params.id;
            let userId = req.id;
            const result = PostsModel.delete(id, userId);
            res.status(200).send(result);
        } catch (erorr) { throw new CustomError("There is some issue in removing post please try later", 400); }
    }
    updatePost(req, res) {
        try {
            const id = req.params.id;
            const { caption } = req.body;
            let userId = req.id;
            const files = req.files;
            const result = PostsModel.update(id, userId, caption, files);
            return res.status(200).send(result);
        } catch (error) { throw new CustomError("There is some issue in updating the post please try later", 400); }
    }
}