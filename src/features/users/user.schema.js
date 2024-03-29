import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [5, "Name should be at least 5 characters long"],
        required: [true, "Name is required"]
    },
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
    mobile: {
        type: Number,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid phone number'],
        unique: [true, 'Phone number is already taken']
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    tokens: [{
        type: String
    }]
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;