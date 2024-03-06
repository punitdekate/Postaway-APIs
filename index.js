import express from 'express';
import usersRouter from './src/features/users/users.routes.js';
import postsRouter from './src/features/posts/posts.routes.js';
import likesRouter from './src/features/likes/likes.routes.js';
import commentsRouter from './src/features/comments/comments.routes.js';
import bodyParser from 'body-parser'
import CustomError from './src/middlewares/custom-error.middleware.js';
import logger from './src/middlewares/logger.middleware.js';
import auth from './src/middlewares/jwt.middleware.js';

const server = express();

server.use(bodyParser.json());
server.use('/api/users', usersRouter);
server.use('/api/posts', auth, postsRouter);
server.use('/api/likes', auth, likesRouter);
server.use('/api/comments', auth, commentsRouter);


// server.use((err, req, res, next) => {
//     const logData = `${new Date().toString()}\n Request URL: ${req.url}\nRequest Body: ${JSON.stringify(req.body)}\n`;
//     logger.error(logData);
//     if (err instanceof CustomError) {
//         res.status(err.statusCode).send(err.message);
//     } else {
//         res.status(500).send("Something went wrong please try later!");
//     }
// })

server.listen(3800, (req, res) => {
    console.log("Server is listening on port 3800");
});