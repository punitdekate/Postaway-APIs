import mongoose from "mongoose";
import PostModel from "./post.schema.js";
import CustomError from "../../middlewares/custom-error.middleware.js";

export default class PostRepository {
    async getAllPosts() {
        try {
            const posts = await PostModel.find();
            return { "success": true, "msg": "Posts details", "data": posts };
        } catch (error) {
            throw new CustomError("The post retrieval failed. Please try again later", 400, error);
        }
    }

    async getSpecificPost(postId) {
        try {
            const post = await PostModel.findById(postId);
            if (post) {
                return { "success": true, "msg": "Post details", "data": post }
            } else {
                return { "success": false, "msg": "Post not found" }
            }
        } catch (error) {
            throw new CustomError("The post retrieval failed. Please try again later", 400, error);
        }
    }

    async createNewPost(postData) {
        try {
            const newPost = new PostModel(postData)
            const savedPost = await newPost.save();
            return { "success": true, "msg": "Post added successfully", "data": savedPost };
        } catch (error) {
            throw new CustomError("The post creation failed. Please try again later", 400, error);
        }
    }


    async deleteSpecificPost(postId, userId) {
        try {
            const result = await PostModel.findOne({ _id: postId, userId: userId });
            if (result) {
                await PostModel.deleteOne({ _id: postId });
                return { "success": true, "msg": "Post deleted successfully", "data": result };
            } else {
                return { "success": false, "msg": "Post not found" };
            }
        } catch (error) {
            throw new CustomError("The post deltion failed. Please try again later", 400, error);
        }
    }

    async updateSepecificPost(postId, postData) {
        try {
            if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(postData.userId)) {
                return { "success": false, "msg": "Invalid postId or userId" };
            }
            const result = await PostModel.findOne({ _id: postId, userId: postData.userId });
            if (result) {
                if (postData.caption) {
                    result.caption = postData.caption
                }
                if (postData.imageUrl.length > 0) {
                    result.imageUrl = postData.imageUrl
                }
                const updatedPost = await result.save();
                return { "success": true, "msg": "Post updated successfully", "data": updatedPost };
            } else {
                return { "success": false, "msg": "Post not found" };
            }
        } catch (error) {
            throw new CustomError("The post updation failed. Please try again later", 400, error);
        }
    }

    async getUserPosts(userId) {
        try {
            const posts = await PostModel.find({ userId: userId });
            if (posts.length <= 0) {
                return { "success": false, "msg": "Post not found" };
            } else {
                return { "success": true, "msg": "User posts", "data": posts };
            }
        } catch (error) {
            throw new CustomError("The post retrieval failed. Please try again later", 400, error);
        }
    }

}