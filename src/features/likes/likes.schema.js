import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"]
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type',
        required: [true, "CommentId or PostId required"]
    },
    type: {
        type: String,
        enum: ['Comment', 'Post'],
        required: [true, "Type is required"]
    }
})

const LikesModel = mongoose.model('Like', likeSchema);
export default LikesModel;