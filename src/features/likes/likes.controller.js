import CustomError from "../../middlewares/custom-error.middleware.js";
import LikesModel from "./likes.model.js";
export default class LikesController {
    getPostAllLikes(req, res) {
        try {
            let postId = req.params.postId;
            const result = LikesModel.getlikes(postId);
            return res.status(200).send(result);
        } catch (error) {
            throw new CustomError("There is some issue in retriving the post likes please try later", 400);
        }
    }

    toggleLikes(req, res) {
        try {
            const postId = req.params.postId;
            const userId = req.id;
            const result = LikesModel.toggle(postId, userId);
            return res.status(200).send(result);
        } catch (error) {
            throw new CustomError("There is some issue in like please try later!", 400);
        }

    }
}