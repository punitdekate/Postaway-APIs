import CustomError from "../../middlewares/custom-error.middleware.js";
import LikesModel from "./likes.model.js";
import LikesRepository from "./likes.repository.js";
export default class LikesController {

    constructor() {
        this.likesRepository = new LikesRepository();
    }
    async getPostAllLikes(req, res, next) {
        try {
            let postId = req.params.postId;
            const result = await this.likesRepository.getLikes(postId);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue retrieving post likes. We're working on it. Please try again later.", 400, error);
            }

        }
    }

    async toggleLikes(req, res, next) {
        try {
            const id = req.params.id;
            const type = req.query.type;
            const userId = req.id;
            console.log(id, type, userId);
            let result;
            if (type == 'Post') {
                result = await this.likesRepository.togglePostLike(id, userId);
            } else {
                result = await this.likesRepository.toggleCommentsLike(id, userId);
            }
            if (result.success) {
                return res.status(200).send(result);
            }
            return res.status(400).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue with toggle like. We're working on it. Please try again later.", 400, error);
            }
        }

    }
}