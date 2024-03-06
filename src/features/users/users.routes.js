import express from 'express';
import UserController from './users.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
const usersRouter = express.Router();

const userController = new UserController();
usersRouter.get('/', (req, res) => {
    res.send("Welcome to users APIs")
})
usersRouter.post('/login', userController.loginUser);
usersRouter.post('/register', userController.registerUser);


export default usersRouter;