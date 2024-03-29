import express from 'express';
import UserController from './user.controller.js';
import auth from '../../middlewares/jwt.middleware.js';
const usersRouter = express.Router();

const userController = new UserController();

//User sign in API
usersRouter.post('/signin', (req, res, next) => {
    userController.loginUser(req, res, next);
});

//User Sign Up API
usersRouter.post('/signup', (req, res, next) => {
    userController.registerUser(req, res, next);
});

//User Logout from logged in device API
usersRouter.get('/logout', auth, (req, res, next) => {
    userController.logoutUser(req, res, next);
});

//User Logout from all devices API
usersRouter.get('/logout-all-devices', auth, (req, res, next) => {
    userController.clearAllLoginDevices(req, res, next);
});


//To get specific user details API
usersRouter.get('/get-details/:userId', auth, (req, res, next) => {
    userController.getDetails(req, res, next);
})

//To get all users details API
usersRouter.get('/get-all-details', auth, (req, res, next) => {
    userController.usersDetails(req, res, next);
})

//To update user details 
usersRouter.put('/update-details/:userId', auth, (req, res, next) => {
    userController.updateDetails(req, res, next);
})

export default usersRouter;