import OtpRepository from "./otp.repository.js";
import CustomError from "../../middlewares/custom-error.middleware.js";
import { mail } from "../../utility/mail.utility.js";
import { hashPassword } from "../../utility/password.handler.js";
export default class OtpController {
    constructor() {
        this.otpRepository = new OtpRepository();
    }

    async sendOtp(req, res, next) {
        try {
            let otp = this.generateOTP(6);
            let userId = req.id;
            let email = req.body.email
            console.log(otp);
            const result = await this.otpRepository.send(email, otp);
            let from = 'punitdekate.1999@gmail.com'; // Sender's email address
            let to = email; // Recipient's email address
            let subject = 'Your One-Time Password'; // Subject line of the email
            let text = `Your OTP is: ${otp}`; // Plain text body of the email
            let html = `<p>Your OTP is: <strong>${otp}</strong></p>`; // HTML body of the email
            const mailResponse = await mail(from, to, subject, text, html);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue sending the otp. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const { otp, email } = req.body;
            const result = await this.otpRepository.verify(email, otp);
            return res.status(200).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue sending the otp. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, newPassword } = req.body;
            const encryptedPassword = await hashPassword(newPassword);
            const result = await this.otpRepository.reset(email, encryptedPassword);
            if (result.success) {
                return res.status(201).send(result);
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue reset password. We're working on it. Please try again later.", 400, error);
            }
        }


    }

    generateOTP(length) {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
}