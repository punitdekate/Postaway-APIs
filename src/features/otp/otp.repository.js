import mongoose from "mongoose";
import UserModel from "../users/user.schema.js";
import OtpModel from "./otp.schema.js";
import CustomError from "../../middlewares/custom-error.middleware.js";
export default class OtpRepository {

    async send(email, otp) {
        try {
            //find is there any otp already in database for user 
            await OtpModel.deleteOne({ email: email });
            const newOtp = new OtpModel({
                email: email,
                otp: otp,
            })
            const savedOtp = await newOtp.save();
            return { "success": true, "msg": "Otp send successfully", "data": savedOtp };
        } catch (error) {
            throw new CustomError("The OTP sending failed. Please try again later.", 400, error);
        }
    }

    async verify(email, otp) {
        try {
            const isOtpValid = await OtpModel.findOne({ email: email, otp: otp });
            if (isOtpValid) {
                return { "success": true, "msg": "Otp verified" }
            } else {
                return { "success": false, "msg": "Otp expired" }
            }
        } catch (error) {
            throw new CustomError("The OTP verification failed. Please try again later.", 400, error);
        }
    }

    async reset(email, newPassword) {
        try {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                user.password = newPassword;
                await user.save();
                return { "success": true, "msg": "Password reset successfully" };
            } else {
                return { "success": false, "msg": "User not found" };
            }
        } catch (error) {
            throw new CustomError("The reset password failed. Please try again later.", 400, error);
        }
    }
}