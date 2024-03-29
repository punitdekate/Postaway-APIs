import express from 'express';
import usersRouter from './src/features/users/user.routes.js';
import postsRouter from './src/features/posts/posts.routes.js';
import likesRouter from './src/features/likes/likes.routes.js';
import commentsRouter from './src/features/comments/comments.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
import friendshipRouter from './src/features/friendship/friendship.routes.js';

import bodyParser from 'body-parser'
import CustomError from './src/middlewares/custom-error.middleware.js';
import logger from './src/middlewares/logger.middleware.js';
import auth from './src/middlewares/jwt.middleware.js';
import connectMongoose from './src/config/mongoose.config.js';
import session from 'express-session';


const server = express();

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
server.use(bodyParser.json());
server.use('/api/users', usersRouter);
server.use('/api/posts', auth, postsRouter);
server.use('/api/likes', auth, likesRouter);
server.use('/api/comments', auth, commentsRouter);
server.use('/api/otp', otpRouter);
server.use('/api/friends', auth, friendshipRouter);


server.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        const logData = `${new Date().toString()}\n Request URL: ${req.url}\nRequest Body: ${JSON.stringify(req.body)}\nError : ${err.errorName}`;
        logger.error(logData);
        res.status(err.statusCode).send({ "success": false, "msg": err.message });
    } else {
        const logData = `${new Date().toString()}\n Request URL: ${req.url}\nRequest Body: ${JSON.stringify(req.body)}\n`;
        logger.error(logData);
        res.status(500).send({ "success": false, "msg": "Something went wrong please try later!" });
    }
})

server.listen(8000, (req, res) => {
    console.log("Server is listening on port 8000");
    connectMongoose();
});