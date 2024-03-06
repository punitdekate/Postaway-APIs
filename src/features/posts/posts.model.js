import UserModel from "../users/users.model.js";
import CustomError from "../../middlewares/custom-error.middleware.js";

const posts = [{
        "id": 1,
        "userId": 1,
        "caption": "Looking cute",
        "imageUrl": ['1709571787368-vaccine 1st dose certificate.pdf', '1709571787368-vaccine 1st dose certificate.pdf']
    }, {
        "id": 2,
        "userId": 1,
        "caption": "Looking awesome",
        "imageUrl": ['1709571787368-vaccine 1st dose certificate.pdf']
    }, {
        "id": 3,
        "userId": 1,
        "caption": "Looking Jabba",
        "imageUrl": ['1709571787368-vaccine 1st dose certificate.pdf']
    },
    {
        "id": 4,
        "userId": 3,
        "caption": "Sexy",
        "imageUrl": ['1709571787368-vaccine 1st dose certificate.pdf']
    },
];
export default class PostsModel {
    constructor(userId, caption) {
        this.id = posts.length + 1;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = [];
    }

    static getAll() {
        try {
            return { "success": true, "message": "posts available", "posts": posts };
        } catch (error) {
            throw new CustomError("There is some issue is get all posts please try later", 400);
        }
    }

    static get(id) {
        try {
            const postFound = posts.find(post => post.id == id);
            if (postFound) {
                return { "success": true, "message": "post retrieved successfully!", "posts": postFound }
            } else {
                return { "success": true, "message": "post not found!" }
            }
        } catch (error) {
            throw new CustomError("There is some issue is get all Posts please try later", 400);
        }
    }
    static getUserPost(userId) {
        try {
            const postFound = posts.filter(post => post.userId == userId);
            if (postFound.length > 0) {
                return { "success": true, "message": "user posts", "posts": postFound }
            } else {
                return { "success": true, "message": "posts not found!" }
            }
        } catch (error) {
            throw new CustomError("There is some issue in get user post", 400);
        }

    }

    static post(userId, caption, imageUrls) {
        try {
            const newPost = new PostsModel(userId, caption);
            imageUrls.forEach(url => {
                newPost.imageUrl.push(url.filename);
            });
            posts.push(newPost);
            return { "success": true, "message": "post created!", "post": newPost };
        } catch (error) {
            throw new CustomError("There is some issue in post please try later", 400);
        }
    }


    static delete(id, userId) {
        try {
            const postFoundIndex = posts.findIndex(post => post.id == id && post.userId == userId);
            if (postFoundIndex >= 0) {
                posts.splice(postFoundIndex, 1);
                return { "success": true, "message": "post deleted!", "post": posts[postFoundIndex] };
            } else {
                return { "success": false, "message": "post not found!" };
            }
        } catch (error) {
            throw new CustomError("There is some issue in deleting the post please try later", 400);
        }
    }
    static update(id, userId, caption, imageUrl) {
        try {
            const postFoundIndex = posts.findIndex(post => post.id == id && post.userId == userId);
            if (postFoundIndex >= 0) {
                const updatedPost = {
                    "id": id,
                    "userId": userId,
                    "caption": caption,
                    "imageUrl": []
                };
                imageUrl.forEach(url => updatedPost.imageUrl.push(url.filename));
                posts[postFoundIndex] = updatedPost;
                return { "success": true, "message": "post updated!", "post": posts[postFoundIndex] };
            } else { return { "success": false, "message": "post not found!" }; }
        } catch (error) {
            throw new CustomError("There is some issue in updating the post please try later", 400);
        }

    }


}