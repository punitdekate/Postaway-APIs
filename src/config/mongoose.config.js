import mongoose from "mongoose";
import CustomError from "../middlewares/custom-error.middleware.js";
import '../config/env.config.js'

const url = process.env.DB_URL;

const connectMongoose = async() => {
    await mongoose.connect(url).then((clientInstance => {
        console.log("MongoDb is connected using mongoose")
    })).catch(error => {
        throw new CustomError("There is some issue in database connection", 400)
    })
}
export default connectMongoose;