import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reguired: [true, "userId is required"]
    },
    caption: {
        type: String,
        required: [true, "caption is required"]
    },
    imageUrl: [{
        type: String,
        required: [true, "imageUrl is required"]
    }]
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;