import CustomError from "../../middlewares/custom-error.middleware";

const likes = [{
        'id': 1,
        "userId": 1,
        "postId": 2
    },
    {
        'id': 2,
        "userId": 2,
        "postId": 1
    },
    {
        'id': 3,
        "userId": 1,
        "postId": 2
    }
];

export default class LikesModel {
    constructor(userId, postId) {
        this.id = likes.length + 1;
        this.userId = userId;
        this.postId = postId;
    }

    static getlikes(postId) {
        try {
            const allLikes = likes.filter(like => like.postId == postId);
            if (allLikes.length > 0) {
                return { "success": "true", "message": "all likes", "likes": allLikes };
            } else {
                return { "success": "true", "message": "no likes" };
            }
        } catch (error) {
            throw new CustomError("There is some issue in retriving the post likes please try later", 400);
        }
    }

    static toggle(postId, userId) {
        try {
            const likeIndex = likes.findIndex(like => like.postId == postId && like.userId == userId);
            if (likeIndex >= 0) {
                likes.splice(likeIndex, 1);
                return { "success": true, "message": "like removed" };
            } else {
                const newLike = new LikesModel(userId, postId);
                likes.push(newLike);
                return { "success": true, "message": "Like added!", "like": likes[likeIndex] };
            }
        } catch (error) {
            throw new CustomError("There is some issue in like please try later!", 400);
        }

    }
}