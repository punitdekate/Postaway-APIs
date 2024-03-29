import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"]
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "PostId is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    }
})

const CommentsModel = new mongoose.model("Comment", commentSchema);
export default CommentsModel;