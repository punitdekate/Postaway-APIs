import CustomError from "../../middlewares/custom-error.middleware.js";
import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController {
    constructor() {
        this.friendshipRepository = new FriendshipRepository();
    }

    async toggleFriendships(req, res, next) {
        try {
            let userId_1 = req.id;
            let userId_2 = req.params.userId;
            const result = await this.friendshipRepository.toggle(userId_1, userId_2);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue with toggle friendship. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async changeRequestStatus(req, res, next) {
        try {
            let userId_1 = req.id;
            let userId_2 = req.params.userId;
            let status = req.query.status;
            const result = await this.friendshipRepository.changeStatus(userId_1, userId_2, status);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue with change status of request. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async userFriendList(req, res, next) {
        try {
            let userId_1 = req.params.id;
            const result = await this.friendshipRepository.friendList(userId_1);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue with retrieval of frindlist. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async userPedingRequest(req, res, next) {
        try {
            let userId_1 = req.id;
            const result = await this.friendshipRepository.pendingRequests(userId_1);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue with retrieval of pending requests. We're working on it. Please try again later.", 400, error);
            }
        }
    }


}