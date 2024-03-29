import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({
    userId_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    },
    userId_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    },
    status: {
        type: String,
        enum: ["Pending", "Accept", "Reject"],
        default: "Pending"
    }
})

const FriendshipModel = mongoose.model("Friend", friendshipSchema);
export default FriendshipModel;