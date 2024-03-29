import express from 'express';
import auth from '../../middlewares/jwt.middleware.js';
import FriendshipController from './friendship.controller.js';
const friendshipRouter = express.Router();

const friendshipController = new FriendshipController();
friendshipRouter.get('/toggle-friendship/:userId', auth, (req, res, next) => {
    friendshipController.toggleFriendships(req, res, next);
})

friendshipRouter.get('/get-friends/:userId', auth, (req, res, next) => {
    friendshipController.userFriendList(req, res, next);
})


friendshipRouter.get('/get-pending-requests', auth, (req, res, next) => {
    friendshipController.userPedingRequest(req, res, next);
})

friendshipRouter.get('/response-to-request/:userId', auth, (req, res, next) => {
    friendshipController.changeRequestStatus(req, res, next);
})

export default friendshipRouter;