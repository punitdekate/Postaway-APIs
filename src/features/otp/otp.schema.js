import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function(mail) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
            },
            message: "Email is not valid"
        },
        required: [true, "Email is required"],
        unique: [true, 'Email is already taken']
    },
    otp: {
        type: Number,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now,
        expires: 120
    }
})

const OtpModel = mongoose.model("Otp", otpSchema);
export default OtpModel;