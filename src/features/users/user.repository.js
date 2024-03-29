import CustomError from "../../middlewares/custom-error.middleware.js";
import UserModel from "./user.schema.js";
export default class UserRepository {

    //To find the user by email
    async findbyEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw new CustomError("The user retrieval failed. Please try again later", 400, error);
        }
    }

    //To store the data of newly register user in the database
    async register(userData) {
        try {
            const user = new UserModel(userData);
            const savedUser = await user.save();
            return { "success": true, "msg": "User registered successfully", "data": savedUser };
        } catch (error) {
            throw new CustomError("The user registration failed. Please try again later", 400, error);
        }

    }

    //To get the user details for the userId 
    async userDetails(userId) {
        try {
            const userData = await UserModel.findById(userId).select("-password", '-tokens');
            if (userData) {
                return { "success": true, "msg": "User data", "data": userData }
            } else {
                return { "success": false, "msg": "User not found" }
            }
        } catch (error) {
            throw new CustomError("The user details retrieval failed. Please try again later", 400, error);
        }
    }

    //To get all the user details
    async getAllUserDetails() {
        try {
            const details = await UserModel.find().select('-tokens');
            return { "success": true, "msg": "Users data", 'data': details }
        } catch (error) {
            throw new CustomError("The user details retrieval failed. Please try again later", 400, error);
        }
    }


    async storeToken(userId, token) {
        try {
            const user = await UserModel.findById(userId);
            user.tokens.push(token);
            await user.save();
        } catch (error) {
            throw new CustomError("The user token addition failed. Please try again later", 400, error);
        }
    }


    async updateUserDetails(userId, userDetails) {
        try {
            const user = await UserModel.findById(userId);
            if (user) {
                if (userDetails.name) {
                    user.name = userDetails.name
                }
                if (userDetails.email) {
                    user.email = userDetails.email
                }
                if (userDetails.password) {
                    user.password = userDetails.password;
                }
                if (userDetails.mobile) {
                    user.mobile = userDetails.mobile
                }
                if (userDetails.gender) {
                    user.gender = userDetails.mobile
                }
                const savedUser = await user.save();
                console.log(user);
                return { "success": true, "msg": "User updated successfully", 'data': savedUser }
            }
            return { "success": true, "msg": "User not found" }

        } catch (error) {
            throw new CustomError("The user details update failed. Please try again later", 400, error);

        }
    }

    async logoutFromAllDevices(userId) {
        try {
            const user = await UserModel.updateOne({ _id: userId }, { $set: { tokens: [] } });
            console.log(user);
            return { "success": true, "msg": "Logout from all devices successfully", "data": user }
        } catch (error) {
            throw new CustomError("The user logout from all devices failed. Please try again later", 400, error);
        }
    }

    async logoutFromDevice(userId, token) {
        try {
            const user = await UserModel.updateOne({ _id: userId }, { $pull: { tokens: token } });
            return { "success": true, "msg": "Logout successfully", "data": user }
        } catch (error) {
            throw new CustomError("The user logout failed. Please try again later", 400, error);
        }
    }

    async isTokenPresent(token, userId) {
        try {
            const user = await UserModel.findById(userId);
            return user.tokens.includes(token);
        } catch (error) {
            throw new CustomError("The token verification failed. Please try again later", 400, error);
        }
    }

}